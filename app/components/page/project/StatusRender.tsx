import { ProjectStatus } from "~/types";
import { Badge, Box, rem, Text, Tooltip } from '@mantine/core';
import { IconArchive } from "@tabler/icons-react";

const Renderers: Record<ProjectStatus, React.ReactNode> = {
    up: <></>,
    ok: <></>,
    wip: (
        <Tooltip label="work in progress">
            <Text c="dimmed" fz="xs" fw="bold">
                WIP
            </Text>
        </Tooltip>
    ),
    archive: (
        <Tooltip label="Archived">
            <Box c="yellow">
                <IconArchive style={{ width: rem(16), height: rem(16) }} />
            </Box>
        </Tooltip>
    ),
};

export const StatusRender = ({ status }: { status: ProjectStatus }) => {
    return Renderers[status];
};
