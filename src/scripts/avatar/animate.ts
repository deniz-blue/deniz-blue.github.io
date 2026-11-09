import { AVATAR_ANIMATIONS } from "~/assets/avatar/avatarAnimations";
import { poseVariable } from "~/scripts/avatar/css";
import { STRAIGHT_AHEAD } from "~/scripts/avatar/gaze";
import { drawHearts, findHeartLayers } from "~/scripts/avatar/heartElements";
import { clamp } from "~/scripts/avatar/math";
import { followPointer, listenForPets } from "~/scripts/avatar/pointer";
import { poseValues } from "~/scripts/avatar/pose";
import { INITIAL_STATE, petSimulation, stepSimulation } from "~/scripts/avatar/simulation";
import { TICK_MS } from "~/scripts/avatar/ticks";
import { prefersReducedMotion } from "~/scripts/motion";
import { watchOnScreen } from "~/scripts/onScreen";

const nodesByPoseVariable = (avatar: HTMLElement) =>
	Map.groupBy(avatar.querySelectorAll<HTMLElement>("[data-part]"), (node) => poseVariable(node.dataset.part ?? ""));

const writePose = (nodes: Map<string, HTMLElement[]>, written: Map<string, string>, values: [string, string][]) => {
	for (const [name, value] of values) {
		if (written.get(name) === value) continue;
		nodes.get(name)?.forEach((node) => node.style.setProperty(name, value));
		written.set(name, value);
	}
};

export const animateAvatar = (avatar: HTMLElement) => {
	if (prefersReducedMotion()) return;
	const blinkLength = AVATAR_ANIMATIONS.blink.length;
	const heartLayers = findHeartLayers(avatar);
	const posedNodes = nodesByPoseVariable(avatar);
	const written = new Map<string, string>();
	const heartElements = new Map<number, HTMLElement>();
	let toward = STRAIGHT_AHEAD;
	let previous = INITIAL_STATE;
	let current = INITIAL_STATE;
	let tickedAt = performance.now();
	let frame: number | undefined;
	let onScreen = true;
	const render = (now: number) => {
		const delta = clamp((now - tickedAt) / TICK_MS, 0, 1);
		writePose(posedNodes, written, poseValues(previous, current, delta));
		drawHearts(heartLayers, heartElements, previous.hearts, current.hearts, delta);
		frame = delta < 1 ? requestAnimationFrame(render) : undefined;
	};
	watchOnScreen(avatar, (visible) => (onScreen = visible));
	setInterval(() => {
		if (!onScreen) return;
		[previous, current] = [current, stepSimulation(current, { toward, blinkLength, random: Math.random })];
		tickedAt = performance.now();
		frame ??= requestAnimationFrame(render);
	}, TICK_MS);
	followPointer(avatar, (angles) => (toward = angles));
	listenForPets(avatar, (area) => (current = petSimulation(current, area, Math.random)));
};
