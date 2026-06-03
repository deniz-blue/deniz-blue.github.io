import { Anchor, Center, Group, Paper, Stack, Text } from "@mantine/core";

export const LinkIcon = ({
	href,
	icon,
	name,
}: {
	name: string;
	href: string;
	icon: string;
}) => {
	return (
		<Anchor href={href} target="_blank" rel="noopener noreferrer">
			<img src={icon} alt={name} style={{ width: 24, height: 24 }} />
		</Anchor>
	);
};

export const Centerstone = () => {
	return (
		<Stack h="100svh">
			<Center h="100%">
				<Paper
					className="frost"
					p="xs"
				>
					<Stack align="center" gap={4}>
						<Text c="dimmed" fz="lg" fw="bold">
							deniz.blue
						</Text>

						<Group gap={4}>
							<LinkIcon
								name="GitHub"
								href="https://github.com"
								icon="https://github.githubassets.com/favicons/favicon.svg"
							/>
							<LinkIcon
								name="Discord"
								href="https://deniz.blue/discord-invite/?id=1197520507617153064"
								icon="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/62fddf0fde45a8baedcc7ee5_847541504914fd33810e70a0ea73177e%20(2)-1.png"
							/>
							<LinkIcon
								name="Matrix"
								href="https://matrix.to/#/@deniz:catgirl.cloud"
								icon="https://matrix.org/assets/favicon.svg"
							/>
							<LinkIcon
								name="Bluesky"
								href="https://bsky.app/profile/deniz.blue"
								icon="https://web-cdn.bsky.app/static/favicon-16x16.png"
							/>
						</Group>
					</Stack>
				</Paper>
			</Center>
		</Stack>
	)
};
