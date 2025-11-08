import { Box, Center, Group, Image, Paper, Stack, Text } from "@mantine/core";
import { useFetch, useInterval } from "@mantine/hooks";
import { IconAlbum, IconMusic, IconNote, IconUser, IconUserCircle } from "@tabler/icons-react";
import { PropsWithChildren, RefObject, useLayoutEffect, useRef, useState } from "react";
import { toRomaji } from "wanakana";

export interface TrackMetadata {
    artist_name?: string;
    release_name?: string;
    track_name?: string;
    additional_info?: {
        origin_url?: string;
    };
};

export const useLastFMNowPlaying = () => {
    const ctx = useFetch<{
        payload: {
            count: number;
            listens: {
                playing_now: boolean;
                track_metadata: TrackMetadata;
            }[];
            playing_now: boolean;
            user_id: string;
        };
    }>("https://api.listenbrainz.org/1/user/deniz.blue/playing-now");

    useInterval(() => {
        console.log("Refetching LastFM...");
        ctx.refetch();
    }, 16000, { autoInvoke: true });

    return {
        ...ctx,
        track: ctx.data?.payload.listens[0]?.track_metadata ?? null,
    };
};

export const trackGetImageSrc = (track: TrackMetadata) => {
    if(track.additional_info?.origin_url) {
        const url = new URL(track.additional_info.origin_url);
        if(["youtube.com", "music.youtube.com"].includes(url.host)) {
            const id = url.searchParams.get("v");
            if(id)
                return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
        }
    }

    return null;
};

export const LastFMTrackCard = ({
    track,
}: {
    track: TrackMetadata;
}) => {
    const name = track.track_name || "";
    const album = track.release_name ?? null;
    const artist = track.artist_name || "";
    const imageSrc = trackGetImageSrc(track);

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
