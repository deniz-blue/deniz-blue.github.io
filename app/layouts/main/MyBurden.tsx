import { ActionIcon, Affix, Box, Button, Image, Paper, Stack, Text, Transition } from "@mantine/core";
import { useFeatures } from "../../components/base/FeaturesContext";
import { useDocumentTitle, useHotkeys, useWindowEvent } from "@mantine/hooks";
import { useCallback, useEffect, useRef, useState } from "react";

export function useBurden(myBurdenIsDead: boolean) {
    const lightRef = useRef<HTMLAudioElement | null>(null);
    const deadRef = useRef<HTMLAudioElement | null>(null);

    const [interactionRequired, setInteractionRequired] = useState(false);

    /** helper that actually starts / restarts both tracks */
    const attemptStart = useCallback(async () => {
        if (!lightRef.current || !deadRef.current) return;
        try {
            await Promise.all([lightRef.current.play(), deadRef.current.play()]);
            setInteractionRequired(false);           // success
        } catch {
            setInteractionRequired(true);            // blocked – need a click
        }
    }, []);

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

export const MyBurden = () => {
    const { disable, myBurdenIsDead, enable, toggle } = useFeatures();

    let { interactionRequired, play } = useBurden(myBurdenIsDead);

    useWindowEvent("click", () => play());

    useDocumentTitle(myBurdenIsDead ? "[You killed Niko]" : "deniz.blue 💡");

    useHotkeys([["r", () => disable("myBurdenIsDead")]])

    return (
        <Box>
            <Stack w="100%" align="center" justify="center" h="100dvh" gap={4}>
                <Paper
                    className="frost"
                    p={4}
                >
                    <Text fz="xs" c={myBurdenIsDead ? "dimmed" : "white"}>
                        My Burden is {myBurdenIsDead ? "Dead" : "Light"}
                    </Text>
                </Paper>

                <Transition
                    mounted={myBurdenIsDead}
                    keepMounted
                >
                    {(styles) => (
                        <Image
                            style={{
                                userSelect: "none",
                                ...styles,
                            }}
                            draggable={false}
                            src="/assets/img/detail/oneshot/SunBroken.png"
                            title="[You broke it.]"
                            w={32}
                            h={32}
                        />
                    )}
                </Transition>

                {!myBurdenIsDead && (
                    <ActionIcon
                        variant="subtle"
                        color="black"
                        onClick={() => toggle("myBurdenIsDead")}
                        size={32}
                    >
                        <Image
                            src="/assets/img/detail/oneshot/item_start_lightbulb.png"
                            title="[Be careful.]"
                            w={32}
                            h={32}
                        />
                    </ActionIcon>
                )}
            </Stack>

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
        </Box >
    );
};
