import { Accordion, Box, Collapse, Loader, Paper, Space, Stack, Text } from "@mantine/core";
import { MeName } from "../pamphlet/PamphletHeader";
import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons-react";
import { CosplayWebring } from "../pamphlet/sections/webring/CosplayWebring";
import { ProjectListV2 } from "./ProjectListV2";
import { Badges } from "../pamphlet/sections/badges/Badges";
import { LastFMTrackCard, useLastFMNowPlaying } from "../parts/NowPlayingLastFM";
import { useBackgroundStore } from "../../background/PageBackground";
import { ProjectButtonSection } from "./ProjectButtonSection";
import { BackgroundSwitcher } from "../controls/BackgroundSwitcher";

export const PamphletV2 = () => {
    const background = useBackgroundStore(store => store.background);

    return (
        <Stack
            mih="100dvh"
            align="center"
        >
            <Stack
                gap={4}
                align="center"
                pb="7rem"
                className={["winter", "starfield", "aurora"].includes(background.type) ? "frost" : ""}
                style={{
                    transition: "all 0.1s",
                    backgroundRepeat: "repeat-y",
                }}
            >
                <Stack
                    gap={4}
                    w={(88 * 3) + (4 * 2) + 12 * 2}
                    align="center"
                    mx={4}
                >
                    <Paper fw="bold" px="xl" py={4} className="frost" my="1rem">
                        <MeName />
                    </Paper>

                    <Accordion unstyled loop={false} w="100%">
                        <Stack w="100%">
                            <Stack gap={4} align="center">
                                <Text inline fw="bold" fz="xs">
                                    LINKS
                                </Text>
                                <ProjectButtonSection
                                    project={{
                                        id: "x:github",
                                        iconOverride: <IconBrandGithub />,
                                        name: "GitHub",
                                        desc: "Check out my repositories!",
                                        link: "https://github.com/deniz-blue",
                                    }}
                                />
                                <ProjectButtonSection
                                    project={{
                                        id: "x:discord",
                                        iconOverride: <IconBrandDiscord />,
                                        name: "Discord Server",
                                        desc: "For support about my projects!",
                                        link: "https://deniz.blue/discord-invite?id=1197520507617153064",
                                    }}
                                />
                            </Stack>

                            <ProjectListV2 />

                            <LastFMSection />

                            <Stack gap={4} align="center">
                                <Text inline fw="bold" fz="xs">
                                    WEBRINGS
                                </Text>
                                <CosplayWebring />
                            </Stack>

                            <Stack gap={4} align="center">
                                <Text inline fw="bold" fz="xs">
                                    88x31
                                </Text>
                                <Badges />
                            </Stack>

                            <BackgroundSwitcher />

                            <Text c="dimmed" ta="center" inline span fz="xs" fs="italic">
                                don't forget
                                <br/>
                                you promised
                            </Text>

                            <Space h="40vh" />
                        </Stack>
                    </Accordion>
                </Stack>
            </Stack>
        </Stack>
    )
};

export const LastFMSection = () => {
    const { track, loading, refetch } = useLastFMNowPlaying();

    // @ts-ignore
    globalThis.lastfmrefetch = refetch;

    return (
        <Collapse in={!!track}>
            <Stack gap={4} align="center">
                <Text inline fw="bold" fz="xs">
                    LISTENING TO
                </Text>
                <Stack w="100%">
                    {track && (
                        <LastFMTrackCard
                            track={track}
                        />
                    )}
                </Stack>
                <Collapse in={loading}>
                    <Loader size={12} />
                </Collapse>
            </Stack>
        </Collapse>
    )
}
