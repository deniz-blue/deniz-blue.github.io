import { Accordion, Button, ButtonProps, Collapse, Group, Image, Paper, Stack, Text } from "@mantine/core";
import { ProjectJSONItem } from "../../../utils/fetch-projects";
import { IconChevronCompactDown, IconChevronDown, IconExternalLink, IconFolder, IconPackage, IconWorld } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export const ProjectButtonSection = ({
    project,
}: {
    project: ProjectJSONItem;
}) => {
    const buttonProps: ButtonProps = {
        size: "compact-md",
        variant: "light",
    };

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

                            // onClick={toggle}
                            // rightSection={(
                            //     <IconChevronDown
                            //         size={12}
                            //         style={{
                            //             transition: "all 200ms linear",
                            //             transform: `rotate(${opened ? 180 : 0}deg)`,
                            //         }}
                            //     />
                            // )}

                            component={Accordion.Control}

                            fullWidth
                            style={{ overflow: "visible" }}
                            styles={{ inner: { justifyContent: "start" } }}

                            icon={(
                                project.iconURL ? (
                                    <Image
                                        src={project.iconURL}
                                        height={24}
                                        width={24}
                                    />
                                ) : (
                                    project.tags?.includes("library") ? (
                                        <IconPackage />
                                    ) : (
                                        project.tags?.includes("website") ? (
                                            <IconWorld />
                                        ) : (
                                            <IconFolder />
                                        )
                                    )
                                )
                            )}
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
        </Accordion.Item>
    )
};
