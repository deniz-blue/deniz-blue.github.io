import { ActionIcon, Affix, Box, Group, Stack, Tooltip, Transition } from "@mantine/core";
import { useUIState } from "~/components/base/UIContext";
import { Pamphlet } from "~/components/page/pamphlet/Pamphlet";
import { MyBurden } from "./MyBurden";
import { useBackgroundContext } from "../../contexts/background/BackgroundContext";
import { Device } from "../../components/page/device/Device";
import { Terminal } from "../../components/terminal/Terminal";
import { useAppContext } from "../../contexts/app/AppContext";
import { useHotkeys } from "@mantine/hooks";

export default function Layout() {
    const [{ type }, setBackground] = useBackgroundContext();
    const [flags, setFlags] = useAppContext();

    useHotkeys([
        ["Ctrl+C", (e) => {
            if(!flags.showPamphlet) return;
            setBackground({ type: "null" });
            setFlags({
                showPamphlet: false,
                showTerminal: true,
            })
        }],
    ]);

    return (
        <Box>
            {type == "oneshot" && <MyBurden />}
            {flags.showDevice && <Device />}

            <Box display={flags.showTerminal ? "block" : "none"}>
                <Terminal />
            </Box>

            {flags.showPamphlet && (
                <Pamphlet layout />
            )}

            {flags.showPamphlet && (
                <Affix position={{ top: 0, left: 0 }}>
                    <div className="terminal">
                        <pre className="terminal-content">
                            <a
                                style={{
                                    fontWeight: "bold",
                                    color: "#2472c8",
                                }}
                                onClick={() => {
                                    setBackground({ type: "null" });
                                    setFlags({
                                        showPamphlet: false,
                                        showTerminal: true,
                                    })
                                }}
                            >
                                ^C Exit
                            </a>
                        </pre>
                    </div>
                </Affix>
            )}

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
