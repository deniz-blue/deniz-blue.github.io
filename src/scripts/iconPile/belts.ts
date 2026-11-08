import { Body } from "matter-js";

// matter-js measures velocity in pixels per 1000 / 60 ms, keeps it on a static body, and uses it for friction at a contact.
const MATTER_STEPS_PER_SECOND = 60;

export const withSurfaceSpeed = (body: Body, pixelsPerSecond: number) => {
	Body.setVelocity(body, { x: pixelsPerSecond / MATTER_STEPS_PER_SECOND, y: 0 });
	return body;
};
