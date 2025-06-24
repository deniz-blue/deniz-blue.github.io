import { Box, Button, Drawer, Group, Paper, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { Project } from "~/types";
import { SubtleLink } from "../ui/SubtleLink";
import { Link } from "react-router";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { TechPart } from "./TechPart";
import { useDisclosure } from "@mantine/hooks";

export const ProjectCard = ({
    value,
}: {
    value: Project;
}) => {
    const [opened, { open, close }] = useDisclosure();
    // const primaryButton = value.buttons.find(x => x.type == "website");

    return (
        <Box>
            <Drawer
                opened={opened}
                onClose={close}
            >

            </Drawer>

            <UnstyledButton
                onClick={open}
                w="100%"
            >
                <Paper
                    withBorder
                    className="card dimmedBg grow frost"
                    style={{
                        "--bg": value.primaryImage ? `url(${value.primaryImage})` : "",
                        "--dim": "0.7",
                    }}
                    p={4}
                >
                    <Stack gap={0}>
                        <Text>
                            {value?.name}
                        </Text>

                        <Text
                            fz="xs"
                            inline
                            span
                            c="dimmed"
                        >
                            {value?.shortDesc}
                        </Text>
                    </Stack>
                </Paper>
            </UnstyledButton>
        </Box>
    );
};
