import { ActionIcon, ActionIconProps } from "@mantine/core";
import { useMusicPlayer } from "../MusicPlayerContext";
import { useAudioState } from "../hooks/useAudioState";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";

export const PlayPauseButton = ({
    variant = "light",
}: {
    variant?: ActionIconProps["variant"];
}) => {
    const { ref, currentSong } = useMusicPlayer();

    const paused = useAudioState(
        true,
        (a) => a.paused,
        ["pause", "playing"]
    );

    const loading = useAudioState(
        true,
        (a) => a.readyState < HTMLMediaElement.HAVE_CURRENT_DATA,
        ["playing", "loadstart", "waiting"]
    );

    return (
        <ActionIcon
            variant={variant}
            color="gray"
            loading={currentSong ? loading : false}
            disabled={!currentSong}
            onClick={() => {
                if (paused) ref.current?.play();
                else ref.current?.pause();
            }}
        >
            {paused ? <IconPlayerPlay /> : <IconPlayerPause />}
        </ActionIcon>
    )
};
