export type Vector3 = [number, number, number];
export type FaceDirection = "north" | "east" | "south" | "west" | "up" | "down";

export type AvatarFace = {
	direction: FaceDirection;
	texture: number;
	width: number;
	height: number;
	offsetU: number;
	offsetV: number;
	matrix: string;
};

export type AvatarNode = { name: string; transform: string; faces: AvatarFace[]; children: AvatarNode[] };

export type PositionKeyframe = { time: number; position: Vector3; smooth: boolean };
export type AnimationTracks = { length: number; bones: Record<string, PositionKeyframe[]> };

export type AvatarAnimations = {
	lookHorizontal: AnimationTracks;
	lookVertical: AnimationTracks;
	blink: AnimationTracks;
};

export type AvatarData = {
	textureSize: { width: number; height: number };
	layers: { head: AvatarNode[]; body: AvatarNode[]; arms: AvatarNode[] };
	shadedTextureUrls: Record<string, string>;
};
