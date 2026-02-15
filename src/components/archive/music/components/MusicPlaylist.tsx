import { Button, Collapse, ScrollArea, Stack, StackProps } from "@mantine/core"
import { MUSIC_DATA } from "../data"
import { MusicPlaylistItem } from "./MusicPlaylistItem"
import { Song, useMusicPlayer } from "../MusicPlayerContext"
import { useDisclosure } from "@mantine/hooks"
import { useMemo } from "react"
import { Localized } from "@alan404/react-localization"

export const MusicPlaylist = () => {
    const { currentSong, changeCurrentSong } = useMusicPlayer();
    const [expanded, { open, close, toggle }] = useDisclosure(!currentSong);

    const songsList = MUSIC_DATA;

    const [beforeCurrent, afterCurrent] = useMemo(() => {
        let beforeCurrent = [];
        let afterCurrent = [];
    
        let seen = false;
        for (let song of songsList) {
            if (currentSong === song) {
                seen = true;
                continue;
            }
    
            if (seen)
                afterCurrent.push(song)
            else
                beforeCurrent.push(song)
        }

        return [beforeCurrent, afterCurrent];
    }, [currentSong]);

    const onClickHandleInactive = (song: Song) => () => {
        changeCurrentSong(song);
        close();
    };

    const onClickCurrentSong = () => {
        toggle();
    };

    const gap = 4;

    return (
        <Stack gap={gap}>
            <ScrollArea.Autosize
                mah="70dvh"
                offsetScrollbars="y"
            >
                <Stack gap={gap} mx="xs">
                    <Collapse in={expanded}>
                        <Stack gap={gap}>
                            {beforeCurrent.map((song, i) => (
                                <MusicPlaylistItem
                                    song={song}
                                    onClick={onClickHandleInactive(song)}
                                    key={i}
                                />
                            ))}
                        </Stack>
                    </Collapse>
                    {currentSong && (
                        <MusicPlaylistItem
                            song={currentSong}
                            onClick={onClickCurrentSong}
                            isActive
                        />
                    )}
                    <Collapse in={expanded}>
                        <Stack gap={gap}>
                            {afterCurrent.map((song, i) => (
                                <MusicPlaylistItem
                                    song={song}
                                    onClick={onClickHandleInactive(song)}
                                    key={i}
                                />
                            ))}
                        </Stack>
                    </Collapse>
                </Stack>
            </ScrollArea.Autosize>
            <Collapse in={expanded} px="xs">
                <Button
                    color="gray"
                    onClick={close}
                    size="compact-xs"
                    fullWidth
                >
                    <Localized
                        en="Close"
                        tr="Küçült"
                    />
                </Button>
            </Collapse>
        </Stack>
    )
}
