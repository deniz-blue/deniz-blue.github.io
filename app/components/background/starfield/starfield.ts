import { vec2, Vec2, vec2add, vec2div, vec2mul, vec2normalize, vec2sub } from "@alan404/vec2";
import { choose, lerp, randFloat, randInt, clamp } from "../../../utils/math";

export type StarTexture = 0 | 1 | 2 | 3;

export class Star {
    texture: StarTexture = 0;
    position: Vec2 = vec2();
    opacity: number = 1;
    NodeIndex: number = 0;
    NodePercent: number = 0;
    Distance: number = 0;
    Sine: number = 0;

    constructor() {
        let num3 = randFloat(1.0);
        this.NodeIndex = randInt(yNodeLen - 1);
        this.NodePercent = randFloat(1.0);
        this.Distance = 4.0 + num3 * 20.0;
        this.Sine = randFloat(Math.PI * 2.0);
        this.texture = Math.floor(clamp(0.0, Math.pow(1.0 - num3, 3) * 4, 4 - 1)) as StarTexture;
        this.opacity = lerp(0.6, 0, num3 * 0.5);
    }
}

export class StarfieldMist {
    color: string = "#000000";
    speed: Vec2 = vec2();
    scroll: Vec2 = vec2();

    constructor(color: string, speed: Vec2, scroll: Vec2) {
        this.color = color;
        this.speed = speed;
        this.scroll = scroll;
    }

    static createDefaultLayers() {
        return [
            new StarfieldMist("#7e2168", vec2(2, 0), vec2(0.15, 0.15)),
            new StarfieldMist("#2f7f98ff", vec2(4, 0), vec2(0.2, 0.2)),
            new StarfieldMist("#000000ff", vec2(16, 8), vec2(0.6, 0.6)),
        ];
    }
}

const yNodeLen = 15;
export const createYNodes = (dims: Vec2) => {
    let yNodes: number[] = [];
    let num = randFloat(dims.y);

    let i = 0;
    while (yNodeLen > i) {
        i++;
        yNodes.push(num);
        num += choose(-1, 1) * (16 * 2 + randFloat((24 * (dims.y / 360)) * 2));
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

export const DEFAULT_DIM = vec2(320, 180);

export class StaticStarfield {
    stars: Star[] = [];
    yNodes: number[] = createYNodes(DEFAULT_DIM);
    color: string = "#ffffff";

    flowSpeed = 1;
    scroll: Vec2 = vec2();

    // therefore, stepAmount = 10 (px)
    stepSize: number = 32;

    constructor(color?: string, scroll?: Vec2, flowSpeed?: number) {
        if (color) this.color = color;
        if (scroll) this.scroll = scroll;
        if (flowSpeed) this.flowSpeed = flowSpeed;
        this.stars = Array(128).fill(0).map(() => new Star());
        this.stars.forEach(s => s.position = this.targetOfStar(s));
    }

    resize(dims = DEFAULT_DIM) {
        this.yNodes = createYNodes(dims);
        this.stepSize = dims.x / 10;
        this.stars.forEach(s => s.position = this.targetOfStar(s));
        return this;
    }

    update(dt = 1) {
        for (let star of this.stars) {
            let target = this.targetOfStar(star);
            star.Sine += dt * this.flowSpeed;
            star.NodePercent += dt * 0.25 * this.flowSpeed;
            if (star.NodePercent >= 1) {
                star.NodePercent -= 1;
                star.NodeIndex++;
                if (star.NodeIndex >= yNodeLen - 1) {
                    star.NodeIndex = 0;
                    star.position.x = 0;
                }
            }
            star.position = vec2add(star.position, vec2div(vec2sub(target, star.position), vec2(50, 50)));
        }
    }

    targetOfStar(star: Star) {
        let currentNode = {
            x: star.NodeIndex * this.stepSize,
            y: this.yNodes[star.NodeIndex],
        };
        let nextNode = {
            x: (star.NodeIndex + 1) * this.stepSize,
            y: this.yNodes[star.NodeIndex + 1],
        };
        let vector3 = vec2add(currentNode, vec2mul(vec2sub(nextNode, currentNode), vec2(star.NodePercent)));
        let vector4 = vec2normalize(vec2sub(nextNode, currentNode));

        return {
            x: (vector3.x) + (((-vector4.x) * (star.Distance)) * (Math.sin(star.Sine))),
            y: (vector3.y) + (((vector4.y) * (star.Distance)) * (Math.sin(star.Sine))),
        };
    }

    static ScreenPosOfStar(
        star: Star,
        dim: Vec2 = vec2(448, 212),
    ) {
        const vec2mod = (a: Vec2, b: Vec2) => vec2(a.x % b.x, a.y % b.y);
        const mod = (x: Vec2, m: Vec2) => vec2mod((
            vec2add(vec2mod(x, m), m)
        ), m);

        return vec2sub(vec2add(
            vec2(-64, -16),
            mod(star.position, dim)
        ), 16);
    }

    static createDefaultLayers() {
        return [
            new StaticStarfield("ab6ffa", vec2(0.3, 0.3), 0.8),
            new StaticStarfield("71d5ff", vec2(0.3, 0.3), 1.1),
            new StaticStarfield("53f3dd", vec2(0.5, 0.5), 0.8),
            new StaticStarfield("cefdff", vec2(0.5, 0.5), 1.2),
        ];
    }
};

