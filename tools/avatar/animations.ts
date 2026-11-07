import type { AnimationTracks, PositionKeyframe } from "~/avatar/types";
import type { BlockbenchKeyframe, BlockbenchModel } from "./blockbench.ts";

const SMOOTH_INTERPOLATIONS = ["bezier", "catmullrom"];

const parseNumber = (value: string | number) => {
	const parsed = Number.parseFloat(String(value));
	return Number.isFinite(parsed) ? parsed : 0;
};

const toPositionKeyframe = (keyframe: BlockbenchKeyframe): PositionKeyframe => {
	const point = keyframe.data_points[0];
	return {
		time: keyframe.time,
		position: point ? [parseNumber(point.x), parseNumber(point.y), parseNumber(point.z)] : [0, 0, 0],
		smooth: SMOOTH_INTERPOLATIONS.includes(keyframe.interpolation ?? ""),
	};
};

export const positionTracks = (model: BlockbenchModel, name: string): AnimationTracks => {
	const animation = model.animations?.find((candidate) => candidate.name === name);
	if (!animation) throw new Error(`the model has no ${name} animation`);
	const bones = Object.values(animation.animators).flatMap((animator) => {
		const keyframes = (animator.keyframes ?? [])
			.filter((keyframe) => keyframe.channel === "position")
			.map(toPositionKeyframe)
			.toSorted((a, b) => a.time - b.time);
		return keyframes.length > 0 ? [[animator.name, keyframes] as const] : [];
	});
	return { length: animation.length, bones: Object.fromEntries(bones) };
};
