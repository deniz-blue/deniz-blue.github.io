import { Group, Paper, Stack } from "@mantine/core";
import { PlayPauseButton } from "./PlayPauseButton";
import { MusicProgressBar } from "./MusicProgressBar";
import { MusicVolume } from "./MusicVolume";
import { NextPrevButton } from "./NextPrevButton";

export const MusicControls = () => {
    return (
        <Paper className="frost">
            <Stack gap={0}>
                <Group p={4} justify="space-between" w="100%">
                    <Group gap={4}>
                        <NextPrevButton delta={-1} />
                        <PlayPauseButton />
                        <NextPrevButton delta={1} />
                    </Group>
                    <Group pr="xs">
                        <MusicVolume />
                    </Group>
                </Group>
                <MusicProgressBar />
            </Stack>
        </Paper>
    )
};
