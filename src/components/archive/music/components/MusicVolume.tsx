import { ActionIcon, Group, Slider } from "@mantine/core";
import { useAudioState } from "../hooks/useAudioState";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { useMusicPlayer } from "../MusicPlayerContext";

export const MusicVolume = () => {
    const { ref } = useMusicPlayer();

    const volume = useAudioState(
        1,
        (a) => a.volume,
        ["volumechange"]
    );

    return (
        <Group gap={4}>
            <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => {
                    if(!ref.current) return;
                    ref.current.volume = ref.current.volume ? 0 : 0.5;
                }}
            >
                {volume == 0 ? <IconVolumeOff /> : <IconVolume />}
            </ActionIcon>
            <Slider
                min={0}
                max={1}
                step={0.01}
                value={volume}
                label={null}
                onChange={(v) => {
                    if(!ref.current) return;
                    ref.current.volume = v;
                }}
                w="5rem"
            />
        </Group>
    );
};
