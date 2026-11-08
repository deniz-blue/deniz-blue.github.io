import { clamp, type Point } from "~/scripts/avatar/math";

export type Angles = { yaw: number; pitch: number };

export const STRAIGHT_AHEAD: Angles = { yaw: 0, pitch: 0 };

const VIEWING_DISTANCE = 260;
const HEAD_SHARE = 0.55;
const MAX_YAW = 36;
const MAX_PITCH_UP = 18;
const MAX_PITCH_DOWN = 9;
const MAX_EYE_ANGLE = 40;

const degrees = (radians: number) => (radians * 180) / Math.PI;

export const anglesToward = (eye: Point, pointer: Point): Angles => ({
	yaw: degrees(Math.atan2(pointer.x - eye.x, VIEWING_DISTANCE)),
	pitch: degrees(Math.atan2(eye.y - pointer.y, VIEWING_DISTANCE)),
});

export const headAnglesFor = (toward: Angles): Angles => ({
	yaw: clamp(toward.yaw * HEAD_SHARE, -MAX_YAW, MAX_YAW),
	pitch: clamp(toward.pitch * HEAD_SHARE, -MAX_PITCH_DOWN, MAX_PITCH_UP),
});

export const eyeDirectionFor = (toward: Angles, head: Angles): Point => ({
	x: clamp((toward.yaw - head.yaw) / MAX_EYE_ANGLE, -1, 1),
	y: clamp((toward.pitch - head.pitch) / MAX_EYE_ANGLE, -1, 1),
});
