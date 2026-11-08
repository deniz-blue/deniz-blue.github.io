import type { Body, Engine, Pair } from "matter-js";
import { PLATFORM_LABEL } from "~/scripts/iconPile/solids";

const landsOnTop = (body: Body, platform: Body) =>
	!body.plugin.held && body.position.y <= platform.bounds.min.y;

// matter-js sets a pair's isSensor only when it creates the pair, so a value set here lasts until the bodies separate.
export const letThroughFromBelow = (pair: Pair) => {
	const platform = [pair.bodyA, pair.bodyB].find((body) => body.label === PLATFORM_LABEL);
	const other = platform === pair.bodyA ? pair.bodyB : pair.bodyA;
	if (platform && !other.isStatic) pair.isSensor = !landsOnTop(other, platform);
};

export const recheckPlatformContacts = (engine: Engine, body: Body) =>
	engine.pairs.list
		.filter((pair: Pair) => pair.bodyA === body || pair.bodyB === body)
		.forEach(letThroughFromBelow);
