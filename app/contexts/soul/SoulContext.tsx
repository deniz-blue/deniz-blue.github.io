import { createContext, PropsWithChildren, RefCallback, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { vec2, Vec2, vec2distance } from "@alan404/vec2";
import { noop } from "@mantine/core";
import { useHotkeys, useListState, useSet } from "@mantine/hooks";
import { useSoundEffect } from "../audio/useSoundEffect";
import { configureSoulElement, findClosestDivRef, getSelectionSoulConfig, scrollIntoViewIfOutOfBounds } from "./positioning";
import UndertaleMenuCursor from "./audio/UndertaleMenuCursor.wav";
import UndertaleMenuDecision from "./audio/UndertaleMenuDecision.wav";

export type DivRef = RefObject<HTMLDivElement | null>;

export interface ISoulContext {
    ref: DivRef;

    selectables: HTMLDivElement[];
    registerSelectable: RefCallback<HTMLDivElement>;
    setSelected: (ref: HTMLDivElement | null) => void;
};

export const SoulContext = createContext<ISoulContext>({
    ref: { current: null },
    selectables: [],
    setSelected: noop,
    registerSelectable: noop,
});

export const SoulContextProvider = ({
    children,
}: PropsWithChildren) => {
    const ref = useRef<HTMLDivElement>(null);

    const [selectables, setSelectables] = useState<HTMLDivElement[]>([]);

    const { play: play$utcursor } = useSoundEffect(UndertaleMenuCursor);
    const { play: play$utclick } = useSoundEffect(UndertaleMenuDecision);

    const selected = useRef<HTMLDivElement>(null);
    const setSelected = (el: HTMLDivElement | null) => {
        let oldSelected = selected.current;
        let didChange = oldSelected !== el;
        selected.current = el ?? null;

        if(didChange) oldSelected?.removeAttribute("data-soul-selected");
        selected.current?.setAttribute("data-soul-selected", "true");

        if (!ref.current) return;

        if (selected.current) {
            if (didChange) play$utcursor();
            const { ...cfg } = getSelectionSoulConfig(selected.current);
            configureSoulElement(ref.current, {
                opacity: 1,
                ...cfg,
            });
        } else {
            configureSoulElement(ref.current, {
                pos: vec2(),
                opacity: 0,
            });
        }
    };

    const kbdMove = (direction: "up" | "down" | "left" | "right") => {
        const closest = findClosestDivRef(selected.current, selectables, direction);
        if (!closest) return;
        setSelected(closest);
        if (closest) scrollIntoViewIfOutOfBounds(closest);
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
            if (!el) return;
            play$utclick();
            el.click();
        }],
    ]);

    useEffect(() => {
        console.log("selectables updated", selectables);
        if(selected.current && !selectables.includes(selected.current)) {
            console.log("deselecting removed selectable");
            setSelected(null);
        }
    }, [selectables]);

    const registerSelectable: RefCallback<HTMLDivElement> = useCallback((el: HTMLDivElement) => {
        const controller = new AbortController();
        const signal = controller.signal;

        setSelectables(prev => prev.includes(el) ? prev : [...prev, el]);

        el.addEventListener("mouseenter", () => setSelected(el), { signal });

        return () => {
            setSelectables(prev => prev.filter(e => e !== el));
            controller.abort();
        };
    }, []);

    return (
        <SoulContext.Provider
            value={{
                ref,
                selectables,
                registerSelectable,
                setSelected,
            }}
        >
            {children}
        </SoulContext.Provider>
    );
};
