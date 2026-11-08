import { Bodies, Body } from "matter-js";
import { withSurfaceSpeed } from "~/scripts/iconPile/belts";

export type Box = { left: number; top: number; right: number; bottom: number };
export type Solid = { element: Element; box: Box; beltSpeed: number };
type Span = { left: number; right: number };
export type Page = { width: number; height: number; portalExit: Span };

const SOLID_SELECTOR = "[data-solid]";
const PORTAL_EXIT_SELECTOR = "[data-portal-exit]";
const WALL_THICKNESS = 400;
const CENTRE_DEPTH = 10_000;
const BELT_FRICTION = 1;

export const PLATFORM_LABEL = "platform";

const onPage = (rect: DOMRect): Box => ({
	left: rect.left + scrollX,
	top: rect.top + scrollY,
	right: rect.right + scrollX,
	bottom: rect.bottom + scrollY,
});

// matter-js picks the sign of a collision normal from the line between the two bodies' centres, so an icon
// near one end of a wide body can be pushed into it. A centre far below the body keeps that line pointing up.
const withCentreFarBelow = (body: Body) => {
	Body.setCentre(body, { x: body.position.x, y: body.bounds.max.y + CENTRE_DEPTH });
	return body;
};

const platformBody = ({ box: { left, top, right, bottom }, beltSpeed }: Solid) =>
	withSurfaceSpeed(
		withCentreFarBelow(
			Bodies.rectangle((left + right) / 2, (top + bottom) / 2, right - left, bottom - top, {
				isStatic: true,
				label: PLATFORM_LABEL,
				...(beltSpeed ? { friction: BELT_FRICTION } : {}),
			}),
		),
		beltSpeed,
	);

const pageWalls = ({ width, height }: Page): Body[] => [
	Bodies.rectangle(-WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height * 3, { isStatic: true }),
	Bodies.rectangle(width + WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height * 3, { isStatic: true }),
];

const contentSpan = (element: Element): Span => {
	const { left, right } = element.getBoundingClientRect();
	const { paddingLeft, paddingRight } = getComputedStyle(element);
	return { left: left + scrollX + parseFloat(paddingLeft), right: right + scrollX - parseFloat(paddingRight) };
};

export const measurePage = (): Page => {
	const { scrollWidth: width, scrollHeight: height } = document.documentElement;
	const exit = document.querySelector(PORTAL_EXIT_SELECTOR);
	return { width, height, portalExit: exit ? contentSpan(exit) : { left: 0, right: width } };
};

export const measureSolids = (): Solid[] =>
	[...document.querySelectorAll<HTMLElement>(SOLID_SELECTOR)]
		.map((element) => ({
			element,
			box: onPage(element.getBoundingClientRect()),
			beltSpeed: Number(element.dataset.beltSpeed ?? 0),
		}))
		.filter(({ box }) => box.right > box.left);

export const solidBodies = (solids: Solid[], page: Page): Body[] => [
	...solids.map(platformBody),
	...pageWalls(page),
];
