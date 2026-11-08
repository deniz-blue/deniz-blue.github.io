const FRICTION_PER_MS = 0.996;
const STOP_SPEED = 0.01;
const STILL_MS = 50;
const SMOOTHING = 0.8;

type Sample = { x: number; time: number; velocity: number };

const nextSample = (previous: Sample, x: number, time: number): Sample => ({
	x,
	time,
	velocity:
		time > previous.time
			? SMOOTHING * ((x - previous.x) / (time - previous.time)) +
				(1 - SMOOTHING) * previous.velocity
			: previous.velocity,
});

const glide = (element: HTMLElement, velocity: number, since: number, signal: AbortSignal) =>
	requestAnimationFrame((now) => {
		if (signal.aborted || Math.abs(velocity) < STOP_SPEED) return;
		element.scrollLeft -= velocity * (now - since);
		glide(element, velocity * FRICTION_PER_MS ** (now - since), now, signal);
	});

const followDrag = (element: HTMLElement, down: PointerEvent, glideSignal: AbortSignal) => {
	const startScroll = element.scrollLeft;
	const drag = new AbortController();
	let sample: Sample = { x: down.clientX, time: down.timeStamp, velocity: 0 };
	element.setPointerCapture(down.pointerId);
	const move = (event: PointerEvent) => {
		element.scrollLeft = startScroll - (event.clientX - down.clientX);
		sample = nextSample(sample, event.clientX, event.timeStamp);
	};
	const release = (event: PointerEvent) => {
		drag.abort();
		if (event.timeStamp - sample.time < STILL_MS)
			glide(element, sample.velocity, performance.now(), glideSignal);
	};
	element.addEventListener("pointermove", move, { signal: drag.signal });
	element.addEventListener("pointerup", release, { signal: drag.signal });
	element.addEventListener("pointercancel", () => drag.abort(), { signal: drag.signal });
};

export const scrollByDragging = (element: HTMLElement) => {
	let gliding = new AbortController();
	element.addEventListener("wheel", () => gliding.abort(), { passive: true });
	element.addEventListener("pointerdown", (down) => {
		// A press on a scrollbar is targeted at the scrolling element itself.
		if (down.pointerType !== "mouse" || down.button !== 0 || down.target === element) return;
		down.preventDefault();
		gliding.abort();
		gliding = new AbortController();
		followDrag(element, down, gliding.signal);
	});
};
