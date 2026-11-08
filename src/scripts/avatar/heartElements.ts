import { cssPixels } from "~/scripts/avatar/css";
import type { Heart } from "~/scripts/avatar/hearts";
import { lerp } from "~/scripts/avatar/math";

type HeartLayers = { behind: HTMLElement; front: HTMLElement };

export const findHeartLayers = (avatar: HTMLElement): HeartLayers => ({
	behind: avatar.querySelector<HTMLElement>("[data-hearts='behind']") ?? avatar,
	front: avatar.querySelector<HTMLElement>("[data-hearts='front']") ?? avatar,
});

const removeGoneHearts = (elements: Map<number, HTMLElement>, hearts: Heart[]) => {
	const alive = new Set(hearts.map((heart) => heart.id));
	for (const [id, element] of elements) {
		if (alive.has(id)) continue;
		element.remove();
		elements.delete(id);
	}
};

export const drawHearts = (layers: HeartLayers, elements: Map<number, HTMLElement>, previous: Heart[], current: Heart[], delta: number) => {
	removeGoneHearts(elements, current);
	const previousY = new Map(previous.map((heart) => [heart.id, heart.y]));
	for (const heart of current) {
		const layer = heart.behind ? layers.behind : layers.front;
		const element = elements.get(heart.id) ?? layer.appendChild(Object.assign(document.createElement("div"), { className: "heart" }));
		elements.set(heart.id, element);
		const size = cssPixels(heart.size);
		const y = lerp(previousY.get(heart.id) ?? heart.y, heart.y, delta);
		element.style.cssText = `width:${size};height:${size};transform:translate(${cssPixels(heart.x - heart.size / 2)},${cssPixels(y - heart.size / 2)})`;
	}
};
