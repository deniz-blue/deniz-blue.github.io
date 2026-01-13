export interface OnekoSkin {
    id: string;
    name: string;
    spriteSet: string;
    meows: string[];
};

const createMeowList = (prefix: string, amt: number, suffix: string) =>
    Array(amt).fill(0).map((_, i) => `${prefix}${i}${suffix}`)

const SophiaMeows = createMeowList("/assets/oneko/sophia_meows/", 3, ".mp3");
const MaiaMeows = createMeowList("/assets/oneko/maia_meows/", 13, ".wav");

export const OnekoSkins: OnekoSkin[] = [
    {
        id: "default",
        name: "Classic",
        spriteSet: "url(/assets/oneko/default_oneko.gif)",
        meows: MaiaMeows,
    },
    {
        id: "crimew",
        name: "maia arson crimew",
        spriteSet: "url(/assets/oneko/maia_oneko.gif)",
        meows: MaiaMeows,
    },
];

export const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
    ],
    scratchWallN: [
        [0, 0],
        [0, -1],
    ],
    scratchWallS: [
        [-7, -1],
        [-6, -2],
    ],
    scratchWallE: [
        [-2, -2],
        [-2, -3],
    ],
    scratchWallW: [
        [-4, 0],
        [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
        [-2, 0],
        [-2, -1],
    ],
    N: [
        [-1, -2],
        [-1, -3],
    ],
    NE: [
        [0, -2],
        [0, -3],
    ],
    E: [
        [-3, 0],
        [-3, -1],
    ],
    SE: [
        [-5, -1],
        [-5, -2],
    ],
    S: [
        [-6, -3],
        [-7, -2],
    ],
    SW: [
        [-5, -3],
        [-6, -1],
    ],
    W: [
        [-4, -2],
        [-4, -3],
    ],
    NW: [
        [-1, 0],
        [-1, -1],
    ],
};

export type SpriteName = keyof typeof spriteSets;
export const getSprite = (name: SpriteName, frame: number) => spriteSets[name][frame % spriteSets[name].length];





