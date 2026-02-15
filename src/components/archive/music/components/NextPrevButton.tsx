import { ActionIcon } from "@mantine/core";
import { MUSIC_DATA } from "../data";
import { useMusicPlayer } from "../MusicPlayerContext";
import { IconPlayerTrackNext, IconPlayerTrackPrev } from "@tabler/icons-react";

export const NextPrevButton = ({
    delta,
}: {
    delta: number;
}) => {
    const playlist = MUSIC_DATA;
    const { currentSong, changeCurrentSong } = useMusicPlayer();

    const onClick = () => {
        if(!currentSong) return;
        let currentIndex = playlist.indexOf(currentSong);
        let targetIndex = currentIndex + delta;
        if(targetIndex < 0) targetIndex = playlist.length - 1;
        if(targetIndex >= playlist.length) targetIndex = 0;
        let track = playlist[targetIndex];
        changeCurrentSong(track);
    };

    return (
        <ActionIcon
            variant="light"
            color="gray"
            disabled={!currentSong}
            onClick={onClick}
        >
            {delta > 0 ? (
                <IconPlayerTrackNext />
            ) : (
                <IconPlayerTrackPrev />
            )}
        </ActionIcon>
    )
};
