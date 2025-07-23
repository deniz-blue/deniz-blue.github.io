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

    const candidates = [...selectables].map((ref) => {
        if (!ref.current) return null;
        const rect = ref.current.getBoundingClientRect();
        const center = vec2(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
        );

        const dx = center.x - pos.x;
        const dy = center.y - pos.y;

        const angle = Math.atan2(dy, dx);

        const isInDirection = {
            up: dy < 0 && Math.abs(dx) <= Math.abs(dy),
            down: dy > 0 && Math.abs(dx) <= Math.abs(dy),
            left: dx < 0 && Math.abs(dy) <= Math.abs(dx),
            right: dx > 0 && Math.abs(dy) <= Math.abs(dx),
        }[direction];

        if (!isInDirection) return null;
        const distance = dx * dx + dy * dy;
        return { distance, ref };
    }).filter(x => x !== null);

    const closest = candidates.sort((a, b) => a.distance - b.distance)[0];
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
            let rect = selected.current.getBoundingClientRect();
            moveTo({
                x: rect.x - (11 + 4),
                y: rect.y + (rect.height / 2),
            });
        }
    }, [selected]);

    const kbdMove = (direction: "up" | "down" | "left" | "right") => {
        const closest = findClosestDivRef(selected, selectables, direction);
        if(!closest) return;
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
