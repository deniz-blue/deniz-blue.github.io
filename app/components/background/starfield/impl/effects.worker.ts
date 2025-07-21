import { Effect, EffectsWorkerInput, EffectsWorkerOutput } from "./types";
import { FarewellBackgroundEffect } from "./gl2/_FarewellBackgroundEffect";
import { match } from "@alan404/enum";

let canvas: OffscreenCanvas;
let gl: WebGL2RenderingContext;
let store: Effect[] = [];

let mode: "a" | "t" = "t";
function renderLoop() {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (let effect of store) {
        effect.render();
    }

    if(mode == "t") {
        setTimeout(renderLoop, 1000 / 24);
    } else {
        requestAnimationFrame(renderLoop);
    }
}

let lastTime = performance.now();
function updateLoop() {
    const now = performance.now();
    const dt = (now - lastTime) / 1000;
    lastTime = now;

    for (let effect of store) {
        effect.update(dt);
    }

    setTimeout(updateLoop, 1000 / 24); // 24 fps
}

function startLoop() {
    renderLoop();
    updateLoop();
}

let scrollendTimeout: number | undefined;
self.onmessage = (e: MessageEvent<EffectsWorkerInput>) => {
    const msg = e.data;

    match(msg)({
        init: ({ canvas: cv, dimensions }) => {
            canvas = cv;
            const ctx = canvas.getContext("webgl2", {
                antialias: false,
                powerPreference: "low-power",
                desynchronized: true,
                failIfMajorPerformanceCaveat: true,
            });
            if (!ctx) {
                console.error("WebGL2 not supported");
                return;
            }

            gl = ctx;

            store = [
                new FarewellBackgroundEffect(gl)
            ]

            for (let effect of store) {
                effect.onDimensionsChange(dimensions);
                if(effect instanceof FarewellBackgroundEffect) effect.createStarfields();
            }

            canvas.width = dimensions.x;
            canvas.height = dimensions.y;
            gl.viewport(0, 0, dimensions.x, dimensions.y);

            self.postMessage({ type: "initialized" } as EffectsWorkerOutput);

            startLoop();
        },

        dimensionsChange: ({ dimensions }) => {
            canvas.width = dimensions.x;
            canvas.height = dimensions.y;
            gl.viewport(0, 0, dimensions.x, dimensions.y);

            for (let effect of store) {
                effect.onDimensionsChange(dimensions);
            }
        },

        mousemove: ({ pos }) => {
            for (let effect of store) {
                effect.onMouseMove(pos);
            }
        },

        scroll: ({ pos }) => {
            mode = "a";
            clearTimeout(scrollendTimeout);
            for (let effect of store) {
                effect.onScrollPositionChange(pos);
            }
        },

        scrollend: () => {
            clearTimeout(scrollendTimeout);
            scrollendTimeout = setTimeout(() => {
                mode = "t";
            }, 100);
        },
    });
};
