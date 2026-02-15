import { Localized } from "@alan404/react-localization";
import { Alert, Anchor, Box, Code, Divider, Group, Image, Paper, Stack, Text, Tooltip } from "@mantine/core"
import { IconArrowNarrowRight, IconBrandGithub, IconInfoCircle } from "@tabler/icons-react";

export const Motd = () => {
    return null;

    return (
        <Stack align="center" w="100%" px="sm">
            <Divider
                label="Message of the Day"
                w="80%"
            />

            <Paper
                p={"xs"}
                bg="var(--mantine-primary-color-light)"
            >
                <Stack gap={4} align="center">
                    <Group
                        w="100%"
                        c="var(--mantine-color-violet-light-color)"
                        fz="sm"
                        fw="bold"
                        gap={4}
                    >
                        <IconInfoCircle />
                        <Localized
                            en="My GitHub username has been changed!"
                            tr="GitHub kullanıcı adım değişti!"
                        />
                    </Group>
                    <Group gap="xs" pt={8}>
                        <Text span inline p={4} ff="monospace" bg="dark">
                            TheAlan404
                        </Text>
                        <IconArrowNarrowRight />
                        <Anchor
                            inline
                            href="https://github.com/deniz-blue"
                            target="_blank"
                        >
                            <Text span p={4} ff="monospace" bg="dark">
                                deniz-blue
                            </Text>
                        </Anchor>
                    </Group>
                </Stack>
            </Paper>

            {/* <Stack gap={0}>
                <Group gap={4}>
                    <Image
                        src="/assets/img/ico/aceflag.svg"
                        radius="xs"
                        h="2rem"
                        w="auto"
                    />
                    <Stack gap={0}>
                        <Text fz="xs" c="dimmed" inline>6th April</Text>
                        <Text ff="heading" inline>International Asexuality Day</Text>
                    </Stack>
                </Group>
            </Stack> */}
        </Stack>
    );
}

type AwarenessDay = {
    startDate: string;
    endDate?: string;
    name: string;
    icon?: string;
};

const AwarenessDays: AwarenessDay[] = [
    {
        startDate: "2025-07-16",
        name: "Bulut's Birthday",
    },
    {
        startDate: "2025-05-19",
        name: "Agender Pride Day",
    },
    {
        startDate: "2025-02-16",
        endDate: "2025-02-22",
        name: "A-Spec Awareness Week",
    },
    {
        startDate: "2025-06-05",
        name: "Aromantic Visibility Day",
    },
    {
        startDate: "2025-10-25",
        endDate: "2025-10-31",
        name: "Ace Week",
    },
    {
        startDate: "2025-08-16",
        endDate: "2025-08-22",
        name: "Bisexual Awareness Week",
    },
    {
        startDate: "2025-08-23",
        name: "Bisexual Visibility Day",
    },
    {
        startDate: "2025-10-17",
        endDate: "2025-10-24",
        name: "Genderfluid Visibility Week",
    },
    {
        startDate: "2025-10-26",
        name: "Intersex Awareness Day",
    },
    {
        startDate: "2025-11-08",
        name: "Intersex Day of Remembrance",
    },
    {
        startDate: "2025-07-19",
        endDate: "2025-07-26",
        name: "Plural Acceptance Week",
    },
    {
        startDate: "2025-07-19",
        name: "Plural Pride Day",
    },
    {
        startDate: "2025-03-05",
        name: "DID Awareness Day",
    },
    {
        startDate: "2025-07-09",
        name: "Otherkin Day",
    },
    {
        startDate: "2025-11-05",
        name: "Therianthropy Day",
    },
];
