import { WebGLEffect } from "../lib/types";
import { compileShader, createGLTexture, createProgram } from "../lib/webglHelpers";
import { vec2, Vec2, vec2add, vec2div, vec2mul, vec2normalize, vec2sub } from "@alan404/vec2";
import { choose, lerp, randFloat, randInt } from "../../../../utils/math";
import { clamp } from "@mantine/hooks";

const textureData = [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHUlEQVR4Ae3OAQ0AAAABMP1Lo4UxT3Dg1tGqwhcjpd4D/epMC1wAAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIklEQVR4Ae3MsQ0AAAzCMP5/uuUHGBDCewJMuCM5tkym3gOLZg/xodIpmQAAAABJRU5ErkJggg==",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVR4Ae3PSwoAAAQEUNz/zlgrn5KymLc2MyGCW+q6G9mO8HSZ3bgglmTh9oUqCJ8YQAgMB0rhaRAAAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVR4Ae2RSw4AMAREjfvfuZV01/hNbL0140FkSTlGVYNOMwwqwJschYBW/oLA7O1ZjFfQ7vEiM610sw8sjwsTECAKHmlhcAAAAABJRU5ErkJggg==",
];

// Vertex Shader Code
const vertexShaderSrc = `
    attribute vec2 a_position;
    attribute float a_textureIndex;
    attribute float a_opacity;
    uniform float u_pointSize;
    uniform vec2 u_scroll;
    uniform vec2 u_dim;
    uniform vec2 u_scrollPosition;
    varying float v_opacity;
    varying float v_flash;
    varying float v_textureIndex;
    uniform vec2 u_mousePosition;
    
    void main() {
        gl_PointSize = u_pointSize;

        vec2 position = mod(a_position - u_scrollPosition * u_scroll, u_dim);

        //float mouseDistance = sqrt(pow(position.x - u_mousePosition.x, 2.0) + pow(position.y - u_mousePosition.y, 2.0));
        // float threshold = 50.0;
        // float moveDistance = max(0.0, threshold - mouseDistance);
        // vec2 directionToMouse = normalize(position - u_mousePosition);
        // vec2 moveAway = directionToMouse * moveDistance * 1.0;
        // position += moveAway;

        vec2 clipSpace = ((position / u_dim) * 2.0) - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

        // Pass attributes to the fragment shader
        v_opacity = a_opacity;
        v_textureIndex = a_textureIndex;
        // v_flash = mouseDistance / 50.0;
    }
`;

// Fragment Shader Code
const fragmentShaderSrc = `
    precision mediump float;
    uniform sampler2D u_textures[4];
    uniform vec3 u_color;
    uniform float u_flash;
    varying float v_flash;
    varying float v_opacity;
    varying float v_textureIndex;

    void main() {
        vec4 textureColor;

        int texIndex = int(floor(v_textureIndex + 0.5));

        if (texIndex == 0) {
            textureColor = texture2D(u_textures[0], gl_PointCoord);
        } else if (texIndex == 1) {
            textureColor = texture2D(u_textures[1], gl_PointCoord);
        } else if (texIndex == 2) {
            textureColor = texture2D(u_textures[2], gl_PointCoord);
        }  else if (texIndex == 3) {
            textureColor = texture2D(u_textures[3], gl_PointCoord);
        } else {
            // Fallback
            textureColor = vec4(1.0, 0.0, 0.0, 1.0);
        }

        gl_FragColor = vec4(
            (textureColor.rgb * u_color + (
                textureColor.a * u_flash * v_flash * vec3(1.0,1.0,1.0)
            )),
            textureColor.a * v_opacity + ((textureColor.a * u_flash) / 3.0)
        );
    }
`;

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

export interface Starfield {
    config: StarfieldConfig;
    stars: Star[];
};

export interface StarfieldConfig {
    yNodes: number[];
    flowSpeed: number;
    color: string;
    scroll: Vec2;
};

export interface Star {
    Texture: number;
    Position: Vec2;
    Opacity: number;
    NodeIndex: number;
    NodePercent: number;
    Distance: number;
    Sine: number;
}

type IncompleteStar = Pick<Star, "NodeIndex" | "NodePercent" | "Distance" | "Sine">;

export const starfieldConfigurations: Partial<StarfieldConfig>[] = [
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
    textures: WebGLTexture[];
    buffers: {
        position: WebGLBuffer;
        opacity: WebGLBuffer;
        texture: WebGLBuffer;
    };
    starfields: Starfield[] = [];
    globalPosition: Vec2 = vec2();
    globalFlash: number = 0;
    scale = 1;

    deltaTimeMultiplier = 0.1;
    speedMultiplier = 1;
    speedMultiplierDecay = 1;

    configs: Partial<StarfieldConfig>[] = [];

    constructor(gl: WebGL2RenderingContext, cfgs?: Partial<StarfieldConfig>[]) {
        super(gl);

        this.program = createProgram(gl, [
            compileShader(gl, gl.VERTEX_SHADER, vertexShaderSrc)!,
            compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc)!,
        ])!;

        this.textures = Array(4).fill(0).map((_, i) => (
            createGLTexture(gl, textureData[i])
        ));

        this.bindings = {
            color: this.binding("u", "color"),
            dim: this.binding("u", "dim"),
            flash: this.binding("u", "flash"),
            opacity: this.binding("a", "opacity"),
            position: this.binding("a", "position"),
            textureIndex: this.binding("a", "textureIndex"),
            scroll: this.binding("u", "scroll"),
            scrollPosition: this.binding("u", "scrollPosition"),
            mousePosition: this.binding("u", "mousePosition"),
            pointSize: this.binding("u", "pointSize"),
        };

        this.configs = cfgs || starfieldConfigurations;
        this.createStarfields();

        this.buffers = {
            texture: this.createBuffer(),
            opacity: this.createBuffer(),
            position: this.createBuffer(),
        };
    }

    onDimensionsChange(newDims: Vec2): void {
        this.dimensions = newDims;
        // this.createStarfields();
        for(let starfield of this.starfields) {
            // starfield.config.yNodes = this.createYNodes();
        }
    }

    isSmallDims() {
        return this.dimensions.x < 100 || this.dimensions.y < 100;
    }

    update(dt: number): void {
        return;
        for (let starfield of this.starfields) {
            for (let star of starfield.stars) {
                this.updateStar(starfield.config, star, dt);
            }
        }
    }

    createStarfields() {
        this.starfields = this.configs.map(c => this.createStarfield(c));
    }

    createStarfield(
        partial: Partial<StarfieldConfig>,
    ): Starfield {
        let config: StarfieldConfig = {
            yNodes: [],
            color: "ffffff",
            flowSpeed: 1,
            scroll: vec2(1),
            ...partial,
        };

        config.yNodes = this.createYNodes();
        let stars = this.createStars(config);

        return {
            config,
            stars,
        };
    };

    stepsH() {
        return 100;
    };

    stepsW() {
        return 100;
    };

    stepSize() {
        return this.stepsW();
    }

    createYNodes() {
        let yNodes: number[] = [];
        let num = randFloat(this.dimensions.y);

        let i = 0;
        while (this.stepsH() > i) {
            i++;
            yNodes.push(num);
            num += choose(-1, 1) * (16 * 2 + randFloat((24 * (this.dimensions.y / 360)) * 2));
        }

        for (let i = 0; i < 4; i++) {
            yNodes[yNodes.length - 1 - i] = lerp(
                yNodes[yNodes.length - 1 - i],
                yNodes[0],
                clamp(0, 1.0 - i / 4.0, 1)
            );
        }

        return yNodes;
    };

    createStars(config: StarfieldConfig) {
        let amount = this.isSmallDims() ? 16 : 64;

        let stars = new Array(amount).fill(0).map((): Star => {
            let num3 = randFloat(1.0);

            let incomplete: IncompleteStar = {
                NodeIndex: randInt(config.yNodes.length - 1),
                NodePercent: randFloat(1.0),
                Distance: 4.0 + num3 * 20.0,
                Sine: randFloat(Math.PI * 2.0),
            };

            let index = Math.floor(clamp(0.0, Math.pow(1.0 - num3, 3) * 4, 4 - 1));

            return {
                ...incomplete,
                Position: this.targetOfStar(config, incomplete),
                Opacity: lerp(0.6, 0, num3 * 0.5),
                Texture: index,
            };
        });

        return stars;
    }

    targetOfStar({ yNodes }: StarfieldConfig, star: IncompleteStar) {
        let StepSize = this.stepSize();
        let currentNode = {
            x: star.NodeIndex * StepSize,
            y: yNodes[star.NodeIndex],
        };
        let nextNode = {
            x: (star.NodeIndex + 1) * StepSize,
            y: yNodes[star.NodeIndex + 1],
        };
        let vector3 = vec2add(currentNode, vec2mul(vec2sub(nextNode, currentNode), vec2(star.NodePercent)));
        let vector4 = vec2normalize(vec2sub(nextNode, currentNode));

        return {
            x: (vector3.x) + (((-vector4.x) * (star.Distance)) * (Math.sin(star.Sine))),
            y: (vector3.y) + (((vector4.y) * (star.Distance)) * (Math.sin(star.Sine))),
        };
    }

    updateStar(config: StarfieldConfig, star: Star, dt: number = 1) {
        star.Sine += dt * config.flowSpeed * this.deltaTimeMultiplier * this.speedMultiplier;
        star.NodePercent += dt * 0.25 * config.flowSpeed * this.deltaTimeMultiplier * this.speedMultiplier;
        if (star.NodePercent >= 1) {
            star.NodePercent -= 1;
            star.NodeIndex++;
            if (star.NodeIndex >= config.yNodes.length - 1) {
                star.NodeIndex = 0;
                star.Position.x = 0;
            }
        }
        star.Position = vec2add(star.Position, vec2div(vec2sub(this.targetOfStar(config, star), star.Position), vec2(50, 50)));
    }

    render(): void {
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.blendEquation(this.gl.FUNC_ADD);
        this.gl.enable(this.gl.BLEND);

        this.gl.useProgram(this.program!);

        this.gl.uniform1f(this.bindings.flash, 0);

        this.uniformVec2("dim", this.dimensions);
        this.uniformVec2("scrollPosition", this.scrollPosition);
        this.uniformVec2("mousePosition", this.mousePosition || vec2(-1, -1));
        this.gl.uniform1f(this.bindings.pointSize, this.isSmallDims() ? 16 : 32);

        // Bind textures to texture units
        for (let i = 0; i < this.textures.length; i++) {
            const tex = this.textures[i];
            // @ts-ignore
            this.gl.activeTexture(this.gl["TEXTURE" + i]);
            this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
            this.gl.uniform1i(this.gl.getUniformLocation(this.program, `u_textures[${i}]`), i);
        }

        for (let starfield of this.starfields)
            this.renderDrawStarfield(starfield);
    }

    renderDrawStarfield(starfield: Starfield) {
        this.uniformVec2("scroll", starfield.config.scroll);
        const r = parseInt(starfield.config.color.slice(0, 2), 16) / 255;
        const g = parseInt(starfield.config.color.slice(2, 4), 16) / 255;
        const b = parseInt(starfield.config.color.slice(4, 6), 16) / 255;
        this.gl.uniform3f(this.bindings.color, r, g, b);

        const starPositions: number[] = [];
        const starOpacities: number[] = [];
        const starTextures: number[] = [];

        starfield.stars.forEach(star => {
            starPositions.push(star.Position.x, star.Position.y);
            starOpacities.push(star.Opacity);
            starTextures.push(star.Texture);
        });

        this.writeAndBindBuffer("position", this.buffers.position, new Float32Array(starPositions), 2);
        this.writeAndBindBuffer("opacity", this.buffers.opacity, new Float32Array(starOpacities));
        this.writeAndBindBuffer("textureIndex", this.buffers.texture, new Float32Array(starTextures));

        this.gl.drawArrays(this.gl.POINTS, 0, starfield.stars.length);
    }
}


