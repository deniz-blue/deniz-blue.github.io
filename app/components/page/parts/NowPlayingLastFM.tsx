import { Box, Center, Group, Image, Paper, Stack, Text } from "@mantine/core";
import { useFetch, useInterval } from "@mantine/hooks";
import { IconAlbum, IconMusic, IconNote, IconUser, IconUserCircle } from "@tabler/icons-react";
import { PropsWithChildren, RefObject, useLayoutEffect, useRef, useState } from "react";
import { toRomaji } from "wanakana";

export interface Track {
    artist?: { "#text"?: string; };
    album?: { "#text"?: string; };
    image?: {
        size?: "small" | "medium" | "large" | "extralarge";
        "#text": string;
    }[];
    name?: string;
    url?: string;

    "@attr"?: {
        nowplaying?: boolean;
    };
};

export const useLastFMNowPlaying = () => {
    const ctx = useFetch<{
        recenttracks: {
            track: Track[];
        },
    }>("https://lastfm.denizblue.workers.dev");

    useInterval(() => {
        console.log("Refetching LastFM...");
        ctx.refetch();
    }, 16000, { autoInvoke: true });

    return {
        ...ctx,
        track: ctx.data?.recenttracks?.track?.find(x => x["@attr"]?.nowplaying),
    };
};

export const LastFMTrackCard = ({
    track,
}: {
    track: Track;
}) => {
    const name = track.name || "";
    const album = (track.album?.["#text"] == name) ? null : (track.album?.["#text"] || null);
    const artist = track.artist?.["#text"] || "";
    const imageSrc = track.image?.at(-1)?.["#text"] || null;

    return (
        <Paper p={4} w="100%" radius="sm">
            <Stack w="100%">
                <Box w="100%">
                    <Paper w="4rem" h="4rem" bg="dark" style={{ float: "left" }} mr={4}>
                        {imageSrc ? (
                            <Image
                                w="4rem"
                                h="4rem"
                                src={imageSrc}
                                radius="sm"
                            />
                        ) : (
                            <Center w="4rem" h="4rem">
                                <IconMusic />
                            </Center>
                        )}
                    </Paper>
                    <Stack>
                        <Text
                            span
                            fz="sm"
                            flex="1"
                        >
                            <Stack gap={0} w="100%">
                                <Group gap={4} wrap="nowrap">
                                    <AutoMarquee>
                                        <Text inline inherit span fw="bold">
                                            <MaybeRuby>
                                                {name}
                                            </MaybeRuby>
                                        </Text>
                                    </AutoMarquee>
                                </Group>
                                {album && (
                                    <Group gap={4} wrap="nowrap">
                                        <IconAlbum size={16} />
                                        <AutoMarquee>
                                            <Text inline inherit span>
                                                <MaybeRuby>
                                                    {album}
                                                </MaybeRuby>
                                            </Text>
                                        </AutoMarquee>
                                    </Group>
                                )}
                                <Group gap={4} wrap="nowrap" w="100%">
                                    <IconUserCircle size={16} display="block" />
                                    <AutoMarquee>
                                        <Text inline inherit span>
                                            <MaybeRuby>
                                                {artist}
                                            </MaybeRuby>
                                        </Text>
                                    </AutoMarquee>
                                </Group>
                            </Stack>
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    )
};

export const MaybeRuby = ({
    children,
}: {
    children: string;
}) => {
    const ro = toRomaji(children);

    if (ro == children) return children;
    return (
        <ruby style={{ fontSize: 12 }}>
            {children}
            <rp> (</rp>
            <rt style={{ fontSize: 10 }}>{ro}</rt>
            <rp>)</rp>
        </ruby>
    );
};

export const useWidthOverflow = (ref: RefObject<HTMLElement | null>, opts?: {
    deps?: React.DependencyList;
}) => {
    const [overflown, setOverflown] = useState(false);

    useLayoutEffect(() => {
        if (!ref.current) return;
        setOverflown(
            ref.current.offsetWidth < ref.current.scrollWidth
        );
    }, [...(opts?.deps ?? [])]);

    return overflown;
};

export const AutoMarquee = ({
    children,
}: PropsWithChildren) => {
    const outerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);

    const overflown = useWidthOverflow(measureRef, { deps: [children ?? null] });

    const contentWidth = measureRef.current?.scrollWidth ?? 0;
    const s = {
        animation: "",
        animationDuration: (contentWidth * 25) + "ms",
        whiteSpace: "nowrap",
        display: "inline-block",
    } as React.CSSProperties;

    return (
        <div
            ref={outerRef}
            className={overflown ? "marquee" : ""}
            style={{
                width: "100%",
                overflowX: "hidden",
                whiteSpace: "nowrap",
                position: "relative",
            }}
        >
            <div ref={measureRef} style={{ width: "100%", whiteSpace: "nowrap", overflow: "hidden" }}>
                <div style={s} className="marqueeContent">
                    {children}
                </div>
            </div>

            {overflown && (
                <div aria-hidden className="marqueeContent" style={{
                    ...s,
                    position: "absolute",
                    left: `calc(${contentWidth}px + var(--gap))`,
                }}>
                    {children}
                </div>
            )}
        </div>
    );
};
