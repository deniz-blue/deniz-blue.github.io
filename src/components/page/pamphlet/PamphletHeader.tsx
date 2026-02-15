import { Stack, Group, Avatar, Title, Text, Space, Box, Paper } from "@mantine/core";
import { Localized } from "@alan404/react-localization";

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
                        indie developer
                    </Text>
                </Stack>
            </Group>
        </Stack>
    )
};

export const MeTitle = () => {

    return (
        <Title order={3} c={false ? "dimmed" : undefined}>
            <Group gap={0} align="center">
                <Localized
                    en="#NAME#"
                    tr="#NAME#"
                    NAME={<MeName />}
                />
            </Group>
        </Title>
    );
};

export const MeName = () => {
	const myBurdenIsDead = false;
    return (
        <Group gap={0} align="end" className={myBurdenIsDead ? "" : "rainbowText"}>
            {"deniz.blue".split("").map((letter, i) => (
                <Text
                    inherit
                    span
                    key={i}
                    className={myBurdenIsDead ? "" : "name-letter"}
                    style={{ "--i": i, whiteSpace: "pre" }}
                    w={letter == " " ? "7px" : undefined}
                >
                    {letter}
                </Text>
            ))}
        </Group>
    );
};

