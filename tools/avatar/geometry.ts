import type { AvatarFace, FaceDirection, Vector3 } from "~/scripts/avatar/types";
import { PIXELS_PER_UNIT } from "../../src/scripts/avatar/css.ts";
import type { Uv } from "./blockbench.ts";

type FaceCorners = { u1v1: Vector3; u2v1: Vector3; u1v2: Vector3; u2v2: Vector3 };
type FacePlacement = Omit<AvatarFace, "direction" | "texture">;

export const FACE_DIRECTIONS: FaceDirection[] = ["east", "west", "up", "down", "south", "north"];

export const subtract = (a: Vector3, b: Vector3): Vector3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const scale = (a: Vector3, factor: number): Vector3 => [a[0] * factor, a[1] * factor, a[2] * factor];
const cross = (a: Vector3, b: Vector3): Vector3 => [
	a[1] * b[2] - a[2] * b[1],
	a[2] * b[0] - a[0] * b[2],
	a[0] * b[1] - a[1] * b[0],
];
const length = (a: Vector3) => Math.hypot(...a);
const round = (value: number) => +value.toFixed(4);

const corners = (u1v1: Vector3, u2v1: Vector3, u1v2: Vector3, u2v2: Vector3): FaceCorners => ({ u1v1, u2v1, u1v2, u2v2 });

export const boxCorners = ([x1, y1, z1]: Vector3, [x2, y2, z2]: Vector3): Record<FaceDirection, FaceCorners> => ({
	east: corners([x2, y2, z2], [x2, y2, z1], [x2, y1, z2], [x2, y1, z1]),
	west: corners([x1, y2, z1], [x1, y2, z2], [x1, y1, z1], [x1, y1, z2]),
	up: corners([x1, y2, z1], [x2, y2, z1], [x1, y2, z2], [x2, y2, z2]),
	down: corners([x1, y1, z2], [x2, y1, z2], [x1, y1, z1], [x2, y1, z1]),
	south: corners([x1, y2, z2], [x2, y2, z2], [x1, y1, z2], [x2, y1, z2]),
	north: corners([x2, y2, z1], [x1, y2, z1], [x2, y1, z1], [x1, y1, z1]),
});

const cornerAt = (faceCorners: FaceCorners, atU2: boolean, atV2: boolean) => {
	if (atV2) return atU2 ? faceCorners.u2v2 : faceCorners.u1v2;
	return atU2 ? faceCorners.u2v1 : faceCorners.u1v1;
};

// Blockbench is y-up with models facing -z; CSS is y-down with +z toward the viewer.
// Negating a point maps one onto the other, and negation commutes with rotation,
// so Blockbench rotations carry over to CSS unchanged.
export const placeFace = (faceCorners: FaceCorners, [u1, v1, u2, v2]: Uv): FacePlacement | undefined => {
	const uvWidth = Math.abs(u2 - u1);
	const uvHeight = Math.abs(v2 - v1);
	if (uvWidth === 0 || uvHeight === 0) return undefined;
	const origin = cornerAt(faceCorners, u1 > u2, v1 > v2);
	const xAxis = scale(subtract(cornerAt(faceCorners, u1 <= u2, v1 > v2), origin), -1 / uvWidth);
	const yAxis = scale(subtract(cornerAt(faceCorners, u1 > u2, v1 <= v2), origin), -1 / uvHeight);
	const normal = cross(xAxis, yAxis);
	if (length(normal) === 0) return undefined;
	const zAxis = scale(normal, 1 / length(normal));
	const translation = scale(origin, -PIXELS_PER_UNIT);
	return {
		width: round(uvWidth * PIXELS_PER_UNIT),
		height: round(uvHeight * PIXELS_PER_UNIT),
		offsetU: round(Math.min(u1, u2) * PIXELS_PER_UNIT),
		offsetV: round(Math.min(v1, v2) * PIXELS_PER_UNIT),
		matrix: [...xAxis, 0, ...yAxis, 0, ...zAxis, 0, ...translation, 1].map(round).join(","),
	};
};

export const placeNode = (offset: Vector3, [x, y, z]: Vector3) => {
	const [dx, dy, dz] = scale(offset, -PIXELS_PER_UNIT).map(round);
	return `translate3d(${dx}px,${dy}px,${dz}px) rotateZ(${z}deg) rotateY(${y}deg) rotateX(${x}deg)`;
};
