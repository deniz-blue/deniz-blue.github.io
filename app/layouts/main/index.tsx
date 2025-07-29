import { ActionIcon, Affix, Box, Group, Stack, Tooltip, Transition } from "@mantine/core";
import { useUIState } from "~/components/base/UIContext";
import { Pamphlet } from "~/components/page/pamphlet/Pamphlet";
import { MyBurden } from "./MyBurden";
import { useBackgroundContext } from "../../contexts/background/BackgroundContext";
import { Device } from "../../components/page/device/Device";
import { Terminal } from "../../components/terminal/Terminal";
import { useAppContext } from "../../contexts/app/AppContext";

export default function Layout() {
    const [{ type }] = useBackgroundContext();
    const [flags] = useAppContext();

    return (
        <Box>
            {type == "oneshot" && <MyBurden />}
            {flags.showDevice && <Device />}
            {flags.showTerminal && <Terminal />}
            
            {/* <Box className="pamphlet_container">
                <Pamphlet />
            </Box> */}

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
