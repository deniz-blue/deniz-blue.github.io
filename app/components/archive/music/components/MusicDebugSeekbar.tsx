import { Group, Modal, ScrollArea, Slider, Stack, Text } from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { useAudioState } from "../hooks/useAudioState";
import { useMusicPlayer } from "../MusicPlayerContext";
import { PlayPauseButton } from "./PlayPauseButton";

export const MusicSeekbarOverlay = () => {
    const [opened, { toggle, close }] = useDisclosure();

    useHotkeys([["n", () => toggle()]])

    return (
        <Modal.Root
            opened={opened}
            onClose={() => close()}
            removeScrollProps={{ enabled: false }}
            yOffset={0}
            xOffset={0}
            transitionProps={{ transition: "fade-up" }}
        >
            <Modal.Content
                classNames={{
                    content: "frost bordered",
                }}
                styles={{
                    inner: {
                        alignItems: "flex-end",
                        justifyContent: "center",
                        padding: "var(--mantine-spacing-md)",
                    },
                    content: {
                        padding: 0,
                    },
                }}
            >
                <Modal.Body p={0}>
                    <MusicSeekbar />
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    )
};

export const MusicSeekbar = () => {
    const { ref } = useMusicPlayer();

    const currentTime = useAudioState(
        0,
        (a) => a.currentTime,
        ["timeupdate"]
    );

    const duration = useAudioState(
        0,
        (a) => a.duration,
        ["durationchange"]
    );

    return (
        <Stack gap="xs" p="xs">
            <Group gap={4}>
                <PlayPauseButton />
                <Text w="2.5rem">
                    {Math.floor(currentTime / 60).toString().padStart(2, "0")}
                    :
                    {Math.floor(currentTime % 60).toString().padStart(2, "0")}
                </Text>
                <Slider
                    flex="1"
                    value={currentTime}
                    min={0}
                    max={duration}
                    label={null}
                    onChange={(v) => {
                        if (!ref.current) return;
                        ref.current.currentTime = v;
                    }}
                />
            </Group>
        </Stack>
    )
};









