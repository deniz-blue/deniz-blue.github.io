import { Body } from "matter-js";
import type { Page } from "~/scripts/iconPile/solids";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const wrapBelowPage = (body: Body, { height, portalExit }: Page) => {
	const { min, max } = body.bounds;
	if (min.y <= height) return;
	const halfWidth = (max.x - min.x) / 2;
	Body.setPosition(body, {
		x: clamp(body.position.x, portalExit.left + halfWidth, portalExit.right - halfWidth),
		y: body.position.y - height - (max.y - min.y),
	});
	Body.setVelocity(body, { x: 0, y: body.velocity.y });
};
