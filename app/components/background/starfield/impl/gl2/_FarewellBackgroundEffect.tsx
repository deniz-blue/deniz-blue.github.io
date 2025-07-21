import { WebGLEffect } from "../types";
import { compileShader, createGLTexture, createProgram } from "../../../../features/bg/farewell/webglHelpers";
import { vec2, Vec2 } from "@alan404/vec2";
import { createYNodes, StaticStarfield } from "../starfield";
import vertexShaderSrc from "./vertex-shader.glsl?raw";
import fragmentShaderSrc from "./fragment-shader.glsl?raw";
import { starfield_rendergl2, starfield_rendergl2_init, StarfieldGL2Container } from "./render-gl2";

const textureData = [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHUlEQVR4Ae3OAQ0AAAABMP1Lo4UxT3Dg1tGqwhcjpd4D/epMC1wAAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIklEQVR4Ae3MsQ0AAAzCMP5/uuUHGBDCewJMuCM5tkym3gOLZg/xodIpmQAAAABJRU5ErkJggg==",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVR4Ae3PSwoAAAQEUNz/zlgrn5KymLc2MyGCW+q6G9mO8HSZ3bgglmTh9oUqCJ8YQAgMB0rhaRAAAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVR4Ae2RSw4AMAREjfvfuZV01/hNbL0140FkSTlGVYNOMwwqwJschYBW/oLA7O1ZjFfQ7vEiM610sw8sjwsTECAKHmlhcAAAAABJRU5ErkJggg==",
];

export type StarfieldProgramBindings = {
    position: number;
    opacity: number;
    textureIndex: number;

    flash: WebGLUniformLocation;
    color: WebGLUniformLocation;
    scrollPosition: WebGLUniformLocation;
    scroll: WebGLUniformLocation;
    dim: WebGLUniformLocation;
    mousePosition: WebGLUniformLocation;
    pointSize: WebGLUniformLocation;
}

export const starfieldConfigurations = [
    { color: "ab6ffa", scroll: vec2(0.3, 0.3) },
    { color: "71d5ff", scroll: vec2(0.3, 0.3), flowSpeed: 2.5 },
    { color: "53f3dd", scroll: vec2(0.5, 0.5) },
    { color: "cefdff", scroll: vec2(0.5, 0.5), flowSpeed: 3 },
    
    // { color: "ffffff", scroll: vec2(0.1, 0.1), flowSpeed: 1 },
    // { color: "f8ffb0", scroll: vec2(0.3, 0.3), flowSpeed: 3 },
    // { color: "46fffd", scroll: vec2(0.5, 0.5), flowSpeed: 2.75 },
];

export class FarewellBackgroundEffect extends WebGLEffect<StarfieldProgramBindings> {
    id = "farewell";
    // textures: WebGLTexture[];
    // buffers: {
    //     position: WebGLBuffer;
    //     opacity: WebGLBuffer;
    //     texture: WebGLBuffer;
    // };
    globalPosition: Vec2 = vec2();
    globalFlash: number = 0;
    scale = 1;

    deltaTimeMultiplier = 0.1;
    speedMultiplier = 1;
    speedMultiplierDecay = 1;


    init: StarfieldGL2Container;

    _static: StaticStarfield[] = [];

    constructor(gl: WebGL2RenderingContext) {
        super(gl);

        this.init = starfield_rendergl2_init(gl);

        // this.program = createProgram(gl, [
        //     compileShader(gl, gl.VERTEX_SHADER, vertexShaderSrc)!,
        //     compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc)!,
        // ])!;

        // this.textures = Array(4).fill(0).map((_, i) => (
        //     createGLTexture(gl, textureData[i])
        // ));

        // this.bindings = {
        //     color: this.binding("u", "color"),
        //     dim: this.binding("u", "dim"),
        //     flash: this.binding("u", "flash"),
        //     opacity: this.binding("a", "opacity"),
        //     position: this.binding("a", "position"),
        //     textureIndex: this.binding("a", "textureIndex"),
        //     scroll: this.binding("u", "scroll"),
        //     scrollPosition: this.binding("u", "scrollPosition"),
        //     mousePosition: this.binding("u", "mousePosition"),
        //     pointSize: this.binding("u", "pointSize"),
        // };

        this.createStarfields();

        // this.buffers = {
        //     texture: this.createBuffer(),
        //     opacity: this.createBuffer(),
        //     position: this.createBuffer(),
        // };
    }

    onDimensionsChange(newDims: Vec2): void {
        super.onDimensionsChange(newDims);

        for(let _static of this._static) {
            _static.yNodes = createYNodes(newDims);
            _static.stepSize = newDims.x / 10;
        }
    }

    isSmallDims() {
        return this.dimensions.x < 100 || this.dimensions.y < 100;
    }

    update(dt: number): void {
        for(let _static of this._static) _static.update(dt);
    }

    createStarfields() {
        this._static = starfieldConfigurations.map(c => {
            let f = new StaticStarfield();
            if(c.color) f.color = c.color
            return f;
        });
    }

    render(): void {
        starfield_rendergl2(this.gl, this.init, {
            dimensions: this.dimensions,
            scrollPosition: this.scrollPosition,
            starfields: this._static,
        });

        // this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        // this.gl.blendEquation(this.gl.FUNC_ADD);
        // this.gl.enable(this.gl.BLEND);

        // this.gl.useProgram(this.program!);

        // this.gl.uniform1f(this.bindings.flash, 0);

        // this.uniformVec2("dim", this.dimensions);
        // this.uniformVec2("scrollPosition", this.scrollPosition);
        // this.uniformVec2("mousePosition", this.mousePosition || vec2(-1, -1));
        // this.gl.uniform1f(this.bindings.pointSize, this.isSmallDims() ? 16 : 32);

        // // Bind textures to texture units
        // for (let i = 0; i < this.textures.length; i++) {
        //     const tex = this.textures[i];
        //     // @ts-ignore
        //     this.gl.activeTexture(this.gl["TEXTURE" + i]);
        //     this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        //     this.gl.uniform1i(this.gl.getUniformLocation(this.program, `u_textures[${i}]`), i);
        // }

        // // for (let starfield of this.starfields)
        // //     this.renderDrawStarfield(starfield);
        // for (let _static of this._static)
        //     this.renderDrawStarfieldStatic(_static);
    }

    renderDrawStarfieldStatic(starfield: StaticStarfield) {
        // const r = parseInt(starfield.color.slice(0, 2), 16) / 255;
        // const g = parseInt(starfield.color.slice(2, 4), 16) / 255;
        // const b = parseInt(starfield.color.slice(4, 6), 16) / 255;
        // this.gl.uniform3f(this.bindings.color, r, g, b);

        // const starPositions: number[] = [];
        // const starOpacities: number[] = [];
        // const starTextures: number[] = [];

        // starfield.stars.forEach(star => {
        //     starPositions.push(star.position.x, star.position.y);
        //     starOpacities.push(star.opacity);
        //     starTextures.push(star.texture);
        // });

        // this.writeAndBindBuffer("position", this.buffers.position, new Float32Array(starPositions), 2);
        // this.writeAndBindBuffer("opacity", this.buffers.opacity, new Float32Array(starOpacities));
        // this.writeAndBindBuffer("textureIndex", this.buffers.texture, new Float32Array(starTextures));

        // this.gl.drawArrays(this.gl.POINTS, 0, starfield.stars.length);
    }
}


