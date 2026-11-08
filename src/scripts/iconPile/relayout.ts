import { Body, Sleeping } from "matter-js";
import type { Box, Solid } from "~/scripts/iconPile/solids";

const RESTING_GAP = 3;

const bottomOf = (body: Body) => Math.max(...body.vertices.map(({ y }) => y));

const isAbove = (body: Body, { left, top, right }: Box) =>
	bottomOf(body) <= top + RESTING_GAP && body.position.x >= left && body.position.x <= right;

const nearestSolidBelow = (body: Body, solids: Solid[]) =>
	solids
		.filter(({ box }) => isAbove(body, box))
		.reduce<Solid | undefined>(
			(nearest, solid) => (nearest && nearest.box.top <= solid.box.top ? nearest : solid),
			undefined,
		);

const isTouching = (body: Body, { top }: Box) => bottomOf(body) >= top - RESTING_GAP;

const movedWith = (body: Body, before: Box, after: Box) => {
	const fromLeft = body.position.x - before.left;
	const fromRight = before.right - body.position.x;
	return {
		x: fromLeft < fromRight ? after.left + fromLeft : after.right - fromRight,
		y: body.position.y + after.top - before.top,
	};
};

// matter-js never wakes a sleeping body for a static one, so a moved platform would leave icons floating.
export const carryRestingIcons = (bodies: Body[], before: Solid[], after: Solid[]) => {
	const boxesAfter = new Map(after.map(({ element, box }) => [element, box]));
	bodies.forEach((body) => {
		const support = nearestSolidBelow(body, before);
		if (!support) return;
		const next = boxesAfter.get(support.element);
		if (next) Body.setPosition(body, movedWith(body, support.box, next));
		else Sleeping.set(body, false);
	});
};

export const carryRiders = (bodies: Body[], solids: Solid[], carrier: Solid, distance: number) =>
	bodies
		.filter((body) => nearestSolidBelow(body, solids) === carrier && isTouching(body, carrier.box))
		.forEach((body) => {
			Body.setPosition(body, { x: body.position.x + distance, y: body.position.y });
			Sleeping.set(body, false);
		});
