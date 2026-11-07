import { PEEKING_AVATAR_ANIMATIONS } from "~/assets/avatar/peekingAvatarAnimations";
import { STRAIGHT_AHEAD } from "~/scripts/peekingAvatar/gaze";
import { drawHearts, findHeartLayers } from "~/scripts/peekingAvatar/heartElements";
import { clamp } from "~/scripts/peekingAvatar/math";
import { followPointer, listenForPets } from "~/scripts/peekingAvatar/pointer";
import { poseValues } from "~/scripts/peekingAvatar/pose";
import { INITIAL_STATE, petSimulation, stepSimulation } from "~/scripts/peekingAvatar/simulation";
import { TICK_MS } from "~/scripts/peekingAvatar/ticks";

const writePose = (avatar: HTMLElement, written: Map<string, string>, values: [string, string][]) => {
	for (const [name, value] of values) {
		if (written.get(name) === value) continue;
		avatar.style.setProperty(name, value);
		written.set(name, value);
	}
};

export const animatePeekingAvatar = (avatar: HTMLElement) => {
	if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	const blinkLength = PEEKING_AVATAR_ANIMATIONS.blink.length;
	const heartLayers = findHeartLayers(avatar);
	const written = new Map<string, string>();
	const heartElements = new Map<number, HTMLElement>();
	let toward = STRAIGHT_AHEAD;
	let previous = INITIAL_STATE;
	let current = INITIAL_STATE;
	let tickedAt = performance.now();
	let frame: number | undefined;
	const render = (now: number) => {
		const delta = clamp((now - tickedAt) / TICK_MS, 0, 1);
		writePose(avatar, written, poseValues(previous, current, delta));
		drawHearts(heartLayers, heartElements, previous.hearts, current.hearts, delta);
		frame = delta < 1 ? requestAnimationFrame(render) : undefined;
	};
	setInterval(() => {
		[previous, current] = [current, stepSimulation(current, { toward, blinkLength, random: Math.random })];
		tickedAt = performance.now();
		frame ??= requestAnimationFrame(render);
	}, TICK_MS);
	followPointer(avatar, (angles) => (toward = angles));
	listenForPets(avatar, (area) => (current = petSimulation(current, area, Math.random)));
};
