import { Vec2, vec2 } from "@alan404/vec2";
import { match } from "@alan404/enum";
import { setRafInterval } from "../../../utils/set-raf-interval";
import { EnderWorkerInput } from "./ender.msg";
import { compileShader, createProgram } from "../starfield/utils";
import vertexShaderSrc from "./ender.vsh?raw";
import fragmentShaderSrc from "./ender.fsh?raw";

let dim: Vec2;
let canvas: OffscreenCanvas;
let gl: WebGL2RenderingContext;

let program: WebGLProgram;

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
    gl.viewport(0, 0, dim.x, dim.y);

    program = createProgram(gl, [
        compileShader(gl, gl.VERTEX_SHADER, vertexShaderSrc)!,
        compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc)!,
    ])!;

    setRafInterval((dt) => {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);


    }, 24);
};

self.onmessage = (e: MessageEvent<EnderWorkerInput>) => {
    const msg = e.data;
    match(msg)({
        init: (offscreen) => {
            dim = vec2(offscreen.width, offscreen.height);
            canvas = offscreen;
            init();
        },

        dimensionsChange: (d) => {
            dim = d;
            gl?.viewport(0, 0, dim.x, dim.y);
        },

        _: () => { },
    })
};
