import { Box, Center, Group, Image, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { IconAlbum, IconMusic, IconUserCircle } from "@tabler/icons-react";
import { AutoMarquee } from "../../ui/text/AutoMarquee";
import { MaybeRuby } from "../../ui/text/MaybeRuby";
import { Swapper } from "../../ui/swapper/Swapper";
import { useMemo } from "react";
import { TrackMetadata } from "../../../stores/useListeningToStore";

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
	return (
		<AutoMarquee>
			<Text inline inherit span fw={bold ? "bold" : undefined}>
				<MaybeRuby>
					{text}
				</MaybeRuby>
			</Text>
		</AutoMarquee>
	)
};

export const TrackMetadataCard = ({
	track,
}: {
	track: TrackMetadata;
}) => {
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
					radius="sm"
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
					<IconAlbum size={16} />
				</Tooltip>
				<OverengineeredText
					text={album}
				/>
			</Group>
		);
	}, [album]);

	const artistNode = useMemo(() => {
		return !artist ? null : (
			<Group gap={4} wrap="nowrap" w="100%">
				<Tooltip label="Artist" position="left" withArrow>
					<IconUserCircle size={16} />
				</Tooltip>
				<OverengineeredText
					text={artist}
				/>
			</Group>
		);
	}, [artist]);

	return (
		<Paper p={4} w="100%" radius="sm" bg="var(--mantine-color-violet-light)">
			<Stack w="100%">
				<Box w="100%">
					<Paper w="4rem" h="4rem" bg="var(--mantine-color-violet-light)" style={{ float: "left" }} mr={4}>
						<Swapper
							content={imageNode}
						/>
					</Paper>
					<Stack>
						<Text
							span
							fz="sm"
							flex="1"
						>
							<Stack gap={0} w="100%">
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
						</Text>
					</Stack>
				</Box>
			</Stack>
		</Paper >
	)
};

