import { Composite, Engine, Events, type Body } from "matter-js";
import {
	iconBody,
	limitSpeed,
	type IconShape,
	type PiledIcon,
	type RestPosition,
} from "~/scripts/iconPile/bodies";
import { listenForDrags } from "~/scripts/iconPile/drag";
import { letThroughFromBelow } from "~/scripts/iconPile/platforms";
import { wrapBelowPage } from "~/scripts/iconPile/portal";
import { carryRestingIcons, carryRiders } from "~/scripts/iconPile/relayout";
import { measurePage, measureSolids, solidBodies, type Solid } from "~/scripts/iconPile/solids";

const STEP_MS = 1000 / 60;
const MAX_STEPS_PER_FRAME = 4;

const place = (icons: PiledIcon[]) =>
	icons.forEach(({ element, body, size }) => {
		const { x, y } = body.position;
		element.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px) rotate(${body.angle}rad)`;
	});

const iconsOfPile = (pile: HTMLElement): PiledIcon[] => {
	const elements = [...pile.querySelectorAll<HTMLElement>("[data-pile-icon]")];
	const size = elements[0]?.offsetWidth || 32;
	const floorBox = pile.parentElement!.getBoundingClientRect();
	return elements.map((element) => {
		const shape = element.dataset.shape as IconShape;
		const restPosition = JSON.parse(element.dataset.restPosition!) as RestPosition;
		return { element, size, body: iconBody(shape, restPosition, floorBox, size) };
	});
};

const keepPageMeasured = (engine: Engine, bodies: Body[]) => {
	let solids: Solid[] = [];
	let solidsInWorld = Composite.create();
	let page = measurePage();
	let pending: number | undefined;
	const measure = () => {
		pending = undefined;
		const next = measureSolids();
		carryRestingIcons(bodies, solids, next);
		solids = next;
		page = measurePage();
		Composite.remove(engine.world, solidsInWorld);
		solidsInWorld = Composite.create({ bodies: solidBodies(next, page) });
		Composite.add(engine.world, solidsInWorld);
	};
	const remeasure = () => (pending ??= requestAnimationFrame(measure));
	measure();
	new ResizeObserver(remeasure).observe(document.body);
	document.fonts.ready.then(remeasure);
	return { page: () => page, solids: () => solids };
};

const carryRidersOnScroll = (bodies: Body[], currentSolids: () => Solid[]) => {
	const scrollLefts = new Map(currentSolids().map(({ element }) => [element, element.scrollLeft]));
	const carry = ({ target }: Event) => {
		const solids = currentSolids();
		const carrier = solids.find(({ element }) => element === target);
		if (!carrier) return;
		const scrolledBy =
			carrier.element.scrollLeft - (scrollLefts.get(carrier.element) ?? carrier.element.scrollLeft);
		scrollLefts.set(carrier.element, carrier.element.scrollLeft);
		carryRiders(bodies, solids, carrier, -scrolledBy);
	};
	document.addEventListener("scroll", carry, { capture: true, passive: true });
};

const createEngine = (bodies: Body[]) => {
	const engine = Engine.create({
		enableSleeping: true,
		positionIterations: 10,
		velocityIterations: 8,
	});
	Composite.add(engine.world, bodies);
	Events.on(engine, "collisionStart", ({ pairs }) => pairs.forEach(letThroughFromBelow));
	Events.on(engine, "beforeUpdate", () => bodies.forEach(limitSpeed));
	return engine;
};

const runEngine = (engine: Engine, icons: PiledIcon[]) => {
	let lastTime = performance.now();
	let owedMs = 0;
	const tick = (now: number) => {
		owedMs = Math.min(owedMs + now - lastTime, STEP_MS * MAX_STEPS_PER_FRAME);
		lastTime = now;
		for (; owedMs >= STEP_MS; owedMs -= STEP_MS) Engine.update(engine, STEP_MS);
		place(icons);
		requestAnimationFrame(tick);
	};
	requestAnimationFrame(tick);
};

export const animateIconPiles = (piles: HTMLElement[]) => {
	const icons = piles.flatMap(iconsOfPile);
	const bodies = icons.map(({ body }) => body);
	document.body.append(...piles);
	piles.forEach((pile) => (pile.dataset.simulated = ""));
	const engine = createEngine(bodies);
	const measured = keepPageMeasured(engine, bodies);
	carryRidersOnScroll(bodies, measured.solids);
	Events.on(engine, "afterUpdate", () =>
		bodies.forEach((body) => wrapBelowPage(body, measured.page())),
	);
	place(icons);
	listenForDrags(engine, icons);
	runEngine(engine, icons);
};
