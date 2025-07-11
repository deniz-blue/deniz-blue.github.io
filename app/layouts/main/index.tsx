import { ActionIcon, Affix, Box, Group, Stack, Tooltip, Transition } from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { IconArrowUp, IconLanguage, IconMusic } from "@tabler/icons-react";
import { useContext } from "react";
import { useUIState } from "~/components/base/UIContext";
import { MusicSeekbarOverlay } from "~/components/features/music/components/MusicDebugSeekbar";
import { MusicPickerOverlay } from "~/components/features/music/components/MusicPicker";
import { useAudioState } from "~/components/features/music/hooks/useAudioState";
import { Localized, useLanguage } from "@alan404/react-localization";
import { Pamphlet } from "~/components/page/pamphlet/Pamphlet";
import { MyBurden } from "./MyBurden";

export default function Layout() {
    return (
        <Box>

            <MyBurden />
            {/* <Box className="pamphlet_container">
                <Pamphlet />
            </Box> */}

            {/* <MusicPickerOverlay /> */}
            {/* <MusicSeekbarOverlay /> */}

            <PageControlsOverlay />
        </Box>
    )
};

export const PageControlsOverlay = () => {
    const { toggle, musicPopout } = useUIState();
    const [scroll, scrollTo] = useWindowScroll();

    const mounted = !musicPopout;

    return (
        <Affix position={{ bottom: 5, right: 5 }}>
            <Transition
                mounted={mounted}
                transition={"fade-up"}
                keepMounted
            >
                {(styles) => (
                    <Stack gap={0} style={styles}>
                        <Stack gap={5} align="end">
                            <Transition
                                mounted={scroll.y > 50}
                                transition="fade"
                                keepMounted
                            >
                                {(styles) => (
                                    <Box style={styles}>
                                        <Tooltip
                                            label={(
                                                <Localized
                                                    en="Back to top"
                                                    tr="Üste git"
                                                />
                                            )}
                                            position="left"
                                            withArrow
                                            withinPortal={false}
                                        >
                                            <ActionIcon
                                                onClick={() => scrollTo({ y: 0 })}
                                                variant="light"
                                                size="lg"
                                            >
                                                <IconArrowUp />
                                            </ActionIcon>
                                        </Tooltip>
                                    </Box>
                                )}
                            </Transition>
                            {/* <Group>
                                <LanguagePickerButton />
                            </Group> */}
                            {/* <MusicPopoutButton /> */}
                        </Stack>
                        {/* <Box id="mobile-spacer" data-active={scroll.y < 5} /> */}
                    </Stack>
                )}
            </Transition>
        </Affix>
    );
};

export const LanguagePickerButton = () => {
    const [opened, { toggle, close }] = useDisclosure();
    const { language, setLanguage, supportedLanguages } = useLanguage();

    return (
        <Stack align="end">
            <Tooltip
                label={(
                    <Localized
                        en="Language"
                        tr="Dil"
                    />
                )}
                position="left"
                withArrow
                withinPortal={false}
                keepMounted
                positionDependencies={[opened]}
            >
                <Group gap={4}>
                    <Transition
                        mounted={opened}
                        transition="fade-left"
                        keepMounted
                    >
                        {(styles) => (
                            <Group gap={4} style={styles}>
                                {supportedLanguages.map((lang) => (
                                    <ActionIcon
                                        variant="light"
                                        color={language == lang ? "green" : "gray"}
                                        size="lg"
                                        onClick={() => {
                                            setLanguage(lang);
                                            close();
                                        }}
                                        key={lang}
                                    >
                                        {lang}
                                    </ActionIcon>
                                ))}
                            </Group>
                        )}
                    </Transition>
                    <ActionIcon
                        variant="light"
                        size="lg"
                        onClick={toggle}
                    >
                        <IconLanguage />
                    </ActionIcon>
                </Group>
            </Tooltip>
        </Stack>
    );
};

export const MusicPopoutButton = () => {
    const { toggle } = useUIState();

    const paused = useAudioState(
        true,
        (a) => a.paused,
        ["pause", "playing"]
    );

    return (
        <Tooltip
            label={(
                <Localized
                    en={`Music ${!paused ? "(playing)" : ""}`}
                    tr={`Müzik ${!paused ? "(çalıyor)" : ""}`}
                />
            )}
            position="left"
            withArrow
            withinPortal={false}
        >
            <ActionIcon
                variant="light"
                size="lg"
                onClick={() => toggle("musicPopout")}
            >
                <IconMusic />
            </ActionIcon>
        </Tooltip>
    );
};

