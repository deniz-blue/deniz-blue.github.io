import type { FaceDirection, Vector3 } from "~/scripts/avatar/types";

export type Uv = [number, number, number, number];

type BlockbenchFace = {
	uv: Uv;
	texture?: number | false | null;
};

export type BlockbenchElement = {
	uuid: string;
	name: string;
	from: Vector3;
	to: Vector3;
	origin: Vector3;
	rotation?: Vector3;
	inflate?: number;
	visibility?: boolean;
	faces: Partial<Record<FaceDirection, BlockbenchFace>>;
};

export type BlockbenchGroup = {
	uuid: string;
	name: string;
	origin: Vector3;
	rotation?: Vector3;
	visibility?: boolean;
};

export type BlockbenchOutlinerNode = string | { uuid: string; children?: BlockbenchOutlinerNode[] };

export type BlockbenchKeyframe = {
	channel: string;
	time: number;
	interpolation?: string;
	data_points: { x: string | number; y: string | number; z: string | number }[];
};

type BlockbenchAnimation = {
	name: string;
	length: number;
	animators: Record<string, { name: string; keyframes?: BlockbenchKeyframe[] }>;
};

export type BlockbenchModel = {
	resolution: { width: number; height: number };
	elements: BlockbenchElement[];
	groups: BlockbenchGroup[];
	outliner: BlockbenchOutlinerNode[];
	textures: { name: string; source: string }[];
	animations?: BlockbenchAnimation[];
};

export const parseBlockbenchModel = (source: string) => JSON.parse(source) as BlockbenchModel;
