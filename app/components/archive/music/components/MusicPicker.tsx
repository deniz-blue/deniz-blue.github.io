import { Group, Modal, ScrollArea, Stack, Text } from "@mantine/core";
import { useUIState } from "~/components/base/UIContext";
import { useHotkeys } from "@mantine/hooks";
import { MusicControls } from "./MusicControls";
import { MusicPlaylist } from "./MusicPlaylist";
import { Localized } from "@alan404/react-localization";

export const MusicPickerOverlay = () => {
    const { musicPopout, disable, toggle } = useUIState();

    useHotkeys([["m", () => toggle("musicPopout")]])

    return (
        <Modal.Root
            opened={musicPopout}
            onClose={() => disable("musicPopout")}
            removeScrollProps={{ enabled: false }}
            yOffset={0}
            xOffset={0}
            transitionProps={{ transition: "fade-up" }}
        >
            <Modal.Overlay
                backgroundOpacity={0}
            />
            <Modal.Content
                classNames={{
                    content: "frost bordered",
                }}
                styles={{
                    inner: {
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        padding: "var(--mantine-spacing-md)",
                    },
                    content: {
                        padding: 0,
                    },
                }}
            >
                <Modal.Body p={0}>
                    <MusicPicker />
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    )
};

export const MusicPicker = () => {
    return (
        <Stack gap="xs">
            <Group justify="space-between" pl="xs" pr={20} pt="xs">
                <Text fz="xs" fw="bold" span>
                    <Localized
                        en="MUSIC"
                        tr="MÜZİK"
                    />
                    {" "}
                    <Text span inline inherit c="yellow">WIP</Text>
                </Text>
                <Modal.CloseButton size="sm" variant="light" />
            </Group>
            <Stack gap="xs" pt={4} px={4}>
                <MusicPlaylist />
            </Stack>

            <MusicControls />
        </Stack>
    )
};









