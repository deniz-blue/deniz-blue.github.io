import { createContext, PropsWithChildren, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { vec2, Vec2, vec2distance } from "@alan404/vec2";
import { noop } from "@mantine/core";
import { useHotkeys, useSet } from "@mantine/hooks";
import UndertaleMenuCursor from "./UndertaleMenuCursor.wav";
import { useSoundEffect } from "../audio/useSoundEffect";

export type DivRef = RefObject<HTMLDivElement | null>;

export interface ISoulContext {
    ref: DivRef;
    moveTo: (pos: Vec2) => void;

    selectables: Set<DivRef>;
    selected: DivRef | null;
    setSelected: (ref: DivRef | null) => void;
};

export type SoulPosition = "center" | "left-center" | "right-center";

export const SoulContext = createContext<ISoulContext>({
    ref: { current: null },
    moveTo: noop,
    selectables: new Set(),
    selected: null,
    setSelected: noop,
});

export const findClosestDivRef = (
    selected: DivRef | null,
    selectables: Set<DivRef>,
    direction: "up" | "down" | "left" | "right",
): DivRef | null => {
    const selectedRect = selected?.current?.getBoundingClientRect();
    const pos = selectedRect ? vec2(
        selectedRect.left + selectedRect.width / 2,
        selectedRect.top + selectedRect.height / 2,
    ) : vec2();

    const DIRECTION_VECTORS: Record<string, [number, number]> = {
        up: [0, -1],
        down: [0, 1],
        left: [-1, 0],
        right: [1, 0],
    };

    const DOT_THRESHOLD = 0.5; // cos(45°) ~ 0.707

    const candidates = [...selectables].map((ref) => {
        if (!ref.current) return null;
        const rect = ref.current.getBoundingClientRect();
        const center = vec2(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
        );

        const dx = center.x - pos.x;
        const dy = center.y - pos.y;

        const len = Math.hypot(dx, dy);
        if (len === 0) return null;

        const [vx, vy] = DIRECTION_VECTORS[direction];
        const dot = (dx / len) * vx + (dy / len) * vy;

        if (dot < DOT_THRESHOLD) return null;

        const distance = dx * dx + dy * dy;
        return { ref, dot, distance };
    }).filter(x => x !== null);

    const closest = candidates.sort((a, b) => {
        if (b.dot !== a.dot) return b.dot - a.dot;
        return a.distance - b.distance;
    })[0];
    
    return closest?.ref ?? null;
};

export const SoulContextProvider = ({
    children,
}: PropsWithChildren) => {
    const ref = useRef<HTMLDivElement>(null);

    const moveTo = useCallback((pos: Vec2) => {
        if (ref.current) {
            ref.current.style.transform = `translate(${pos.x - 11}px, ${pos.y - 11}px)`;
        }
    }, []);

    const selectables = useSet<DivRef>();
    const [selected, setSelected] = useState<DivRef | null>(null);

    const { play } = useSoundEffect(UndertaleMenuCursor);

    useEffect(() => {
        if (selected?.current) {
            play();
            let pos = selected.current.getAttribute("data-pos");
            let rect = selected.current.getBoundingClientRect();
            moveTo({
                x: pos == "center" ? (rect.x + rect.width / 2) : rect.x - (11 + 4),
                y: rect.y + (rect.height / 2) + window.scrollY,
            });
        }
    }, [selected]);

    const kbdMove = (direction: "up" | "down" | "left" | "right") => {
        const closest = findClosestDivRef(selected, selectables, direction);
        if (!closest) return;
        setSelected(closest);
    };

    useHotkeys([
        ["ArrowUp", () => kbdMove("up")],
        ["w", () => kbdMove("up")],
        ["ArrowDown", () => kbdMove("down")],
        ["s", () => kbdMove("down")],
        ["ArrowLeft", () => kbdMove("left")],
        ["a", () => kbdMove("left")],
        ["ArrowRight", () => kbdMove("right")],
        ["d", () => kbdMove("right")],
    ]);

    return (
        <SoulContext.Provider
            value={{
                ref,
                moveTo,
                selectables,
                selected,
                setSelected,
            }}
        >
            {children}
        </SoulContext.Provider>
    );
};
