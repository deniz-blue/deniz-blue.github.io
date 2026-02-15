import { useWindowScroll } from "@mantine/hooks";
import { useUIState } from "../../base/UIContext";
import { ActionIcon, Affix, Box, Group, Stack, Tooltip, Transition } from "@mantine/core";
import { Localized } from "@alan404/react-localization";
import { IconArrowUp } from "@tabler/icons-react";
import { LanguagePickerButton } from "./LanguagePickerButton";
import { MusicPopoutButton } from "./MusicPopoutButton";

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
                            <Group>
                                <LanguagePickerButton />
                            </Group>
                            <MusicPopoutButton />
                        </Stack>
                        <Box id="mobile-spacer" data-active={scroll.y < 5} />
                    </Stack>
                )}
            </Transition>
        </Affix>
    );
};
