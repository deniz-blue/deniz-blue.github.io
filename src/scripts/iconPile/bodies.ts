import { Bodies, Body, Vector, type IBodyDefinition } from "matter-js";

export type IconShape = "circle" | "square";
export type RestPosition = { iconsFromRight: number; iconsAboveFloor: number };
export type PiledIcon = { element: HTMLElement; body: Body; size: number };

const ICON_MATERIAL: IBodyDefinition = {
	restitution: 0.3,
	friction: 0.8,
	frictionStatic: 1,
	frictionAir: 0.01,
	density: 0.002,
};
const CORNER_ROUNDING = 0.15;
const MAX_SPEED = 14;

const iconBodyAt = (shape: IconShape, center: Vector, size: number): Body =>
	shape === "circle"
		? Bodies.circle(center.x, center.y, size / 2, ICON_MATERIAL)
		: Bodies.rectangle(center.x, center.y, size, size, {
				...ICON_MATERIAL,
				chamfer: { radius: size * CORNER_ROUNDING },
			});

export const iconBody = (
	shape: IconShape,
	{ iconsFromRight, iconsAboveFloor }: RestPosition,
	floor: DOMRect,
	size: number,
): Body =>
	iconBodyAt(
		shape,
		{
			x: floor.right + scrollX - iconsFromRight * size,
			y: floor.top + scrollY - iconsAboveFloor * size,
		},
		size,
	);

export const limitSpeed = (body: Body) => {
	const speed = Vector.magnitude(body.velocity);
	if (speed > MAX_SPEED) Body.setVelocity(body, Vector.mult(body.velocity, MAX_SPEED / speed));
};
