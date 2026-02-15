import { Affix, Collapse, Group, Slider, Stack, Text, Title, Transition } from "@mantine/core";
import { useBeatdrop } from "../../../hooks/useBeatdrop";
import { Section } from "../../ui/Section";
import { IconVolume } from "@tabler/icons-react";
import { useEffect } from "react";
import { useBackgroundStore } from "../../background/PageBackground";

const explode = {
    in: { opacity: 1, transform: 'scale(1)' },
    out: { opacity: 0, transform: 'scale(5)' },
    common: { transformOrigin: 'center' },
    transitionProperty: 'transform, opacity',
};

export const CountdownThing = () => {
    const {
        countdownReached,
        err,
        isPlaying,
        setVolume,
        timerText,
        volume,
    } = useBeatdrop({
        beatDropOn: new Date("2026-01-01T00:00"),
        // beatDropOn: new Date(Date.now() + 1000 * 60 * 3), // 5 minutes from now
        audioSrc: "/assets/audio/events/Opus.mp4",
        beatDropPosition: 3 * 60 + 42,
    });

    useEffect(() => {
        useBackgroundStore.getState().setBackground({ type: "oneshot", data: { withNiko: false } });
    }, []);

    const name = "2026";

    return (
        <Stack p="xl" ta="center" align="center" justify="center" h="100vh">
            {countdownReached && (
                <Title>Happy {name}!</Title>
            )}
            {!countdownReached && (
                <Title order={2}>Time until {name}:</Title>
            )}
            <Transition
                mounted={!countdownReached}
                transition={explode}
                timingFunction="ease"
                duration={700}
            >
                {(styles) => (
                    <Group style={styles} justify="center" ta="center">
                        <Section>
                            <Text fz={timerText.length > 5 ? 36 : 48} w="12rem" ta="center">
                                {timerText}
                            </Text>
                        </Section>
                    </Group>
                )}
            </Transition>
            <Collapse expanded={!!err}>
                <Text c="yellow" fw="bold">can't play audio - click anywhere please!</Text>
            </Collapse>
            <Affix position={{ bottom: 20, right: 20 }}>
                <Collapse expanded={!!isPlaying}>
                    <Stack>
                        <Text c="dimmed" fs="italic" fz="xs">
                            Now playing: Opus - Eric Prydz
                        </Text>
                        <Group c="dimmed">
                            <IconVolume size={16} />
                            <Slider
                                min={0}
                                max={1}
                                step={0.01}
                                value={volume}
                                onChange={setVolume}
                                w="10em"
                            />
                        </Group>
                    </Stack>
                </Collapse>
            </Affix>

            {!countdownReached && !isPlaying && !err && (
                <Text fs="italic" c="dimmed" fz="sm">
                    Come back when it's 4 minutes to midnight...
                </Text>
            )}
        </Stack>
    )
};
