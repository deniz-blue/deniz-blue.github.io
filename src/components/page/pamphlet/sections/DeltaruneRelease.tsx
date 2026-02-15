import { Anchor, Box, Code, Divider, Group, Image, Progress, Stack, Text } from "@mantine/core";
import { useCountdown } from "~/hooks/useCountdown";
import { Localized } from "@alan404/react-localization";

export const DeltaruneRelease = () => {
    const ANNOUNCEMENT_DATE = new Date("2025-04-02T00:00:00-03:00");
    const RELEASE_DATE = new Date("2025-06-05T00:00:00-04:00");
    const MAX_RETENTION = new Date("2025-06-10T00:00:00-04:00");

    const {
        countdownReached,
        timerText,
        relativeText,
    } = useCountdown({
        countdownTime: RELEASE_DATE,
    });

    // if (countdownReached && Date.now() > MAX_RETENTION.getTime()) {
    //     return null;
    // }

    return (
        <Stack
            align="center"
            w="100%"
            pos="relative"
        >
            <Divider
                w="80%"
                label="deltarune tomorrow"
            />

            <Group gap="xs">
                <Anchor
                    href="https://deltarune.com"
                    target="_blank"
                >
                    <Image
                        src="/assets/img/ico/deltarune.png"
                        h="1rem"
                        w="auto"
                    />
                </Anchor>
                <Text c="white" inline>Chapters 1-4</Text>
            </Group>

            <Stack gap={4} align="center">
                <Group gap={4} fw="bold" fz="xl" ff="heading">
                    {/* <Text inherit span inline>
                        {timerText}
                    </Text>
                    <Text inherit span inline>
                        -
                    </Text> */}
                    <Text inherit span inline>
                        {relativeText}
                    </Text>
                </Group>
                <Text fz="xs" c="dimmed">
                    <Localized
                        en="June 5, 2025"
                        tr="5 Haziran, 2025"
                    />
                </Text>
            </Stack>

            {/* <Progress
                value={100 - (Date.now() - ANNOUNCEMENT_DATE.getTime()) / (RELEASE_DATE.getTime() - ANNOUNCEMENT_DATE.getTime()) * 100}
                w="80%"
            /> */}

            <Box
                w="100%"
                h="13rem"
                style={{
                    position: "absolute",
                    backgroundImage: "linear-gradient(transparent, #000000bb 30% 70%, transparent)",
                    top: "-2rem",
                    zIndex: "-7",
                }}
            />

            <Box
                h="100%"
                w="2rem"
                style={{
                    position: "absolute",
                    zIndex: "-2",
                    right: "15%",
                    top: "-1.5rem",
                    rotate: "180deg",
                    backgroundImage: "url(/assets/img/detail/page/spirea.png)",
                    backgroundSize: "contain",
                    maskImage: "linear-gradient(rgb(0 0 0 / 100%) 0% 70%, transparent)",
                    imageRendering: "auto",
                    animation: "deltarunespire 10s ease infinite",
                }}
            />

            <Box
                h="100%"
                w="2rem"
                style={{
                    position: "absolute",
                    zIndex: "-2",
                    left: "15%",
                    bottom: "-3rem",
                    backgroundImage: "url(/assets/img/detail/page/spirea.png)",
                    backgroundSize: "contain",
                    maskImage: "linear-gradient(rgb(0 0 0 / 100%) 0% 70%, transparent)",
                    imageRendering: "auto",
                    animation: "deltarunespire 10s ease infinite",
                    animationDelay: "10s",
                }}
            />
        </Stack>
    )
};
