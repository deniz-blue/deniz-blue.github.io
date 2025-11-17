import { useCallback, useEffect, useRef, useState } from "react";
import { useFeatures } from "../../base/FeaturesContext";
import { ActionIcon, Affix, Button, Group, Transition } from "@mantine/core";
import { useDisclosure, useWindowEvent } from "@mantine/hooks";
import MyBurdenIsLight from "./MyBurdenIsLight.ogg"
import MyBurdenIsDead from "./MyBurdenIsDead.ogg"
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";

const VOLUME = 0.5;

export function useBurden(
    shouldPlay: boolean,
    myBurdenIsDead: boolean,
) {
    const lightRef = useRef<HTMLAudioElement | null>(null);
    const deadRef = useRef<HTMLAudioElement | null>(null);

    const [interactionRequired, setInteractionRequired] = useState(false);

    const update = () => {
        if (!shouldPlay) {
            lightRef.current?.pause();
            deadRef.current?.pause();
            setInteractionRequired(false);
            return;
        }

        if (lightRef.current) lightRef.current.volume = myBurdenIsDead ? 0 : VOLUME;
        if (deadRef.current) deadRef.current.volume = myBurdenIsDead ? VOLUME : 0;
    };

    const attemptStart = async () => {
        if (!lightRef.current || !deadRef.current) return;
        try {
            await Promise.all([lightRef.current.play(), deadRef.current.play()]);
            setInteractionRequired(false);
            update();
        } catch {
            setInteractionRequired(true);
        }
    };

    useWindowEvent("click", () => attemptStart(), { once: true });

    // load & try autoplay once on mount
    useEffect(() => {
        const light = new Audio(MyBurdenIsLight);
        const dead = new Audio(MyBurdenIsDead);

        light.loop = dead.loop = true;
        lightRef.current = light;
        deadRef.current = dead;

        attemptStart();

        return () => {
            light.pause();
            dead.pause();
        };
    }, []);

    useEffect(() => {
        update();
    }, [shouldPlay, myBurdenIsDead]);

    // expose both the flag and a manual play handler
    return { interactionRequired, play: attemptStart };
}

export const OneshotBGM = () => {
    const { myBurdenIsDead } = useFeatures();
    const [usr, { toggle }] = useDisclosure(true);

    let { interactionRequired, play } = useBurden(/* type === "oneshot" &&  */usr, myBurdenIsDead);

    return (
        <>
            <Affix
                position={{ bottom: 5, right: 5 }}
            >
                <Group>
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
                    <ActionIcon
                        variant="light"
                        color="gray"
                        onClick={toggle}
                    >
                        {!usr ? <IconVolumeOff /> : <IconVolume />}
                    </ActionIcon>
                </Group>
            </Affix>
        </>
    )
};
