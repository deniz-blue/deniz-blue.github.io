import { useCallback, useEffect, useRef, useState } from "react";
import { useFeatures } from "../../base/FeaturesContext";
import { useBackgroundContext } from "../../../contexts/background/BackgroundContext";
import { Affix, Button, Transition } from "@mantine/core";
import { useWindowEvent } from "@mantine/hooks";

export function useBurden(
    shouldPlay: boolean,
    myBurdenIsDead: boolean,
) {
    const lightRef = useRef<HTMLAudioElement | null>(null);
    const deadRef = useRef<HTMLAudioElement | null>(null);

    const [interactionRequired, setInteractionRequired] = useState(false);

    /** helper that actually starts / restarts both tracks */
    const attemptStart = useCallback(async () => {
        if (!shouldPlay) {
            lightRef.current?.pause();
            deadRef.current?.pause();
            setInteractionRequired(false);
            return
        }

        if (!lightRef.current || !deadRef.current) return;
        try {
            await Promise.all([lightRef.current.play(), deadRef.current.play()]);
            setInteractionRequired(false);           // success
        } catch {
            setInteractionRequired(true);            // blocked – need a click
        }
    }, [shouldPlay]);

    useWindowEvent("click", () => attemptStart());

    // load & try autoplay once on mount
    useEffect(() => {
        const light = new Audio('/assets/audio/oneshot/MyBurdenIsLight.ogg');
        const dead = new Audio('/assets/audio/oneshot/MyBurdenIsDead.ogg');

        light.loop = dead.loop = true;
        lightRef.current = light;
        deadRef.current = dead;

        attemptStart();

        return () => {
            light.pause();
            dead.pause();
        };
    }, [attemptStart]);

    // volume toggle on prop change
    useEffect(() => {
        if (!lightRef.current || !deadRef.current) return;
        lightRef.current.volume = myBurdenIsDead ? 0 : 1;
        deadRef.current.volume = myBurdenIsDead ? 1 : 0;
    }, [myBurdenIsDead]);

    // expose both the flag and a manual play handler
    return { interactionRequired, play: attemptStart };
}

export const OneshotBGM = () => {
    const [{ type }] = useBackgroundContext();
    const { myBurdenIsDead } = useFeatures();

    let { interactionRequired, play } = useBurden(type === "oneshot", myBurdenIsDead);

    return (
        <>
            <Affix
                position={{ bottom: 5, right: 5 }}
            >
                <Transition
                    mounted={interactionRequired}
                    transition={"fade-up"}
                    keepMounted
                >
                    {(styles) => (
                        <Button
                            style={styles}
                            variant="light"
                            color="gray"
                            onClick={play}
                        >
                            Audio blocked
                        </Button>
                    )}
                </Transition>
            </Affix>
        </>
    )
};
