import { vec2, Vec2, vec2distance, vec2sub } from "@alan404/vec2";
import { DivRef } from "./SoulContext";
import { RefObject } from "react";

type Anchor = "center" | "start" | "end";
type AnchorX = "center" | "left" | "right";
type AnchorY = "center" | "top" | "bottom";
export type SoulAnchor = "center" | `${AnchorX}-${AnchorY}`;

export const positionSoulElement = (
    soul: HTMLDivElement,
    pos: Vec2,
    zIndex?: number,
) => {
    soul.style.transform = `translate(${pos.x - 11}px, ${pos.y - 11 + window.scrollY}px)`;
    soul.style.zIndex = zIndex ? zIndex.toString() : "";
};

export const scrollIntoViewIfOutOfBounds = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();

    const margin = 32;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let dx = 0;
    let dy = 0;

    if (rect.left < margin) dx = rect.left - margin;
    else if (rect.right > vw - margin) dx = rect.right - (vw - margin);

    if (rect.top < margin) dy = rect.top - margin;
    else if (rect.bottom > vh - margin) dy = rect.bottom - (vh - margin);

    if (dx !== 0 || dy !== 0) {
        window.scrollBy({
            left: dx,
            top: dy,
            behavior: "smooth",
        });
    }
}

export const selectWithSoulElement = (soul: HTMLDivElement, selected: HTMLDivElement) => {
    let pos = selected.getAttribute("data-pos") || "center";
    let rect = selected.getBoundingClientRect();

    const getAttrN = (s: string, defaultV: number) => {
        let v = selected.getAttribute(s);
        return (v !== null && !isNaN(Number(v))) ? Number(v) : defaultV;
    };

    let zIndex = getAttrN("data-zindex", 0);



    // <DEBUG>
    // positionSoulElement(soul, vec2(
    //     rect.x + rect.width/2,
    //     rect.y + rect.height/2,
    // ), zIndex);
    // return;
    // </DEBUG>


    
    const defaultMargin = 4;
    let mt = getAttrN("data-mt", defaultMargin);
    let mb = getAttrN("data-mb", defaultMargin);
    let ml = getAttrN("data-ml", defaultMargin);
    let mr = getAttrN("data-mr", defaultMargin);

    let xa: Anchor = "center";
    let ya: Anchor = "center";

    if(pos == "center") {} else if (pos?.includes("-")) {
        let [first, second] = pos.split("-");
        xa = first.replace("left", "start").replace("right", "end") as any;
        ya = second.replace("top", "start").replace("bottom", "end") as any;
    }

    let x: number;
    if(xa == "center") {
        x = rect.x + (rect.width / 2) + mr - ml;
    } else if(xa == "start") {
        x = rect.x - ml;
    } else if (xa == "end") {
        x = rect.x + rect.width + mr;
    } else throw new Error("Invalid state");

    let y: number;
    if(ya == "center") {
        y = rect.y + (rect.height / 2) + mt - mb;
    } else if(ya == "start") {
        y = rect.y - mt;
    } else if (ya == "end") {
        y = rect.y + rect.height + mb;
    } else throw new Error("Invalid state");

    positionSoulElement(soul, {
        x,
        y,
    }, zIndex);
};

export function findClosestDivRef(
    selectedNode: RefObject<HTMLDivElement | null>,
    others: Set<RefObject<HTMLDivElement | null>>,
    dir: "up" | "down" | "left" | "right"
): RefObject<HTMLDivElement> | null {
    const originRect = selectedNode.current?.getBoundingClientRect();
    const originCenter = originRect ? vec2(
        originRect.left + originRect.width / 2,
        originRect.top + originRect.height / 2
    ) : vec2();


    let candidates = [...others].map(ref => {
        if(!ref.current) return null;
        const rect = ref.current.getBoundingClientRect();
        const targetCenter = vec2(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
        );

        const delta = vec2sub(targetCenter, originCenter);
        const dist = Math.hypot(delta.x, delta.y);
        const angle = Math.atan2(delta.y, delta.x);

        const direction = (["right", "down", "left", "up"] as const)[
            Math.round(((angle + Math.PI * 2) % (Math.PI * 2)) / (Math.PI / 2)) % 4
        ];

        return {
            ref,
            delta,
            dist,
            angle,
        };
    }).filter(x => x !== null);


    let minDist = Infinity;
    let best: RefObject<HTMLDivElement> | null = null;

    for (const ref of others) {
        if (!ref.current || ref.current === selectedNode.current) continue;

        const rect = ref.current.getBoundingClientRect();
        const targetCenter = vec2(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
        );

        const delta = vec2(targetCenter.x - originCenter.x, targetCenter.y - originCenter.y);

        let isValid = false;

        if (dir === "up" && delta.y < -5 && Math.abs(delta.x) < rect.width * 1.5) isValid = true;
        if (dir === "down" && delta.y > 5 && Math.abs(delta.x) < rect.width * 1.5) isValid = true;
        if (dir === "left" && delta.x < -5 && Math.abs(delta.y) < rect.height * 1.5) isValid = true;
        if (dir === "right" && delta.x > 5 && Math.abs(delta.y) < rect.height * 1.5) isValid = true;

        if (!isValid) continue;

        const dist = vec2distance(originCenter, targetCenter);
        if (dist < minDist) {
            minDist = dist;
            best = ref as any;
        }
    }

    return best;
}







// export const findClosestDivRef = (
//     selected: DivRef | null,
//     selectables: Set<DivRef>,
//     direction: "up" | "down" | "left" | "right",
// ): DivRef | null => {
//     const selectedRect = selected?.current?.getBoundingClientRect();
//     const pos = selectedRect ? vec2(
//         selectedRect.left + selectedRect.width / 2,
//         selectedRect.top + selectedRect.height / 2,
//     ) : vec2();

//     const DIRECTION_VECTORS: Record<string, [number, number]> = {
//         up: [0, -1],
//         down: [0, 1],
//         left: [-1, 0],
//         right: [1, 0],
//     };

//     const DOT_THRESHOLD = 0.5; // cos(45°) ~ 0.707

//     const candidates = [...selectables].map((ref) => {
//         if (!ref.current) return null;
//         const rect = ref.current.getBoundingClientRect();
//         const center = vec2(
//             rect.left + rect.width / 2,
//             rect.top + rect.height / 2,
//         );

//         const dx = center.x - pos.x;
//         const dy = center.y - pos.y;

//         const len = Math.hypot(dx, dy);
//         if (len === 0) return null;

//         const [vx, vy] = DIRECTION_VECTORS[direction];
//         const dot = (dx / len) * vx + (dy / len) * vy;

//         if (dot < DOT_THRESHOLD) return null;

//         const distance = dx * dx + dy * dy;
//         return { ref, dot, distance };
//     }).filter(x => x !== null);

//     const closest = candidates.sort((a, b) => {
//         if (b.dot !== a.dot) return b.dot - a.dot;
//         return a.distance - b.distance;
//     })[0];
    
//     return closest?.ref ?? null;
// };

