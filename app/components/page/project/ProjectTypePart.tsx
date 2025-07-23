import { ProjectType } from "@/src/types";
import { Badge, Box, MantineColor, rem, Tooltip } from "@mantine/core";
import { IconApi, IconBooks, IconDeviceDesktop, IconDeviceMobile, IconTerminal2, IconWorldWww, TablerIconsProps } from "@tabler/icons-react";
import React from "react";

const Map: Record<ProjectType, [color: MantineColor, text: string, icon: React.ComponentType<TablerIconsProps>]> = {
    library: ["violet", "library", IconBooks],
    cli: ["violet", "cli", IconTerminal2],
    desktop: ["gray", "desktop", IconDeviceDesktop],
    mobile: ["gray", "mobile", IconDeviceMobile],
    restapi: ["green", "api", IconApi],
    website: ["blue", "web", IconWorldWww],
};

export const ProjectTypePart = ({ type }: { type: ProjectType }) => {
    const [color, label, Icon] = Map[type];

    return (
        <Tooltip label={label}>
            <Box c={color}>
                <Icon style={{ width: rem(16), height: rem(16) }} />
            </Box>
        </Tooltip>
    )
};
