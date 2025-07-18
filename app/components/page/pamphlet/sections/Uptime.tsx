import { Localized } from "@alan404/react-localization";
import { Anchor, Divider, Group, Image, Loader, Paper, Stack, Text } from "@mantine/core"
import { useFetch } from "@mantine/hooks";
import { IconExternalLink } from "@tabler/icons-react";
import { useFeatures } from "../../../base/FeaturesContext";

export const Uptime = () => {
    const {
        data,
        error,
        loading,
    } = useFetch<{
        name: string;
        url: string;
        icon: string;
        slug: string;
        status: "up" | "down" | string;
        uptime: string;
        time: number;
    }[]>("https://raw.githubusercontent.com/deniz-blue/upptime/master/history/summary.json", {
        autoInvoke: true,
    });

    const { displayUptime } = useFeatures();
    if(!displayUptime) return null;

    return (
        <Stack align="center" w="100%" px="sm">
            <Divider
                label={(
                    <Localized
                        tr="Servisler"
                        en="Uptime"
                    />
                )}
                w="80%"
            />

            <Stack w="80%" gap={4} align="center">
                {loading && <Loader />}

                {data?.map((service) => (
                    <Paper
                        w="100%"
                        withBorder
                        p={4}
                        className="frost"
                        key={service.slug}
                    >
                        <Group gap={4} wrap="nowrap" align="center">
                            <Image
                                src={service.icon}
                                style={{ imageRendering: "auto" }}
                                w="1.5rem"
                                h="1.5rem"
                            />
                            <Stack gap={0} flex="1">
                                <Anchor
                                    href={service.url}
                                    target="_blank"
                                    inline
                                >
                                    <Group wrap="nowrap" gap={4} align="center">
                                        <Text inherit inline span>
                                            {service.name}
                                        </Text>
                                        <IconExternalLink size={12} />
                                    </Group>
                                </Anchor>
                                <Group wrap="nowrap" gap={4}>
                                    <Text
                                        inline
                                        fz="xs"
                                        fw="bold"
                                        c={service.status == "up" ? "green" : (service.status == "down" ? "yellow" : "red")}
                                    >
                                        {service.status == "up" ? "ONLINE" : (service.status == "down" ? "DOWN" : service.status)}
                                    </Text>
                                    <Text
                                        inline
                                        fz="xs"
                                        c="dimmed"
                                    >
                                        {service.time}ms
                                    </Text>
                                </Group>
                            </Stack>
                            <Image
                                src={`https://raw.githubusercontent.com/deniz-blue/upptime/master/graphs/${service.slug}/response-time-week.png`}
                                style={{ imageRendering: "auto" }}
                                h="2rem"
                                w="auto"
                            />
                        </Group>
                    </Paper>
                ))}
            </Stack>
        </Stack>
    );
}
