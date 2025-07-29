import { Enum } from "@alan404/enum";
import { Vec2 } from "@alan404/vec2";

export type EffectsWorkerInput = Enum<{
    init: OffscreenCanvas;
    dimensionsChange: Vec2;
    mousemove: Vec2;
    scroll: Vec2;
    scrollend: {};
}>;

export type EffectsWorkerOutput = Enum<{
    initialized: undefined;
}>;
