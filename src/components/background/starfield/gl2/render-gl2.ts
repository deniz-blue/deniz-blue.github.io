import vertexShaderSrc from "./vertex-shader.glsl?raw";
import fragmentShaderSrc from "./fragment-shader.glsl?raw";
import { compileShader, createGLTexture, createProgram, glWriteBind } from "../utils";
import { Vec2 } from "@alan404/vec2";
import { StaticStarfield, StarfieldMist } from "../starfield";

const STARFIELD_WORLD_SCALE = 2;
const STAR_POINT_SIZE = 16;
const MIST_TEXTURE_DIM = { x: 600, y: 600 };

const mistVertexShaderSrc = `
attribute vec2 a_position;
uniform vec2 u_viewDim;
varying vec2 v_screenPos;

void main() {
    v_screenPos = a_position * u_viewDim;
    vec2 clipSpace = (a_position * 2.0) - 1.0;
    gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
}
`;

const mistFragmentShaderSrc = `
precision mediump float;
uniform sampler2D u_mistTexture;
uniform vec4 u_color;
uniform vec2 u_scroll;
uniform vec2 u_speed;
uniform vec2 u_scrollPosition;
uniform vec2 u_textureDim;
uniform float u_worldScale;
uniform float u_time;
varying vec2 v_screenPos;

void main() {
    const float SPEED_SCALE = 16.0;
    vec2 uvPixel = v_screenPos
        + (u_scrollPosition * u_scroll * u_worldScale)
        - (u_speed * u_time * u_worldScale * SPEED_SCALE);
    vec2 uv = uvPixel / (u_textureDim * u_worldScale);
    vec4 mist = texture2D(u_mistTexture, uv);

    gl_FragColor = vec4(mist.rgb * u_color.rgb, mist.a * u_color.a);
}
`;

const textureData = [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHUlEQVR4Ae3OAQ0AAAABMP1Lo4UxT3Dg1tGqwhcjpd4D/epMC1wAAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIklEQVR4Ae3MsQ0AAAzCMP5/uuUHGBDCewJMuCM5tkym3gOLZg/xodIpmQAAAABJRU5ErkJggg==",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVR4Ae3PSwoAAAQEUNz/zlgrn5KymLc2MyGCW+q6G9mO8HSZ3bgglmTh9oUqCJ8YQAgMB0rhaRAAAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVR4Ae2RSw4AMAREjfvfuZV01/hNbL0140FkSTlGVYNOMwwqwJschYBW/oLA7O1ZjFfQ7vEiM610sw8sjwsTECAKHmlhcAAAAABJRU5ErkJggg==",
];

export type StarfieldGL2Container = ReturnType<typeof starfield_rendergl2_init>;

export const starfield_rendergl2_init = (gl: WebGL2RenderingContext) => {
    const program = createProgram(gl, [
        compileShader(gl, gl.VERTEX_SHADER, vertexShaderSrc)!,
        compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc)!,
    ])!;

    const textures = textureData.map(uri => createGLTexture(gl, uri));
    const mistTexture = createGLTexture(gl, "/assets/img/detail/mist.png");

    gl.bindTexture(gl.TEXTURE_2D, mistTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    const mistProgram = createProgram(gl, [
        compileShader(gl, gl.VERTEX_SHADER, mistVertexShaderSrc)!,
        compileShader(gl, gl.FRAGMENT_SHADER, mistFragmentShaderSrc)!,
    ])!;

    const bindings = {
        color: gl.getUniformLocation(program, "u_color"),
        viewDim: gl.getUniformLocation(program, "u_viewDim"),
        simulationDim: gl.getUniformLocation(program, "u_simulationDim"),
        tileOffset: gl.getUniformLocation(program, "u_tileOffset"),
        worldScale: gl.getUniformLocation(program, "u_worldScale"),
        flash: gl.getUniformLocation(program, "u_flash"),
        scroll: gl.getUniformLocation(program, "u_scroll"),
        scrollPosition: gl.getUniformLocation(program, "u_scrollPosition"),
        mousePosition: gl.getUniformLocation(program, "u_mousePosition"),
        pointSize: gl.getUniformLocation(program, "u_pointSize"),

        opacity: gl.getAttribLocation(program, "a_opacity"),
        position: gl.getAttribLocation(program, "a_position"),
        textureIndex: gl.getAttribLocation(program, "a_textureIndex"),
    };

    const buffers = {
        texture: gl.createBuffer(),
        opacity: gl.createBuffer(),
        position: gl.createBuffer(),
    };

    const mistBindings = {
        position: gl.getAttribLocation(mistProgram, "a_position"),
        viewDim: gl.getUniformLocation(mistProgram, "u_viewDim"),
        color: gl.getUniformLocation(mistProgram, "u_color"),
        scroll: gl.getUniformLocation(mistProgram, "u_scroll"),
        speed: gl.getUniformLocation(mistProgram, "u_speed"),
        scrollPosition: gl.getUniformLocation(mistProgram, "u_scrollPosition"),
        textureDim: gl.getUniformLocation(mistProgram, "u_textureDim"),
        worldScale: gl.getUniformLocation(mistProgram, "u_worldScale"),
        time: gl.getUniformLocation(mistProgram, "u_time"),
    };

    const mistBuffers = {
        quad: gl.createBuffer(),
    };

    return {
        program,
        mistProgram,
        textures,
        mistTexture,
        bindings,
        mistBindings,
        buffers,
        mistBuffers,
    };
};

const parseHexColor = (hexColor: string) => {
    const hex = hexColor.replace("#", "");
    const hasAlpha = hex.length >= 8;

    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    const a = hasAlpha ? parseInt(hex.slice(6, 8), 16) / 255 : 1;

    return { r, g, b, a };
};

export const starfield_rendergl2 = (gl: WebGL2RenderingContext, {
    bindings,
    buffers,
    program,
    mistProgram,
    mistBindings,
    mistBuffers,
    mistTexture,
    textures,
}: StarfieldGL2Container, {
    dimensions,
    simulationDim,
    scrollPosition,
    mists,
    elapsedTime,
    starfields,
}: {
    dimensions: Vec2;
    simulationDim: Vec2;
    scrollPosition: Vec2;
    mists: StarfieldMist[];
    elapsedTime: number;
    starfields: StaticStarfield[];
}) => {
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendEquation(gl.FUNC_ADD);
    gl.enable(gl.BLEND);

    gl.useProgram(mistProgram!);
    gl.uniform2f(mistBindings.viewDim, dimensions.x, dimensions.y);
    gl.uniform2f(mistBindings.scrollPosition, scrollPosition.x, scrollPosition.y);
    gl.uniform2f(mistBindings.textureDim, MIST_TEXTURE_DIM.x, MIST_TEXTURE_DIM.y);
    gl.uniform1f(mistBindings.worldScale, STARFIELD_WORLD_SCALE);
    gl.uniform1f(mistBindings.time, elapsedTime);

    gl.bindBuffer(gl.ARRAY_BUFFER, mistBuffers.quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0, 0,
        1, 0,
        0, 1,
        1, 1,
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(mistBindings.position);
    gl.vertexAttribPointer(mistBindings.position, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, mistTexture);
    gl.uniform1i(gl.getUniformLocation(mistProgram, "u_mistTexture"), 4);

    for (let mist of mists) {
        const { r, g, b, a } = parseHexColor(mist.color);
        gl.uniform4f(mistBindings.color, r, g, b, a);
        gl.uniform2f(mistBindings.scroll, mist.scroll.x, mist.scroll.y);
        gl.uniform2f(mistBindings.speed, mist.speed.x, mist.speed.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    gl.useProgram(program!);

    gl.uniform1f(bindings.flash, 0);

    gl.uniform2f(bindings.viewDim, dimensions.x, dimensions.y);
    gl.uniform2f(bindings.simulationDim, simulationDim.x, simulationDim.y);
    gl.uniform1f(bindings.worldScale, STARFIELD_WORLD_SCALE);
    gl.uniform2f(bindings.scrollPosition, scrollPosition.x, scrollPosition.y);
    gl.uniform1f(bindings.pointSize, STAR_POINT_SIZE * STARFIELD_WORLD_SCALE);

    const scaledSimulationWidth = simulationDim.x * STARFIELD_WORLD_SCALE;
    const scaledSimulationHeight = simulationDim.y * STARFIELD_WORLD_SCALE;
    const tilesX = Math.max(1, Math.ceil(dimensions.x / scaledSimulationWidth));
    const tilesY = Math.max(1, Math.ceil(dimensions.y / scaledSimulationHeight));
    const padX = scaledSimulationWidth;
    const padY = scaledSimulationHeight;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    gl.uniform1i(gl.getUniformLocation(program, "u_textures[0]"), 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textures[1]);
    gl.uniform1i(gl.getUniformLocation(program, "u_textures[1]"), 1);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, textures[2]);
    gl.uniform1i(gl.getUniformLocation(program, "u_textures[2]"), 2);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, textures[3]);
    gl.uniform1i(gl.getUniformLocation(program, "u_textures[3]"), 3);

    for(let starfield of starfields) {
        const { r, g, b } = parseHexColor(starfield.color);
        gl.uniform3f(bindings.color, r, g, b);
        gl.uniform2f(bindings.scroll, starfield.scroll.x, starfield.scroll.y);

        const starPositions: number[] = [];
        const starOpacities: number[] = [];
        const starTextures: number[] = [];

        starfield.stars.forEach(star => {
            starPositions.push(star.position.x, star.position.y);
            starOpacities.push(star.opacity);
            starTextures.push(star.texture);
        });

        glWriteBind(gl, bindings.position, buffers.position, new Float32Array(starPositions), 2);
        glWriteBind(gl, bindings.opacity, buffers.opacity, new Float32Array(starOpacities));
        glWriteBind(gl, bindings.textureIndex, buffers.texture, new Float32Array(starTextures));

        for (let ty = -1; ty <= tilesY; ty++) {
            for (let tx = -1; tx <= tilesX; tx++) {
                gl.uniform2f(bindings.tileOffset, tx * scaledSimulationWidth - padX, ty * scaledSimulationHeight - padY);
                gl.drawArrays(gl.POINTS, 0, starfield.stars.length);
            }
        }
    }
};
