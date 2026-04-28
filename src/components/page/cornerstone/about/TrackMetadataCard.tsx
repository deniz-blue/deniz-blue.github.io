import { Box, Center, Group, Image, LoadingOverlay, Marquee, OverflowList, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { IconAlbum, IconMusic, IconUserCircle } from "@tabler/icons-react";
import { AutoMarquee } from "../../../ui/text/AutoMarquee";
import { MaybeRuby } from "../../../ui/text/MaybeRuby";
import { Swapper } from "../../../ui/swapper/Swapper";
import { useMemo } from "react";
import { TrackMetadata, useListeningToStore } from "../../../../stores/useListeningToStore";

export const trackGetImageSrc = (track: TrackMetadata) => {
	if (track.additional_info?.origin_url) {
		const url = new URL(track.additional_info.origin_url);
		if (["youtube.com", "music.youtube.com"].includes(url.host)) {
			const id = url.searchParams.get("v");
			if (id)
				return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
		}

		if (url.host === "youtu.be") {
			const id = url.pathname.slice(1);
			if (id)
				return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
		}
	}

	return null;
};

export const OverengineeredText = ({
	text = "",
	bold,
}: {
	text: string;
	bold?: boolean;
}) => {
	const child = useMemo(() => (
		<Text inline inherit style={{ textWrap: "nowrap" }} span fw={bold ? "bold" : undefined}>
			<MaybeRuby>
				{text}
			</MaybeRuby>
		</Text>
	), [text, bold]);

	return (
		<OverflowList
			w="100%"
			data={[text]}
			renderItem={() => child}
			renderOverflow={() => (
				<Marquee
					duration={10000}
					gap="xl"
				>
					{child}
				</Marquee>
			)}
		/>
	)
};

export const TrackMetadataCard = ({
	track,
}: {
	track: TrackMetadata;
}) => {
	const loading = useListeningToStore(store => store.loading);

	const name = track.track_name || "";
	const album = track.release_name ?? null;
	const artist = track.artist_name || "";
	const imageSrc = trackGetImageSrc(track);

	const imageNode = useMemo(() => {
		return (
			imageSrc ? (
				<Image
					w="4rem"
					h="4rem"
					src={imageSrc}
					radius="md"
				/>
			) : (
				<Center w="4rem" h="4rem">
					<IconMusic />
				</Center>
			)
		);
	}, [imageSrc]);

	const nameNode = useMemo(() => {
		return (
			<Group gap={4} wrap="nowrap" w="100%">
				<OverengineeredText
					text={name}
				/>
			</Group>
		);
	}, [name]);

	const albumNode = useMemo(() => {
		return !album ? null : (
			<Group gap={4} wrap="nowrap" w="100%">
				<Tooltip label="Album" position="left" withArrow>
					<IconAlbum style={{ display: "block", minWidth: 16 }} size={16} />
				</Tooltip>
				<Box w="calc(100% - 16px - 4px)">
					<OverengineeredText text={album} />
				</Box>
			</Group>
		);
	}, [album]);

	const artistNode = useMemo(() => {
		return !artist ? null : (
			<Group gap={4} wrap="nowrap" w="100%">
				<Tooltip label="Artist" position="left" withArrow>
					<IconUserCircle style={{ display: "block", minWidth: 16 }} size={16} />
				</Tooltip>
				<Box w="calc(100% - 16px - 4px)">
					<OverengineeredText text={artist} />
				</Box>
			</Group>
		);
	}, [artist]);

	return (
		<Paper p={4} w="100%" bg="var(--mantine-color-violet-light)">
			<Stack w="100%">
				<Group w="100%" fz="sm" gap={4} wrap="nowrap" align="flex-start" justify="flex-start">
					<Paper
						w="4rem"
						h="4rem"
						bg="var(--mantine-color-violet-light)"
						mr={4}
						pos="relative"
					>
						<LoadingOverlay
							visible={loading}
							overlayProps={{ opacity: 0 }}
							loaderProps={{ size: "xs" }}
							styles={{
								root: {
									justifyContent: "flex-end",
									alignItems: "flex-start",
									padding: 4,
								},
							}}
						/>
						<Swapper
							content={imageNode}
						/>
					</Paper>
					<Stack gap={0} w="calc(100% - 4rem - 4px - 4px)">
						<Swapper
							content={nameNode}
						/>
						<Swapper
							content={albumNode}
						/>
						<Swapper
							content={artistNode}
						/>
					</Stack>
				</Group>
			</Stack>
		</Paper >
	)
};

