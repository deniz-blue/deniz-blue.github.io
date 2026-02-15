import vertexShaderSrc from "./vertex-shader.glsl?raw";
import fragmentShaderSrc from "./fragment-shader.glsl?raw";
import { compileShader, createGLTexture, createProgram, glWriteBind } from "../utils";
import { Vec2 } from "@alan404/vec2";
import { StaticStarfield } from "../starfield";

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

    const bindings = {
        color: gl.getUniformLocation(program, "u_color"),
        dim: gl.getUniformLocation(program, "u_dim"),
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

    return {
        program,
        textures,
        bindings,
        buffers,
    };
};

export const starfield_rendergl2 = (gl: WebGL2RenderingContext, {
    bindings,
    buffers,
    program,
    textures,
}: StarfieldGL2Container, {
    dimensions,
    scrollPosition,
    starfields,
}: {
    dimensions: Vec2;
    scrollPosition: Vec2;
    starfields: StaticStarfield[];
}) => {
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendEquation(gl.FUNC_ADD);
    gl.enable(gl.BLEND);

    gl.useProgram(program!);

    gl.uniform1f(bindings.flash, 0);

    gl.uniform2f(bindings.dim, dimensions.x, dimensions.y);
    gl.uniform2f(bindings.scrollPosition, scrollPosition.x, scrollPosition.y);
    gl.uniform1f(bindings.pointSize, 32);

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
        const r = parseInt(starfield.color.slice(0, 2), 16) / 255;
        const g = parseInt(starfield.color.slice(2, 4), 16) / 255;
        const b = parseInt(starfield.color.slice(4, 6), 16) / 255;
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

        gl.drawArrays(gl.POINTS, 0, starfield.stars.length);
    }
};
