import { ActionIcon, Image } from "@mantine/core";
import { useBackgroundStore } from "../../background/PageBackground";
import shatterSfx from "../../background/oneshot/shatter.wav";
import { useRef } from "react";
import { useAppFlagsStore } from "../../../stores/useAppFlagsStore";
import { useSoundEffect } from "../../../stores/audio-context";

export const OneShotSun = () => {
    const isShattered = useAppFlagsStore(store => store.sunShattered);
    const { play: play$shatter } = useSoundEffect(shatterSfx);
    const shatter = () => {
        play$shatter();
        useBackgroundStore.getState().setBackground({ type: "oneshot", data: {} });
        useAppFlagsStore.setState({ sunShattered: true });
    };

    const threshold = 5;
    const interval = 2000;
    const clickCount = useRef(0);
    const timer = useRef<any>(null);
    const reset = () => {
        clickCount.current = 0;
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    };
    const onSunClick = () => {
        if (isShattered) return;
        clickCount.current++;
        if (clickCount.current >= threshold) {
            reset();
            shatter();
            return;
        };
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(reset, interval);
    };

    return (
        <ActionIcon
            variant="subtle"
            color="transparent"
            size="auto"
            onClick={onSunClick}
            className="soulSelectable"
            data-soul-anchor="right-bottom"
            data-soul-ml={6}
            data-soul-mt={6}
            data-soul-z={1}
        >
            <Image
                display={isShattered ? "none" : undefined}
                src={"/assets/img/detail/oneshot/item_start_lightbulb.png"}
                title={"[Be careful.]"}
                width={64}
                height={64}
                style={{ imageRendering: "pixelated" }}
            />
            <Image
                display={!isShattered ? "none" : undefined}
                src={"/assets/img/detail/oneshot/SunBroken.png"}
                title={"[You broke it.]"}
                width={64}
                height={64}
                style={{ imageRendering: "pixelated" }}
            />
        </ActionIcon>
    )
}
