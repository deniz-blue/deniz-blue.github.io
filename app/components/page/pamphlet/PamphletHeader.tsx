import { Stack, Group, Avatar, Title, Text, Space, Box, Paper } from "@mantine/core";
import { Localized } from "@alan404/react-localization";
import { Socials } from "~/components/page/pamphlet/sections/Socials";

export const PamphletHeader = () => {
    return (
        <Stack px="xs" pb="xs" gap="sm">
            {/* <Box style={{
                position: "absolute",
                top: "-2.1rem",
                left: "0.5rem",
            }}>
                <Paper
                    className="frost"
                    withBorder
                    w="6rem"
                    h="6rem"
                    pos="absolute"
                    style={{
                        top: 0,
                        borderRadius: "50%",
                        clipPath: "rect(0% 100% 2.09rem 0%)",
                    }}
                />
                <Avatar
                    pos="absolute"
                    size="5rem"
                    src="/assets/img/me/pfp-2.webp"
                    style={{
                        top: "0.5rem",
                        left: "0.5rem",
                        imageRendering: "auto",
                    }}
                />
            </Box> */}

            <Group wrap="nowrap" gap="xs" justify="center">
                {/* <Space w="5.5rem" /> */}
                <Stack align="center" gap={0} pt={8}>
                    <MeTitle />
                    <Text c="dimmed" inline span>
                        <Localized
                            en="developer & cosplayer"
                            tr="yazılımcı & cosplayer"
                        />
                    </Text>
                </Stack>
            </Group>
        </Stack>
    )
};

export const MeTitle = () => {
    return (
        <Title order={3}>
            <Group gap={0} align="center">
                <Localized
                    en="hi, i'm #NAME#"
                    tr="#NAME#'in sitesi"
                    NAME={<MeName />}
                />
            </Group>
        </Title>
    );
};

export const MeName = () => {
    return (
        <Group gap={0} align="end" className="rainbowText">
            <Localized
                tr=""
                en="#GAP#"
                GAP={(
                    <Box ml={7} />
                )}
            />

            {"deniz".split("").map((letter, i) => (
                <Text
                    inherit
                    span
                    key={i}
                    className="name-letter"
                    style={{ "--i": i, whiteSpace: "pre" }}
                    w={letter == " " ? "7px" : undefined}
                >
                    {letter}
                </Text>
            ))}
        </Group>
    );
};

