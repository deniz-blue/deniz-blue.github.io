import type { AvatarFace, PeekingAvatarAnimations, PeekingAvatarData } from "~/avatar/types";
import { PIXELS_PER_UNIT, faceTextureClass } from "../../src/avatar/css.ts";
import { positionTracks } from "./animations.ts";
import type { BlockbenchModel, Uv } from "./blockbench.ts";
import {
	FACE_BRIGHTNESS,
	clearOutsideRegions,
	decodeTexture,
	isRegionTransparent,
	shadedTextureUrl,
	type DecodedTexture,
	type Resolution,
} from "./textures.ts";
import { buildAvatarTree, facesOf, type AvatarTreeOptions } from "./tree.ts";

const OUTFIT = "Outfit0.png";
const OUTFIT_INFLATE: Partial<Record<string, number>> = {
	Body: 0.05,
	LeftArm: 0.05,
	RightArm: 0.05,
	LeftLeg: 0.05,
	RightLeg: 0.05,
	Jacket: 0.01,
	"Left Sleeve": 0.01,
	"Right Sleeve": 0.01,
	"Left Pants": 0.01,
	"Right Pants": 0.01,
};
const BELOW_CARD_EDGE = ["LeftLeg", "RightLeg", "Tail"];
const LAYER_GROUPS = { head: ["Head"], body: ["Body"], arms: ["LeftArm", "RightArm"] };

const treeOptions = (model: BlockbenchModel, textures: DecodedTexture[]): Omit<AvatarTreeOptions, "hiddenGroups"> => {
	const outfitTexture = model.textures.findIndex((texture) => texture.name === OUTFIT);
	if (outfitTexture === -1) throw new Error(`the model has no ${OUTFIT} texture`);
	return {
		unseenFaces: ["south"],
		unseenFacesByGroup: { Body: ["down"], LeftArm: ["up"], RightArm: ["up"] },
		outfit: { texture: outfitTexture, inflateByElement: OUTFIT_INFLATE },
		isTransparent: (texture, uv) => {
			const decoded = textures[texture];
			return decoded === undefined || isRegionTransparent(decoded, model.resolution, uv);
		},
	};
};

const buildLayers = (model: BlockbenchModel, options: Omit<AvatarTreeOptions, "hiddenGroups">): PeekingAvatarData["layers"] => {
	const otherGroups = (shown: string[]) => Object.values(LAYER_GROUPS).flat().filter((group) => !shown.includes(group));
	const layer = (shown: string[]) => buildAvatarTree(model, { ...options, hiddenGroups: [...BELOW_CARD_EDGE, ...otherGroups(shown)] });
	return { head: layer(LAYER_GROUPS.head), body: layer(LAYER_GROUPS.body), arms: layer(LAYER_GROUPS.arms) };
};

const faceUv = (face: AvatarFace): Uv => [
	face.offsetU / PIXELS_PER_UNIT,
	face.offsetV / PIXELS_PER_UNIT,
	(face.offsetU + face.width) / PIXELS_PER_UNIT,
	(face.offsetV + face.height) / PIXELS_PER_UNIT,
];

const shadeTextures = async (faces: AvatarFace[], textures: DecodedTexture[], resolution: Resolution) => {
	const entries = await Promise.all(
		[...Map.groupBy(faces, faceTextureClass)].map(async ([name, group]) => {
			const [face] = group;
			const decoded = face && textures[face.texture];
			if (!decoded) return [];
			const used = clearOutsideRegions(decoded, resolution, group.map(faceUv));
			return [[name, await shadedTextureUrl(used, FACE_BRIGHTNESS[face.direction])] as const];
		}),
	);
	return Object.fromEntries(entries.flat());
};

export const convertPeekingAvatar = async (model: BlockbenchModel): Promise<PeekingAvatarData> => {
	const textures = await Promise.all(model.textures.map((texture) => decodeTexture(texture.source)));
	const layers = buildLayers(model, treeOptions(model, textures));
	return {
		textureSize: model.resolution,
		layers,
		shadedTextureUrls: await shadeTextures(Object.values(layers).flat().flatMap(facesOf), textures, model.resolution),
	};
};

export const peekingAvatarAnimations = (model: BlockbenchModel): PeekingAvatarAnimations => ({
	lookHorizontal: positionTracks(model, "LookHorizontal"),
	lookVertical: positionTracks(model, "LookVertical"),
	blink: positionTracks(model, "Blink"),
});
