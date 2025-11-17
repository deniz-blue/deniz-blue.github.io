import { Accordion, Button, ButtonProps, Collapse, Group, Image, Paper, Stack, Text } from "@mantine/core";
import { ProjectJSONItem } from "../../../utils/fetch-projects";
import { IconBell, IconChartDots3, IconChevronCompactDown, IconChevronDown, IconDeviceGamepad, IconDeviceGamepad2, IconExternalLink, IconFolder, IconGraph, IconPackage, IconSparkles, IconTool, IconWorld } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export const ProjectButtonSection = ({
    project,
}: {
    project: ProjectJSONItem & {
        iconOverride?: React.ReactNode;
    };
}) => {
    const buttonProps: ButtonProps = {
        size: "compact-md",
        variant: "light",
    };

    const iconOverrides = {
        tools: IconTool,
        ziltek: IconBell,
        alphamath: IconSparkles,
        carpanga: IconDeviceGamepad2,
        poly: IconChartDots3,
    } as Record<string, React.ComponentType>;

    let icon: React.ReactNode = <IconFolder />;
    if (project.tags?.includes("library")) icon = <IconPackage />;
    if (project.tags?.includes("website")) icon = <IconWorld />;
    if (project.iconURL) icon = (
        <Image
            style={{ fill: "white" }}
            src={project.iconURL}
            height={24}
            width={24}
        />
    );
    if (iconOverrides[project.id]) {
        const IconComponent = iconOverrides[project.id];
        icon = <IconComponent />;
    };
    if (project.iconOverride) icon = project.iconOverride;

    const isWip = project.tags?.includes("status:wip");

    return (
        <Accordion.Item value={project.id} w="100%">
            <Stack
                w="100%"
                gap={0}
            >
                <Group
                    w="100%"
                >
                    <Button.Group
                        w="100%"
                    >
                        <Button
                            {...buttonProps}

                            component={Accordion.Control}

                            fullWidth
                            style={{ overflow: "visible", lineClamp: "unset" }}
                            styles={{
                                inner: { justifyContent: "start" },
                                label: {
                                    overflow: "visible",
                                    whiteSpace: "normal",
                                    textAlign: "start",
                                    textDecoration: isWip ? "line-through 2px" : undefined,
                                },
                            }}
                            c={isWip ? "dimmed" : undefined}

                            icon={icon}

                            className="soulSelectable"
                            data-soul-anchor="left-center"
                            data-soul-ml={15}
                            data-soul-z={2}
                            onKeyDown={() => {
                                throw new Error("STOP_MANTINE");
                            }}
                        >
                            <Text
                                inline
                                inherit
                                span
                            >
                                {project.name || project.id}
                            </Text>
                        </Button>
                        <Button
                            {...buttonProps}

                            component="a"
                            target="_blank"
                            href={project.link}
                            className="soulSelectable"
                            data-soul-blur
                        >
                            <IconExternalLink size={18} />
                        </Button>
                    </Button.Group>
                </Group>
                <Accordion.Panel>
                    <Paper
                        p="xs"
                        bg={`rgba(121, 80, 242, 0.1)`}
                    >
                        <Text
                            fz="xs"
                        >
                            {project.desc}
                        </Text>
                    </Paper>
                </Accordion.Panel>
            </Stack>
        </Accordion.Item >
    )
};
