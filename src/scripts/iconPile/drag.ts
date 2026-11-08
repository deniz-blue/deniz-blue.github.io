import { Composite, Constraint, Sleeping, Vector, type Body, type Engine } from "matter-js";
import type { PiledIcon } from "~/scripts/iconPile/bodies";
import { recheckPlatformContacts } from "~/scripts/iconPile/platforms";

type Hold = { grip: Constraint; pointerId: number };

const GRIP = { stiffness: 0.08, damping: 0.08, length: 0 };

const pagePoint = (event: PointerEvent): Vector => ({ x: event.pageX, y: event.pageY });

// matter-js solves a sleeping body as immovable until something hits it fast enough, so a held icon would wedge into its neighbours.
const wakeAll = (bodies: Body[]) => bodies.forEach((body) => Sleeping.set(body, false));

const listenOnIcon = (engine: Engine, element: HTMLElement, body: Body, pile: Body[]) => {
	let hold: Hold | undefined;
	element.addEventListener("pointerdown", (event) => {
		if (hold || event.button !== 0) return;
		event.preventDefault();
		element.setPointerCapture(event.pointerId);
		const start = pagePoint(event);
		const grip = Constraint.create({
			...GRIP,
			pointA: start,
			bodyB: body,
			pointB: Vector.sub(start, body.position),
		});
		hold = { grip, pointerId: event.pointerId };
		body.plugin.held = true;
		wakeAll(pile);
		Composite.add(engine.world, grip);
	});
	element.addEventListener("pointermove", (event) => {
		if (!hold || hold.pointerId !== event.pointerId) return;
		hold.grip.pointA = pagePoint(event);
		wakeAll(pile);
	});
	const release = (event: PointerEvent) => {
		if (!hold || hold.pointerId !== event.pointerId) return;
		Composite.remove(engine.world, hold.grip);
		hold = undefined;
		body.plugin.held = false;
		recheckPlatformContacts(engine, body);
	};
	element.addEventListener("pointerup", release);
	element.addEventListener("pointercancel", release);
};

export const listenForDrags = (engine: Engine, icons: PiledIcon[]) => {
	const bodies = icons.map(({ body }) => body);
	icons.forEach(({ element, body }) => listenOnIcon(engine, element, body, bodies));
};
