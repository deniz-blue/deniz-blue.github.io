import { ActionIcon, Affix, Box, Group, Stack, Tooltip, Transition } from "@mantine/core";
import { useUIState } from "~/components/base/UIContext";
import { Outlet } from "react-router";

export default function Layout() {
    return (
        <Box>
            <Outlet />

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
