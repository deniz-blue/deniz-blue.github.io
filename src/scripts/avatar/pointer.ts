import { PIXELS_PER_UNIT } from "~/scripts/avatar/css";
import { STRAIGHT_AHEAD, anglesToward, type Angles } from "~/scripts/avatar/gaze";
import type { HeartArea } from "~/scripts/avatar/hearts";
import type { Point } from "~/scripts/avatar/math";

const REST_DELAY_MS = 3000;

const eyeOffset = (avatar: HTMLElement): Point => {
	const box = avatar.getBoundingClientRect();
	const eyes = avatar.querySelector("[data-part='Eyes']")?.getBoundingClientRect();
	return eyes ? { x: eyes.left - box.left, y: eyes.top - box.top } : { x: box.width / 2, y: box.height / 2 };
};

const heartArea = (avatar: HTMLElement): HeartArea => {
	const box = avatar.getBoundingClientRect();
	const faces = [...avatar.querySelectorAll("[data-layer='head'] .face")].map((face) => face.getBoundingClientRect());
	const left = Math.min(...faces.map((face) => face.left));
	const right = Math.max(...faces.map((face) => face.right));
	const top = Math.min(...faces.map((face) => face.top));
	return {
		centerX: ((left + right) / 2 - box.left) / PIXELS_PER_UNIT,
		top: (top - box.top) / PIXELS_PER_UNIT,
		bottom: box.height / PIXELS_PER_UNIT,
	};
};

export const listenForPets = (avatar: HTMLElement, pet: (area: HeartArea) => void) => {
	avatar.addEventListener("pointerdown", (event) => {
		event.preventDefault();
		pet(heartArea(avatar));
	});
	avatar.addEventListener("contextmenu", (event) => event.preventDefault());
};

export const followPointer = (avatar: HTMLElement, look: (toward: Angles) => void) => {
	const offset = eyeOffset(avatar);
	let restTimer: ReturnType<typeof setTimeout> | undefined;
	const lookAtPointer = (event: PointerEvent) => {
		clearTimeout(restTimer);
		const box = avatar.getBoundingClientRect();
		look(anglesToward({ x: box.left + offset.x, y: box.top + offset.y }, { x: event.clientX, y: event.clientY }));
	};
	addEventListener("pointermove", lookAtPointer);
	addEventListener("pointerdown", lookAtPointer);
	document.documentElement.addEventListener("pointerleave", () => {
		restTimer = setTimeout(() => look(STRAIGHT_AHEAD), REST_DELAY_MS);
	});
};
