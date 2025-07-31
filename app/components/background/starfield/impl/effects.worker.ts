import { Vec2, vec2 } from "@alan404/vec2";
import { match } from "@alan404/enum";
import { EffectsWorkerInput, EffectsWorkerOutput } from "./worker-messages";
import { DEFAULT_DIM, StaticStarfield } from "./starfield";
import { starfield_rendergl2, starfield_rendergl2_init } from "./gl2/render-gl2";

const setRafInterval = (cb: (dt: number) => any, delay: number) => {
    let start = performance.now();
    const loop = () => {
        const current = performance.now();
        if (current - start >= delay) {
            let deltaTime = (current - start) / 1000;
            if(deltaTime > 1) deltaTime %= 1000;
            cb(deltaTime);
            start = performance.now();
        }
        handle = requestAnimationFrame(loop);
    };
    let handle = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(handle);
};

let configs = [
    { color: "ab6ffa", scroll: vec2(0.3, 0.3) },
    { color: "71d5ff", scroll: vec2(0.3, 0.3), flowSpeed: 2.5 },
    { color: "53f3dd", scroll: vec2(0.5, 0.5) },
    { color: "cefdff", scroll: vec2(0.5, 0.5), flowSpeed: 3 },
];

let starfields: StaticStarfield[] = configs.map(({ color }) => {
    let f = new StaticStarfield();
    f.color = color;
    return f;
});

let dim: Vec2;
let canvas: OffscreenCanvas;
let gl: WebGL2RenderingContext;

const init = () => {
    if (!dim) throw new Error("dim not initialized");
    if (!canvas) throw new Error("canvas not initialized");

    gl = canvas.getContext("webgl2", {
        antialias: false,
        powerPreference: "low-power",
        desynchronized: true,
        failIfMajorPerformanceCaveat: true,
    })!;

    if (!gl) throw new Error("GL2 failed to init");

    for(let sf of starfields) sf.resize(dim);
    for(let sf of starfields) sf.update(1);
    gl.viewport(0, 0, dim.x, dim.y);
    self.postMessage({ type: "initialized" } as EffectsWorkerOutput);

    let init = starfield_rendergl2_init(gl);

    console.log("worker: gl2 init complete")

    setRafInterval((dt) => {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        for (let s of starfields)
            s.update(dt);

        starfield_rendergl2(gl, init, {
            dimensions: dim,
            scrollPosition: vec2(),
            starfields,
        });
    }, 24);
};

self.onmessage = (e: MessageEvent<EffectsWorkerInput>) => {
    const msg = e.data;
    match(msg)({
        init: (offscreen) => {
            dim = vec2(offscreen.width, offscreen.height);
            canvas = offscreen;
            init();
        },

        dimensionsChange: (dims) => {
            dim = dims;
            
            if(canvas) {
                canvas.width = dim.x;
                canvas.height = dim.y;
            }

            if(gl) gl.viewport(0,0,dim.x,dim.y);

            for(let sf of starfields) sf.resize(dim);
        },

        _: () => { },
    })
};
