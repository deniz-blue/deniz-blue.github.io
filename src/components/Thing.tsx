import { Anchor, Box, Image, Text, Tooltip } from "@mantine/core";

export const Thing = ({ icon, url, label }: { icon: string; url?: string; label?: string }) => {
	const size = 20;
	const img =
		icon.startsWith("http") || icon.startsWith("/") ? (
			<Image
				src={icon}
				alt={label}
				width={size}
				height={size}
				w={size}
				h={size}
				style={{ display: "inline", verticalAlign: "middle" }}
				aria-hidden={!!url}
			/>
		) : (
			<Text span inline>
				{icon}
			</Text>
		);

	return (
		<Tooltip label={label} disabled={!label} position="top" withArrow>
			<Box px={4} style={{ display: "inline" }} className="thing">
				{url ? (
					<Anchor aria-label={label} href={url} target="_blank" rel="noopener noreferrer">
						{img}
					</Anchor>
				) : (
					img
				)}
			</Box>
		</Tooltip>
	);
};
