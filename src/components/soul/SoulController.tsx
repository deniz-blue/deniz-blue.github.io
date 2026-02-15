import { useRef } from "react";
import { vec2 } from "@alan404/vec2";
import { useHotkeys, useWindowEvent } from "@mantine/hooks";
import { configureSoulElement, findClosestDivRef, getSelectionSoulConfig, scrollIntoViewIfOutOfBounds } from "./positioning";
import MenuCursor from "./audio/OneShotMenuCursor.wav";
import MenuDecision from "./audio/OneShotMenuDecision.wav";
import MenuCancel from "./audio/OneShotMenuCancel.wav";
import { useSoulRef } from "./SoulElement";
import { useSoundEffect } from "../../stores/audio-context";

export const SoulController = () => {
	return null;

    const { ref } = useSoulRef();

    const { play: play$cursor } = useSoundEffect(MenuCursor);
    const { play: play$click } = useSoundEffect(MenuDecision);
    const { play: play$cancel } = useSoundEffect(MenuCancel);

    const previousSelected = useRef<HTMLElement>(null);
    const refresh = () => {
        if(document.activeElement && !document.activeElement?.classList.contains("soulSelectable")) return;

        let oldSelected = previousSelected.current;
        let didChange = oldSelected !== document.activeElement;
        previousSelected.current = (document.activeElement as HTMLElement | null) ?? null;

        if(didChange) oldSelected?.removeAttribute("data-soul-selected");
        previousSelected.current?.setAttribute("data-soul-selected", "true");

        if (!ref.current) return;

        if (previousSelected.current) {
            if (didChange) play$cursor();
            previousSelected.current.focus();
            const { ...cfg } = getSelectionSoulConfig(previousSelected.current);
            configureSoulElement(ref.current, {
                opacity: 1,
                ...cfg,
            });
        } else {
			console.log("No selection");
			if (didChange) play$cancel();
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
            let el = previousSelected.current as HTMLElement | null;
            if (!el) return;
            console.log(el)
            if(el.dataset["active"])
                play$cancel();
            else
                play$click();

            el.click();
        }],
    ]);

    useWindowEvent("keydown", () => {
        setTimeout(refresh, 0);
    });

    useWindowEvent("keyup", () => {
        setTimeout(refresh, 0);
    });

	useWindowEvent("blur", () => {
		setTimeout(refresh, 0);
	});

    return null;
};
