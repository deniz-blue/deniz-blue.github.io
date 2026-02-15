import { Enum } from "@alan404/enum";
import { Vec2 } from "@alan404/vec2";

export type EnderWorkerInput = Enum<{
    init: OffscreenCanvas;
    dimensionsChange: Vec2;
}>;
