import { Affix, Box } from "@mantine/core";
import { useAppFlagsStore } from "../contexts/app/AppContext";
import { useHotkeys } from "@mantine/hooks";
import { Device } from "../components/page/device/Device";
import { Terminal } from "../components/terminal/Terminal";
import { Pamphlet } from "../components/page/pamphlet/Pamphlet";
import { WingDing } from "../components/page/wingding/WingDing";
import { PamphletV2 } from "../components/page/pamphletv2/PamphletV2";
import { fetchProjectsJSON, ProjectsJSON } from "../utils/fetch-projects";
import { Route } from "./+types/Index";
import { useEffect } from "react";
import { useProjectJSON } from "../stores/useProjectJSON";
import { useBackgroundStore } from "../components/background/PageBackground";

export async function loader() {
    try {
        return await fetchProjectsJSON();
    } catch (e) {
        console.error(e);
        if (import.meta.env.PROD) throw e;
        return {
            state: {
                developing: [],
                featured: [],
            },
            list: [],
        } as ProjectsJSON;
    }
}

export default function Index({
    loaderData,
}: Route.ComponentProps) {
    useEffect(() => {
        useProjectJSON.setState({ data: loaderData });
    }, [loaderData]);

    const setBackground = useBackgroundStore(store => store.setBackground);

    const flags = useAppFlagsStore();

    const exitable = (
        flags.showPamphlet
        || flags.showPamphletV2
        || flags.showDevice
    );

    const exit = () => {
        if (!exitable) return;
        setBackground({ type: "null", data: {} });
        useAppFlagsStore.setState({
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
