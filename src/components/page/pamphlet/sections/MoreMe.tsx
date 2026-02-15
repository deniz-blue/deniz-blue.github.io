import { Accordion, Anchor, Box, Button, Collapse, Divider, Group, Image, ScrollArea, SimpleGrid, Stack, Text } from "@mantine/core"
import { modals } from "@mantine/modals"
import { IconBrush, IconComet, IconCrown } from "@tabler/icons-react"
import { ReactNode } from "react"
import { Localized } from "@alan404/react-localization"
import { OCArtModal } from "~/components/archive/modals/OCArtModal"
import { TechnobladeShrine } from "~/components/archive/modals/TechnobladeShrine"

export const MoreMe = () => {
    return (
        <Stack align="center" w="100%" px="sm">
            <Divider
                w="80%"
                label={(
                    <Localized
                        en="More me!"
                        tr="Daha fazla ben!"
                    />
                )}
            />

            <SimpleGrid cols={2} w="100%" px="sm" spacing={4} verticalSpacing={4}>
                <Button
                    variant="light"
                    onClick={() => modals.open({
                        title: "OC Art",
                        size: "xl",
                        removeScrollProps: { removeScrollBar: false },
                        scrollAreaComponent: ScrollArea.Autosize,
                        children: (
                            <OCArtModal />
                        ),
                    })}
                    leftSection={<IconBrush />}
                >
                    OC Art
                </Button>

                <Button
                    variant="light"
                    onClick={() => modals.open({
                        title: "denizcore",
                        size: "xl",
                        removeScrollProps: { removeScrollBar: false },
                        scrollAreaComponent: ScrollArea.Autosize,
                        children: (
                            <Image
                                src="/assets/img/other/denizcore.png"
                                style={{ imageRendering: "auto" }}
                            />
                        ),
                    })}
                    leftSection={<IconComet />}
                >
                    denizcore.png
                </Button>

                <Button
                    variant="light"
                    onClick={() => modals.open({
                        title: "Technoblade Shrine",
                        size: "xl",
                        removeScrollProps: { removeScrollBar: false },
                        scrollAreaComponent: ScrollArea.Autosize,
                        children: (
                            <TechnobladeShrine />
                        ),
                    })}
                    leftSection={<IconCrown />}
                >
                    Technoblade
                </Button>
            </SimpleGrid>

            <Stack w="100%" align="start" gap={0} px="xl">
                <Text fw="bold" fz="xs" pl={28}>
                    <Localized
                        en="I PREVIOUSLY WORKED AT"
                        tr="DAHA ÖNCE BURDA ÇALIŞTIM"
                    />
                </Text>
                <Stack gap="xs">
                    <PreviousJob
                        icon="/assets/img/ico/lodestone.png"
                        title="Lodepale Studios"
                        subtitle={(
                            <Localized
                                en="minecraft bedrock addons"
                                tr="minecraft bedrock addonları"
                            />
                        )}
                        url="https://lodepale.com"
                    />
                    <PreviousJob
                        icon="/assets/img/ico/modfest_icon.svg"
                        title="ModFest"
                        subtitle={(
                            <Localized
                                en="game jams but its minecraft mods"
                                tr="game jam gibi ama minecraft modları için"
                            />
                        )}
                        url="https://modfest.net"
                    />
                    <PreviousJob
                        icon="/assets/img/ico/ulus_icon.ico"
                        title="Ulus Medya"
                        subtitle={(
                            <Localized
                                en="media agency"
                                tr="medya ajansı"
                            />
                        )}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}

export const PreviousJob = ({
    title,
    subtitle,
    icon,
    url,
}: {
    title: ReactNode;
    subtitle?: ReactNode;
    icon: string;
    url?: string;
}) => {
    return (
        <Group gap={4} wrap="nowrap" align="start">
            <Image
                src={icon}
                style={{ imageRendering: "auto" }}
                w={24}
                h={24}
            />
            <Stack gap={0}>
                <Group>
                    <Anchor
                        c="unset"
                        href={url}
                        target={url ? "_blank" : undefined}
                    >
                        {title}
                    </Anchor>
                </Group>
                <Text fz="xs" c="dimmed" inline>
                    {subtitle}
                </Text>
            </Stack>
        </Group>
    );
}
