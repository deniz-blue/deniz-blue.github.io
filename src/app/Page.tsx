import { Anchor, Box, Container, Group, Stack, Text, Title } from "@mantine/core";
import { Thing } from "../components/Thing";
import { PropsWithChildren } from "react";
import sun from "./sun.png";
import pluralring from "./pluralring.png";
import minecraft from "./minecraft.webp";
import osu from "./osu.png";
import blueheart from "./blueheart.gif";
import typescript from "./typescript.png";
import react from "./react.ico";
import rust from "./rust.png";
import vite from "./vite.svg";
import mantine from "./mantine.svg";
import pages from "./pages.ico";
import pnpm from "./pnpm.png";
import arch from "./arch.ico";
import niri from "./niri.svg";
import figura from "./figura.gif";
import create from "./create.webp";
import deltarune from "./deltarune.ico";
import github from "./github.svg";
import bsky from "./bsky.png";
import discord from "./discord.png";
import matrix from "./matrix.svg";
import therian from "./therian.svg";

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
											icon={typescript}
										/>
										<Thing label="React" url="https://react.dev/" icon={react} />
										<Thing label="Rust" url="https://www.rust-lang.org/" icon={rust} />
										<Thing label="Vite" url="https://vite.dev/" icon={vite} />
										<Thing label="Mantine" url="https://mantine.dev/" icon={mantine} />
										<Thing
											label="Cloudflare Pages"
											url="https://pages.cloudflare.com/"
											icon={pages}
										/>
										<Thing label="pnpm" url="https://pnpm.io/" icon={pnpm} />
										<Thing label="Arch Linux" url="https://archlinux.org/" icon={arch} />
										<Thing label="Niri" url="https://niri-wm.github.io/niri/" icon={niri} />
									</Group>
								</Group>
								<Group gap="xs">
									<Text inline inherit span>
										I love these:
									</Text>
									<Group gap={0}>
										<Thing label="Figura" url="https://figuramc.org/" icon={figura} />
										<Thing
											label="OneShot"
											url="https://futurecatgames.itch.io/oneshot"
											icon={sun}
										/>
										<Thing label="DELTARUNE" url="https://deltarune.com/" icon={deltarune} />
										<Thing label="Minecraft" url="https://minecraft.wiki/" icon={minecraft} />
										<Thing label="osu!" url="https://osu.ppy.sh/" icon={osu} />
										<Thing label="Celeste" url="https://celeste.ink/" icon={blueheart} />
										<Thing url="https://modrinth.com/mod/create" label="Create" icon={create} />
									</Group>
								</Group>
							</Stack>
							<Stack gap={0}>
								<Group gap="xs">
									<Text inline inherit span>
										Follow me on:
									</Text>
									<Group gap={0}>
										<Thing label="GitHub" url="https://github.com/deniz-blue" icon={github} />
										<Thing label="BlueSky" url="https://bsky.app/profile/deniz.blue" icon={bsky} />
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
											icon={discord}
										/>
										<Thing
											label="Matrix"
											url="https://matrix.to/#/@deniz:catgirl.cloud"
											icon={matrix}
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
											icon={therian}
										/>
										<Thing
											label="This user is a System"
											url="https://morethanone.info"
											icon={pluralring}
										/>
										<Thing
											label="This user is Transgender"
											url="https://en.wikipedia.org/wiki/Transgender"
											emoji="🏳️‍⚧️"
										/>
									</Group>
								</Group>
								<Text c="#ffffff1a">
									Be kind, for everyone you meet is fighting a harder battle.
								</Text>
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
