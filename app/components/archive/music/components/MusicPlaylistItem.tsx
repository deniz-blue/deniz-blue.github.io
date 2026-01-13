import { Badge, Box, Group, Image, Paper, Stack, Text, UnstyledButton } from "@mantine/core";
import { Song, useMusicPlayer } from "../MusicPlayerContext";

export const MusicPlaylistItem = ({
    song,
    onClick,
    isActive,
}: {
    song: Song;
    isActive?: boolean;
    onClick?: () => void;
}) => {
    return (
        <UnstyledButton
            onClick={onClick}
            style={{ zIndex: 5 }}
        >
            <Paper
                p={4}
                withBorder
                className="grow shrinkonclick"
            >
                <Group gap={4} wrap="nowrap">
                    <Box
                        w="4px"
                        h="2rem"
                        bg="violet"
                        style={{
                            borderRadius: "2px",
                            opacity: +(isActive ?? false),
                            transitionDuration: "250ms",
                        }}
                    />
                    <Box
                        w="2rem"
                        h="2rem"
                    >
                        <Image
                            src={`/assets/music/${song.cover}`}
                            w="100%"
                            h="100%"
                            loading="lazy"
                            style={{ imageRendering: "auto" }}
                        />
                    </Box>
                    <Stack gap={0}>
                        <Group gap={4}>
                            <Text inline>{song.romanji || song.title}</Text>
                            {/* <Badge size="xs" color="gray" variant="light">WIP</Badge> */}
                        </Group>
                        <Text c="dimmed" fz="sm" inline>{song.artist}</Text>
                    </Stack>
                </Group>
            </Paper>
        </UnstyledButton>
    );
};
