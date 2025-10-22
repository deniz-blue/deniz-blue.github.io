import { useRef } from "react";
import { vec2 } from "@alan404/vec2";
import { useHotkeys, useWindowEvent } from "@mantine/hooks";
import { useSoundEffect } from "../audio/useSoundEffect";
import { configureSoulElement, findClosestDivRef, getSelectionSoulConfig, scrollIntoViewIfOutOfBounds } from "./positioning";
import UndertaleMenuCursor from "./audio/UndertaleMenuCursor.wav";
import UndertaleMenuDecision from "./audio/UndertaleMenuDecision.wav";
import { useSoulRef } from "./SoulElement";

export const SoulController = () => {
    const { ref } = useSoulRef();

    const { play: play$utcursor } = useSoundEffect(UndertaleMenuCursor);
    const { play: play$utclick } = useSoundEffect(UndertaleMenuDecision);

    const previousSelected = useRef<HTMLElement>(null);
    const refresh = () => {
        if(!document.activeElement?.classList.contains("soulSelectable")) return;

        let oldSelected = previousSelected.current;
        let didChange = oldSelected !== document.activeElement;
        previousSelected.current = (document.activeElement as HTMLElement | null) ?? null;

        if(didChange) oldSelected?.removeAttribute("data-soul-selected");
        previousSelected.current?.setAttribute("data-soul-selected", "true");

        if (!ref.current) return;

        if (previousSelected.current) {
            if (didChange) play$utcursor();
            previousSelected.current.focus();
            const { ...cfg } = getSelectionSoulConfig(previousSelected.current);
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
        const _selectables = [...document.querySelectorAll(".soulSelectable")] as HTMLElement[];
        const closest = findClosestDivRef(previousSelected.current, _selectables, direction);
        if (!closest) return;
        // setSelected(closest);
        scrollIntoViewIfOutOfBounds(closest);
        closest.focus();
        refresh();
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
            let el = previousSelected.current?.firstChild as HTMLElement | null;
            if (!el) return;
            play$utclick();
            el.click();
        }],
    ]);

    useWindowEvent("keydown", () => {
        setTimeout(refresh, 0);
    });

    useWindowEvent("keyup", () => {
        setTimeout(refresh, 0);
    });

    return null;
};
