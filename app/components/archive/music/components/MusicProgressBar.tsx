import { Progress } from "@mantine/core";
import { useAudioState } from "../hooks/useAudioState";

export const MusicProgressBar = () => {
    const value = useAudioState(
        0,
        (a) => a.currentTime / (a.duration || 1),
        ["timeupdate"]
    );

    return (
        <Progress
            value={value * 100}
            size="xs"
        />
    );
};
