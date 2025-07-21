import { Enum } from "@alan404/enum";
import { vec2, Vec2 } from "@alan404/vec2";

export type EffectsWorkerInput = Enum<{
    init: {
        canvas: OffscreenCanvas;
        dimensions: Vec2;
    };
    dimensionsChange: {
        dimensions: Vec2;
    };
    mousemove: {
        pos: Vec2;
    };
    scroll: {
        pos: Vec2;
    };
    scrollend: {};
}>;

export type EffectsWorkerOutput = Enum<{
    initialized: undefined;
}>;

export class Effect {
    id: string = "";
    dimensions: Vec2 = vec2();
    mousePosition: Vec2 | null = null;
    scrollPosition: Vec2 = vec2();

    constructor() {

    }

    onDimensionsChange(newDims: Vec2) {
        this.dimensions = newDims;
    };

    onScrollPositionChange(newScrollPos: Vec2) {
        this.scrollPosition = newScrollPos;
    }

    onMouseMove(pos: Vec2 | null) {
        this.mousePosition = pos;
    }

    update(dt: number) {};
    render() {};
};

type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];

export class WebGLEffect<Bindings extends Record<string, number | WebGLUniformLocation>> extends Effect {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    bindings: Bindings = {} as any;
    scale: number = 1;

    constructor(gl: WebGL2RenderingContext) {
        super();
        this.gl = gl;
        this.program = gl.createProgram();
    }

    onDimensionsChange(newDims: Vec2): void {
        this.dimensions = newDims;
    }

    updateViewport() {
        this.gl.viewport(0, 0, this.dimensions.x * this.scale, this.dimensions.y * this.scale);
    }

    binding(ty: "a", name: string): GLint;
    binding(ty: "u", name: string): WebGLUniformLocation;
    binding(ty: "a"|"u", name: string) {
        if(ty == "a") {
            return this.gl!.getAttribLocation(this.program!, `${ty}_${name}`);
        } else {
            return this.gl!.getUniformLocation(this.program!, `${ty}_${name}`)!;
        }
    }

    createBuffer() {
        const buf = this.gl.createBuffer();
        return buf;
    }

    writeBuffer(buf: WebGLBuffer, data: ArrayBuffer) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buf);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        return buf;
    }

    writeAndBindBuffer(
        name: KeysMatching<Bindings, number>,
        buf: WebGLBuffer,
        data: ArrayBuffer,
        size = 1,
    ) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buf);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        let loc = this.bindings[name] as number;
        this.gl.enableVertexAttribArray(loc);
        this.gl.vertexAttribPointer(loc, size, this.gl.FLOAT, false, 0, 0);
    }

    bindBuffer(name: KeysMatching<Bindings, number>, buf: WebGLBuffer, size = 1) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buf);
        this.gl.enableVertexAttribArray(this.bindings[name] as number);
        this.gl.vertexAttribPointer(this.bindings[name] as number, size, this.gl.FLOAT, false, 0, 0);
    }

    uniformVec2(name: keyof Bindings, vec: Vec2) {
        this.gl.uniform2f(this.bindings[name], vec.x, vec.y);
    }
};
