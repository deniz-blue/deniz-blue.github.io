import { Anchor, Box, Container, Group, Stack, Text, Title } from "@mantine/core";
import { Thing } from "../components/Thing";
import sun from "./sun.png";
import pluralring from "./pluralring.png";
import minecraft from "./minecraft.webp";
import osu from "./osu.png";
import blueheart from "./blueheart.gif";
import { PropsWithChildren } from "react";

export const Page = () => {
	return (
		<Box h="100%" w="100%">
			<Container size="lg" h="100%">
				<Stack justify="center" py="xl" w="100%" mih="100%">
					<Stack gap={0} py="xl" px="md" maw={500} className="glass round">
						<Stack gap="lg">
							<Title fw={600} c="#ffffff">
								deniz 🌸
							</Title>
							<Stack gap={0}>
								<Text>
									Hi, I'm a{" "}
									<Text inline inherit span fw="bold">
										software developer
									</Text>
									.
								</Text>

								<Text>I try to build useful things.</Text>
							</Stack>
							<Stack gap="xs">
								<Text inline inherit span>
									I'm working on:
								</Text>
								<ProjectList>
									<ProjectItem
										icon="📆"
										name="Open Evnt"
										url="https://evnt.directory/"
										text="A modern event format."
									/>
									<ProjectItem
										icon="👗"
										name="CosQR"
										url="https://cos.tsx.lt/"
										text="Share contacts offline."
									/>
									<ProjectItem
										icon="🪟"
										name="HazelWM"
										url="https://github.com/deniz-blue/hazel-wm/"
										text="Lua-driven Wayland compositor."
									/>
								</ProjectList>
							</Stack>
							<Stack gap="xs">
								<Text inline inherit span>
									I'm maintaining:
								</Text>
								<ProjectList>
									<ProjectItem
										icon="📦"
										name="mcman"
										url="https://github.com/deniz-blue/mcman"
										text="Build tool for Minecraft servers."
									/>
									<ProjectItem
										icon="⚛️"
										name="discord-jsx-renderer"
										url="https://github.com/deniz-blue/discordjsx"
										text="React for Discord bots."
									/>
								</ProjectList>
							</Stack>
							<Stack>
								<Group gap="xs">
									<Text inline inherit span>
										I use these:
									</Text>
									<Group gap={0}>
										<Thing
											label="TypeScript"
											url="https://www.typescriptlang.org/"
											icon="https://www.typescriptlang.org/favicon-32x32.png"
										/>
										<Thing
											label="React"
											url="https://react.dev/"
											icon="https://react.dev/favicon.ico"
										/>
										<Thing
											label="Rust"
											url="https://www.rust-lang.org/"
											icon="https://www.rust-lang.org/static/logos/rust-logo-16x16.png"
										/>
										<Thing label="Vite" url="https://vite.dev/" icon="https://vite.dev/logo.svg" />
										<Thing
											label="Mantine"
											url="https://mantine.dev/"
											icon="https://mantine.dev/favicon.svg"
										/>
										<Thing
											label="Cloudflare Pages"
											url="https://pages.cloudflare.com/"
											icon="https://pages.cloudflare.com/favicon.ico"
										/>
										<Thing
											label="pnpm"
											url="https://pnpm.io/"
											icon="https://pnpm.io/img/favicon.png"
										/>
										<Thing
											label="Arch Linux"
											url="https://archlinux.org/"
											icon="https://archlinux.org/favicon.ico"
										/>
										<Thing
											label="Niri"
											url="https://niri-wm.github.io/niri/"
											icon="https://niri-wm.github.io/niri/_assets/icons/logo.svg"
										/>
									</Group>
								</Group>
								<Group gap="xs">
									<Text inline inherit span>
										I love these:
									</Text>
									<Group gap={0}>
										<Thing
											label="Figura"
											url="https://figuramc.org/"
											icon="https://figuramc.org/_app/immutable/assets/transparent.968a8a0e.gif"
										/>
										<Thing
											label="OneShot"
											url="https://futurecatgames.itch.io/oneshot"
											icon={sun}
										/>
										<Thing
											label="DELTARUNE"
											url="https://deltarune.com/"
											icon="https://deltarune.com/favicon.ico"
										/>
										<Thing label="Minecraft" url="https://minecraft.wiki/" icon={minecraft} />
										<Thing label="osu!" url="https://osu.ppy.sh/" icon={osu} />
										<Thing label="Celeste" url="https://celeste.ink/" icon={blueheart} />
										<Thing
											url="https://modrinth.com/mod/create"
											label="Create"
											icon="https://cdn.modrinth.com/data/LNytGWDc/61d716699bcf1ec42ed4926a9e1c7311be6087e2_96.webp"
										/>
									</Group>
								</Group>
							</Stack>
							<Stack gap={0}>
								<Group gap="xs">
									<Text inline inherit span>
										Follow me on:
									</Text>
									<Group gap={0}>
										<Thing
											label="GitHub"
											url="https://github.com/deniz-blue"
											icon="https://github.githubassets.com/favicons/favicon-dark.svg"
										/>
										<Thing
											label="BlueSky"
											url="https://bsky.app/profile/deniz.blue"
											icon="https://web-cdn.bsky.app/static/favicon-16x16.png"
										/>
									</Group>
								</Group>
								<Group gap="xs">
									<Text inline inherit span>
										Contact me via:
									</Text>
									<Group gap={0}>
										<Thing label="Email" url="mailto:deniz@deniz.blue" emoji="📧" />
										<Thing
											label="Discord"
											url="https://deniz.blue/discord-invite/?id=1197520507617153064"
											icon="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/62fddf0fde45a8baedcc7ee5_847541504914fd33810e70a0ea73177e%20(2)-1.png"
										/>
										<Thing
											label="Matrix"
											url="https://matrix.to/#/@deniz:catgirl.cloud"
											icon="https://matrix.org/assets/favicon.svg"
										/>
									</Group>
								</Group>
							</Stack>
							<Stack gap={0}>
								<Group gap="xs">
									<Group gap={0}>
										<Thing
											label="This user is a Therian"
											url="https://en.wikipedia.org/wiki/Therian_subculture"
											icon="https://raw.githubusercontent.com/deniz-blue/md-emojis/refs/heads/main/emojis/identity/thetadelta-white.svg"
										/>
										<Thing
											label="This user is a System"
											url="https://morethanone.info"
											icon={pluralring}
										/>
										<Thing
											label="This user is Transgender"
											url="https://en.wikipedia.org/wiki/Transgender"
											icon="🏳️‍⚧️"
										/>
									</Group>
								</Group>
								<Text c="#ffffff1a">Be kind, for everyone you meet is fighting a harder battle.</Text>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
};

export const ProjectList = ({ children }: PropsWithChildren) => {
	return (
		<Stack
			component="ul"
			fz="sm"
			gap="xs"
			style={{ listStyle: "none", paddingInlineStart: 0, margin: 0 }}
		>
			{children}
		</Stack>
	);
};

export const ProjectItem = ({
	icon,
	name,
	url,
	text,
}: {
	name: string;
	url?: string;
	icon: string;
	text: string;
}) => {
	return (
		<Group component="li" gap={0}>
			<Anchor c="unset" inline inherit href={url} target="_blank" rel="noopener noreferrer">
				<Text inline inherit span mr={4} aria-hidden>
					{icon}
				</Text>
				<Text inline inherit span fw="bold">
					{name}
				</Text>
			</Anchor>
			<Text inline inherit span>
				:{" "}
			</Text>
			<Text inline inherit span ml={4} c="dimmed">
				{text}
			</Text>
		</Group>
	);
};
