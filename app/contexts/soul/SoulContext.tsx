import { createContext, PropsWithChildren, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { vec2, Vec2, vec2distance } from "@alan404/vec2";
import { noop } from "@mantine/core";
import { useHotkeys, useSet } from "@mantine/hooks";
import { useSoundEffect } from "../audio/useSoundEffect";
import { findClosestDivRef, scrollIntoViewIfOutOfBounds, selectWithSoulElement } from "./positioning";
import UndertaleMenuCursor from "./UndertaleMenuCursor.wav";
import UndertaleMenuDecision from "./UndertaleMenuDecision.wav";

export type DivRef = RefObject<HTMLDivElement | null>;

export interface ISoulContext {
    ref: DivRef;

    selectables: Set<DivRef>;
    // selected: DivRef | null;
    setSelected: (ref: DivRef | null) => void;
};

export const SoulContext = createContext<ISoulContext>({
    ref: { current: null },
    selectables: new Set(),
    // selected: null,
    setSelected: noop,
});

export const SoulContextProvider = ({
    children,
}: PropsWithChildren) => {
    const ref = useRef<HTMLDivElement>(null);

    const selectables = useSet<DivRef>();

    const { play: playSfxCursor } = useSoundEffect(UndertaleMenuCursor);
    const { play: playSfxClick } = useSoundEffect(UndertaleMenuDecision);

    const selected = useRef<HTMLDivElement>(null);
    const setSelected = (selectedRef: DivRef | null) => {
        selected.current = selectedRef?.current ?? null;

        if (ref?.current && selected.current) {
            playSfxCursor();
            selectWithSoulElement(ref.current, selected.current);
        }
    };

    const kbdMove = (direction: "up" | "down" | "left" | "right") => {
        const closest = findClosestDivRef(selected, selectables, direction);
        if (!closest) return;
        setSelected(closest);
        if (closest.current) scrollIntoViewIfOutOfBounds(closest.current);
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

        ["Enter", () => {
            let el = selected.current?.firstChild as HTMLElement | null;
            if(!el) return;
            playSfxClick();
            el.click();
        }],
    ]);

    return (
        <SoulContext.Provider
            value={{
                ref,
                selectables,
                setSelected,
            }}
        >
            {children}
        </SoulContext.Provider>
    );
};
