import type { AvatarFace, AvatarNode, FaceDirection, Vector3 } from "~/scripts/avatar/types";
import { poseVariable } from "../../src/scripts/avatar/css.ts";
import type { BlockbenchElement, BlockbenchGroup, BlockbenchModel, BlockbenchOutlinerNode, Uv } from "./blockbench.ts";
import { FACE_DIRECTIONS, boxCorners, placeFace, placeNode, subtract } from "./geometry.ts";

export type AvatarTreeOptions = {
	hiddenGroups: string[];
	unseenFaces: FaceDirection[];
	unseenFacesByGroup: Partial<Record<string, FaceDirection[]>>;
	outfit: { texture: number; inflateByElement: Partial<Record<string, number>> };
	isTransparent: (texture: number, uv: Uv) => boolean;
};

type BuildContext = {
	options: AvatarTreeOptions;
	elements: Map<string, BlockbenchElement>;
	groups: Map<string, BlockbenchGroup>;
};

const NO_ROTATION: Vector3 = [0, 0, 0];
const isRotated = (rotation?: Vector3) => rotation?.some((angle) => angle !== 0) ?? false;

const buildFaces = (
	element: BlockbenchElement,
	inflate: number,
	unseen: FaceDirection[],
	options: AvatarTreeOptions,
	textureOverride?: number,
): AvatarFace[] => {
	const from = subtract(element.from, element.origin).map((value) => value - inflate) as Vector3;
	const to = subtract(element.to, element.origin).map((value) => value + inflate) as Vector3;
	const corners = boxCorners(from, to);
	return FACE_DIRECTIONS.flatMap((direction) => {
		const face = element.faces[direction];
		const texture = textureOverride ?? face?.texture;
		if (!face || typeof texture !== "number" || unseen.includes(direction)) return [];
		if (options.isTransparent(texture, face.uv)) return [];
		const placement = placeFace(corners[direction], face.uv);
		return placement ? [{ ...placement, direction, texture }] : [];
	});
};

const buildElement = (element: BlockbenchElement, parentOrigin: Vector3, unseen: FaceDirection[], options: AvatarTreeOptions): AvatarNode[] => {
	if (element.visibility === false) return [];
	const inflate = element.inflate ?? 0;
	const faceUnseen = isRotated(element.rotation) ? [] : unseen;
	const outfitInflate = options.outfit.inflateByElement[element.name];
	const outfitFaces =
		outfitInflate === undefined ? [] : buildFaces(element, inflate + outfitInflate, faceUnseen, options, options.outfit.texture);
	const faces = [...buildFaces(element, inflate, faceUnseen, options), ...outfitFaces];
	if (faces.length === 0) return [];
	const transform = placeNode(subtract(element.origin, parentOrigin), element.rotation ?? NO_ROTATION);
	return [{ name: element.name, transform, faces, children: [] }];
};

const buildGroup = (
	node: { children?: BlockbenchOutlinerNode[] },
	group: BlockbenchGroup,
	parentOrigin: Vector3,
	unseen: FaceDirection[],
	context: BuildContext,
): AvatarNode[] => {
	if (group.visibility === false || context.options.hiddenGroups.includes(group.name)) return [];
	const childUnseen = isRotated(group.rotation) ? [] : [...unseen, ...(context.options.unseenFacesByGroup[group.name] ?? [])];
	const children = (node.children ?? []).flatMap((child) => buildNode(child, group.origin, childUnseen, context));
	const placement = placeNode(subtract(group.origin, parentOrigin), group.rotation ?? NO_ROTATION);
	const pose = `var(${poseVariable(group.name)}, translateZ(0))`;
	return [{ name: group.name, transform: `${placement} ${pose}`, faces: [], children }];
};

const buildNode = (node: BlockbenchOutlinerNode, parentOrigin: Vector3, unseen: FaceDirection[], context: BuildContext): AvatarNode[] => {
	if (typeof node === "string") {
		const element = context.elements.get(node);
		return element ? buildElement(element, parentOrigin, unseen, context.options) : [];
	}
	const group = context.groups.get(node.uuid);
	return group ? buildGroup(node, group, parentOrigin, unseen, context) : [];
};

export const buildAvatarTree = (model: BlockbenchModel, options: AvatarTreeOptions): AvatarNode[] => {
	const context: BuildContext = {
		options,
		elements: new Map(model.elements.map((element) => [element.uuid, element])),
		groups: new Map(model.groups.map((group) => [group.uuid, group])),
	};
	return model.outliner.flatMap((node) => buildNode(node, [0, 0, 0], options.unseenFaces, context));
};

export const facesOf = (node: AvatarNode): AvatarFace[] => [...node.faces, ...node.children.flatMap(facesOf)];
