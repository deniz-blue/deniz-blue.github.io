import { Divider, Stack, SimpleGrid, Anchor, Text, Group, Image } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { TRFlagSvg } from "../TRFlagSvg";
import { Localized } from "@alan404/react-localization";

export const AboutMe = () => {
    return (
        <Stack align="center" w="100%">
            <Divider
                px="sm"
                label={(
                    <Localized
                        en="About me!"
                        tr="Benim hakkımda!"
                    />
                )}
                w="80%"
            />

            <Stack gap={0} align="center">
                <Group gap={4}>
                    <Localized
                        en="I'm from #FLAG# #COUNTRY# #TZ#."
                        tr="#FLAG# #COUNTRY#'de yaşıyorum. #TZ#"
                        asText
                        FLAG={<TRFlagSvg height="1.5rem" style={{ imageRendering: "auto" }} />}
                        COUNTRY={<Text span fw="bold">
                            <Localized
                                en="Turkey"
                                tr="Türkiye"
                            />
                        </Text>}
                        TZ={<Text span c="dimmed">(UTC+3)</Text>}
                    />
                </Group>

                <Group gap="xs" ta="center" justify="center" align="center">
                    <Localized
                        en="I use #MANTINE# - a really good UI library."
                        tr="UI için #MANTINE# kullanıyorum."
                        MANTINE={(
                            <Anchor
                                href="https://mantine.dev"
                                c="blue"
                                h="1.5rem"
                            >
                                <MantineLogo height="1.5rem" />
                            </Anchor>
                        )}
                        asText
                    />
                </Group>

                {/* <Text>
                    <Localized
                        en="I like 🐈 cats, 🍓 strawberries and ☔ rain."
                        tr="Kedi 🐈, çilek 🍓 ve yağmuru ☔ çok severim."
                    />
                </Text> */}

                <Group gap={4} ta="center" justify="center" align="center">
                    <Localized
                        en="I mostly play #OSU# and #MINECRAFT#"
                        tr="Genellikle #OSU# ve #MINECRAFT# oynarım."
                        OSU={(
                            <Anchor
                                inherit
                                href="https://osu.ppy.sh/users/19238315"
                                target="_blank"
                                c="unset"
                            >
                                <Group gap={4} align="center">
                                    <Image
                                        src="/assets/img/ico/osu.png"
                                        h="1.5rem"
                                        w="1.5rem"
                                        display="inline"
                                        style={{ imageRendering: "auto" }}
                                    />
                                    <Text span>
                                        osu!
                                    </Text>
                                </Group>
                            </Anchor>
                        )}
                        MINECRAFT={(
                            <Anchor
                                inherit
                                href="https://namemc.com/profile/Alan404"
                                target="_blank"
                                c="unset"
                            >
                                <Group gap={4} align="center">
                                    <Image
                                        src="/assets/img/ico/minecraft.webp"
                                        h="1.2rem"
                                        w="1.2rem"
                                        display="inline"
                                        style={{ imageRendering: "auto" }}
                                    />
                                    <Text span>
                                        Minecraft
                                    </Text>
                                </Group>
                            </Anchor>
                        )}
                    />
                </Group>

                {/* im 19 */}
            </Stack>
        </Stack>
    );
};
