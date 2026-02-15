import { useLanguage, Localized } from "@alan404/react-localization";
import { Anchor, Button, Divider, Group, Image, Stack, Text } from "@mantine/core";
import { IconAffiliate, IconAlertCircle, IconBrandReact, IconCalendar, IconExternalLink, IconTerminal2 } from "@tabler/icons-react";

export const FeaturedProjects = () => {
    const { language } = useLanguage();

    return (
        <Stack align="center" w="100%" px="sm">
            <Divider
                label={(
                    <Localized
                        en="Featured Projects"
                        tr="Öne Çıkan Projelerim"
                    />
                )}
                w="80%"
            />

            {/* <Stack px="xl" w="100%" gap={4}> */}
                {/* <Button
                    fullWidth
                    variant="light"
                    h="auto"
                    rightSection={<IconExternalLink />}
                    leftSection={(
                        <Image
                            src="https://events.deniz.blue/eventsdenizblue.svg"
                            w={24}
                            h={24}
                        />
                    )}
                    justify="space-between"
                    component="a"
                    href="https://events.deniz.blue"
                    target="_blank"
                >
                    <Stack gap={0} style={{ textWrap: "wrap" }} py={4}>
                        <Text>Deniz's Events Site</Text>
                        <Text fz="xs">List of geeky events in Turkey</Text>
                    </Stack>
                </Button> */}

                {/* <Group justify="end" ta="end" c="yellow" gap={4} wrap="nowrap">
                    <Stack flex="1">
                        <Text fz="xs" inline>Most events are postponed due to the recent events happening in Turkey</Text>
                    </Stack>
                    <IconAlertTriangle size={18} />
                </Group>
                <Group justify="end" ta="end" c="dimmed" gap={4}>
                    <Text fz="xs">...not to mention it's still in beta</Text>
                    <IconInfoCircle size={18} />
                </Group> */}
            {/* </Stack> */}

            <Group wrap="nowrap" align="start" px="lg" gap={4}>
                {/* <IconCalendar /> */}
                <Image
                    src="https://events.deniz.blue/eventsdenizblue.svg"
                    w={24}
                    h={24}
                />
                <Stack w="100%" gap={4} flex="1">
                    <Text fz="sm">
                        <Localized
                            en="If you live in Turkey, check out #LINK# - a website for geeky events in Turkey."
                            tr="Eğer sen de Türkiye'de yaşıyorsan ve ilginç etkinliklerden haberdar olmak istiyorsan #LINK#'ne bi göz at!"
                            asText
                            LINK={(
                                <Anchor
                                    href="https://events.deniz.blue"
                                    target="_blank"
                                    inherit
                                >
                                    <Localized
                                        en="Deniz's Events Site"
                                        tr="Deniz'in Etkinlik Sitesi"
                                    />
                                </Anchor>
                            )}
                        />
                    </Text>
                    {/* <Group justify="start" ta="start" c="red" gap={4} wrap="nowrap">
                        <IconAlertCircle size={18} />
                        <Stack flex="1">
                            <Text fz="xs" inline c="dimmed">
                                <Localized
                                    en="Most events are however postponed due to the #LINK#"
                                    tr="Ama ne yazık ki çoğu etkinlik #LINK# yüzünden askıya alınmış durumda"
                                    LINK={(
                                        <Anchor
                                            href={language == "en" ? (
                                                "https://en.wikipedia.org/wiki/2025_Turkish_protests"
                                            ) : (
                                                "https://tr.wikipedia.org/wiki/2025_T%C3%BCrkiye%27de_h%C3%BCk%C3%BBmet_kar%C5%9F%C4%B1t%C4%B1_protestolar"
                                            )}
                                            target="_blank"
                                            inherit
                                            c="dimmed"
                                            td="underline dotted"
                                        >
                                            <Localized
                                                en="recent events"
                                                tr="güncel olaylar"
                                            />
                                        </Anchor>
                                    )}
                                />
                            </Text>
                        </Stack>
                    </Group> */}
                </Stack>
            </Group>

            <Group wrap="nowrap" align="start" px="lg" gap={4}>
                <IconTerminal2 />
                <Stack w="100%" gap={4} flex="1">
                    <Text fz="sm">
                        <Localized
                            en="If you manage Minecraft servers, #LINK# is a CLI tool I've made that might help you."
                            tr="Eğer Minecraft sunucuları ayarlıyorsan #LINK# sana yardımcı olabilecek bir CLI aracı."
                            LINK={(
                                <Anchor
                                    href="https://github.com/ParadigmMC/mcman"
                                    target="_blank"
                                    inherit
                                >
                                    mcman
                                </Anchor>
                            )}
                        />

                    </Text>
                </Stack>
            </Group>

            <Group wrap="nowrap" align="start" px="lg" gap={4}>
                <IconAffiliate />
                <Stack w="100%" gap={0} flex="1">
                    <Text fz="sm">
                        <Localized
                            en="Polyamorous with #PLURAL#? Check #LINK#, a graph editor for that."
                            tr="#PLURAL# olanlar ile poliamori ilişkiniz varsa #LINK# üzerinden grafiğe dökebilirsiniz"
                            PLURAL={(
                                <Anchor
                                    href="https://morethanone.info/"
                                    target="_blank"
                                    inherit
                                    c="unset"
                                    td="underline dotted"
                                >
                                    <Localized
                                        en="plural systems"
                                        tr="DKB/Sistem"
                                    />
                                </Anchor>
                            )}
                            LINK={(
                                <Anchor
                                    href="https://poly.deniz.blue"
                                    target="_blank"
                                    inherit
                                >
                                    poly.deniz.blue
                                </Anchor>
                            )}
                        />
                    </Text>
                    <Text fz="xs" c="dimmed" inline>
                        <Localized
                            en="Yes, it's inspired from #POLYCULES#"
                            tr="#POLYCULES#'den esinlendim"
                            POLYCULES={(
                                <Anchor
                                    href="https://polycul.es"
                                    target="_blank"
                                    inherit
                                    c="dimmed"
                                    td="underline dotted"
                                >
                                    polycul.es
                                </Anchor>
                            )}
                        />
                    </Text>
                </Stack>
            </Group>

            <Group wrap="nowrap" align="start" px="lg" gap={4}>
                <IconBrandReact />
                <Stack w="100%" gap={0} flex="1">
                    <Text fz="sm">
                        <Localized
                            en="Making Discord bots? Do you like React? You might find #LINK# interesting."
                            tr="Discord botları kodluyorsan ve React seviyorsan #LINK#'i ilginç bulabilirsin."
                            LINK={(
                                <Anchor
                                    href="https://github.com/deniz-blue/discordjsx"
                                    target="_blank"
                                    inherit
                                >
                                    discord-jsx-renderer
                                </Anchor>
                            )}
                        />
                    </Text>
                    <Text fz="xs" c="dimmed" inline>
                        <Localized
                            en="this is horrifying"
                            tr="korkunç"
                        />
                    </Text>
                </Stack>
            </Group>
        </Stack>
    );
};
