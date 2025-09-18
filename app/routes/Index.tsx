import { Affix, Box } from "@mantine/core";
import { useBackgroundContext } from "../contexts/background/BackgroundContext";
import { useAppContext } from "../contexts/app/AppContext";
import { useHotkeys } from "@mantine/hooks";
import { MyBurden } from "../layouts/main/MyBurden";
import { Device } from "../components/page/device/Device";
import { Terminal } from "../components/terminal/Terminal";
import { Pamphlet } from "../components/page/pamphlet/Pamphlet";
import { WingDing } from "../components/page/wingding/WingDing";
import { PamphletV2 } from "../components/page/pamphletv2/PamphletV2";

export default function Index() {
    const [{ type }, setBackground] = useBackgroundContext();
    const [flags, setFlags] = useAppContext();

    const exitable = (
        flags.showPamphlet
        || flags.showPamphletV2
        || flags.showDevice
    );

    const exit = () => {
        if (!exitable) return;
        setBackground({ type: "null" });
        setFlags({
            showTerminal: true,

            showPamphlet: false,
            showPamphletV2: false,
            showDevice: false,
            showWD: false,
        })
    };

    useHotkeys([
        ["Ctrl+C", exit],
    ]);

    return (
        <Box>
            {flags.showDevice && <Device />}
            {flags.showWD && <WingDing />}

            <Box display={flags.showTerminal ? "block" : "none"}>
                <Terminal />
            </Box>

            {flags.showPamphlet && (
                <Pamphlet layout />
            )}

            {flags.showPamphletV2 && (
                <PamphletV2 />
            )}

            {exitable && (
                <Affix position={{ top: 0, left: 0 }}>
                    <div className="terminal">
                        <pre className="terminal-content">
                            <a
                                style={{
                                    fontWeight: "bold",
                                    color: "#2472c8",
                                }}
                                onClick={exit}
                            >
                                ^C Exit
                            </a>
                        </pre>
                    </div>
                </Affix>
            )}
        </Box>
    );
}
