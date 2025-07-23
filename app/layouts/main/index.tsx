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
import { useBackgroundContext } from "../../contexts/background/BackgroundContext";
import { Device } from "../../components/page/device/Device";

export default function Layout() {
    const [{ type }] = useBackgroundContext();

    return (
        <Box>
            {type == "oneshot" && <MyBurden />}
            {type == "depth" && <Device />}
            
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
                            {/* <BackToTopButton /> */}
                            {/* <LanguagePickerButton /> */}
                            {/* <MusicPopoutButton /> */}
                        </Stack>
                        {/* <Box id="mobile-spacer" data-active={scroll.y < 5} /> */}
                    </Stack>
                )}
            </Transition>
        </Affix>
    );
};
