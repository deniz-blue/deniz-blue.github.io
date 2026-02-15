import { Localized } from "@alan404/react-localization";
import { Anchor, Collapse, Divider, Group, Image, Loader, Paper, Stack, Text } from "@mantine/core"
import { useFetch } from "@mantine/hooks";
import { IconExternalLink } from "@tabler/icons-react";

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

            <Stack w="100%" gap={4} align="center">
                <Collapse expanded={loading}>
                    <Loader />
                </Collapse>

                {data?.filter(service => service.name !== "deniz.blue")?.map((service) => (
                    <Paper
                        w={(88 + 4) * 3}
                        withBorder
                        p={4}
                        className="frost soulSelectable"
                        data-ml={12}
                        data-zindex={1}
                        data-anchor="left-center"
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
