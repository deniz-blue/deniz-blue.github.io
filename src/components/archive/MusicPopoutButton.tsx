import { Localized } from "@alan404/react-localization";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconMusic } from "@tabler/icons-react";
import { useAudioState } from "./music/hooks/useAudioState";
import { useUIState } from "../../base/UIContext";

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
