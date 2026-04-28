import { TablerIcon } from "@tabler/icons-react"
import { Anchor, Box, Divider, Group, Image, List, Stack, Text, Tooltip } from "@mantine/core";
import { useDynamic } from "../../../../hooks/useDynamic";
import { useEffect, useState } from "react";

export const IconsGroup = ({
	data,
}: {
	data: [TablerIcon, string][];
}) => {
	return (
		<Group justify="center" gap={0}>
			{data.map(([Icon, tooltip], i) => (
				<Tooltip label={tooltip} disabled={!tooltip} key={i}>
					<Icon />
				</Tooltip>
			))}
		</Group>
	);
};

export const TimezoneSection = () => {
	const [time, setTime] = useState("??:??");

	const timeZone = "Europe/Vilnius"; // UTC+2 or +3 with DST

	useEffect(() => {
		const upd = () => {
			const now = new Date();
			const timeString = new Intl.DateTimeFormat("en", {
				timeZone,
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			}).format(now);
			setTime(timeString);
		};

		const interval = setInterval(upd, 5 * 1000);
		upd();
		return () => clearInterval(interval);
	}, []);

	// "+3" or "+2" depending on DST
	const targetOffsetString = new Date()
		.toLocaleString("en-US", { timeZone, timeZoneName: "short" })
		.split(" ")
		.pop()
		?.replace("GMT", "");

	const relativity = useDynamic(() => {
		const targetOffset = parseInt(targetOffsetString || "+0") * 60; // in minutes
		const diff = (-new Date().getTimezoneOffset()) - targetOffset;

		if (diff === 0) return "in the same timezone as me";

		const hours = Math.floor(Math.abs(diff) / 60);
		const mins = Math.abs(diff) % 60;

		const timeStr = [
			hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "",
			mins > 0 ? `${mins} minute${mins > 1 ? "s" : ""}` : ""
		].filter(Boolean).join(" and ");

		return diff > 0
			? `${timeStr} ahead of me`
			: `${timeStr} behind me`;
	});

	return (
		<Text span inherit>
			My timezone is <Text span inline inherit fw="bold" c="blue">UTC+3</Text> and it's currently <Text span inline inherit fw="bold" c="blue">
				{time}
			</Text> here. You are <Text inline inherit span fw="bold">
				{relativity || "<loading>"}
			</Text>!
		</Text>
	);
};

export const FanOf = ({
	href,
	name,
	icon,
	...props
}: Anchor.Props & {
	href: string;
	name: string;
	icon: string;
}) => {
	return (
		<Anchor
			inherit
			inline
			href={href}
			target="_blank"
			c="unset"
			style={{ textWrap: "nowrap" }}
			{...props}
		>
			<Image
				src={icon}
				h="1rem"
				w="1rem"
				display="inline"
				style={{ imageRendering: "auto", verticalAlign: "middle" }}
			/> <Text span inherit inline>
				{name}
			</Text>
		</Anchor>
	);
};

export const AboutMe = () => {
	return (
		<Stack gap="xs">
			<Text span inherit>
				Hi, I'm <Tooltip label="Turkish word for 'Sea', be creative, do puns!">
					<Text span inline inherit c="blue" fw="bold">Deniz 🌸</Text>
				</Tooltip>! Welcome to my little website. I'm a <FanOf
					name="therian"
					href="https://en.wikipedia.org/wiki/Therian_subculture"
					icon="https://raw.githubusercontent.com/deniz-blue/md-emojis/refs/heads/main/emojis/identity/thetadelta-white.svg"
					fw="bold"
				/> <Text span inline inherit fw="bold">
					software developer
				</Text> who loves to code things <Text span inline inherit fw="bold" ff="sans">:3</Text>
			</Text>

			<TimezoneSection />

			<Text span inherit>
				If you want to contact me, you can find me on <FanOf
					name="GitHub"
					href="https://github.com"
					icon="https://github.githubassets.com/favicons/favicon.svg"
					fw="bold"
				/>, <FanOf
					name="Discord"
					href="https://discord.com/users/708532414098856961"
					icon="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/62fddf0fde45a8baedcc7ee5_847541504914fd33810e70a0ea73177e%20(2)-1.png"
					fw="bold"
				/>, <FanOf
					name="Matrix"
					href="https://matrix.to/#/@deniz:catgirl.cloud"
					icon="https://matrix.org/assets/favicon.svg"
					fw="bold"
				/> or <FanOf
					name="Bluesky"
					href="https://bsky.app/profile/deniz.blue"
					icon="https://web-cdn.bsky.app/static/favicon-16x16.png"
					fw="bold"
				/>.
			</Text>

			<Divider my="sm" label="SETUP" />

			<Text span inherit>
				I use <FanOf
					name="Arch"
					href="https://archlinux.org"
					icon="https://archlinux.org/favicon.ico"
					fw="bold"
				/> btw. My system hasn't broken down yet. I use a <Text inline span fw="bold">
					Lenovo ThinkPad
				</Text> laptop to do everything. I also use <FanOf
					name="Niri"
					href="https://niri-wm.github.io/niri/"
					icon="https://niri-wm.github.io/niri/_assets/icons/logo.svg"
					fw="bold"
				/> as my window manager.
			</Text>

			{/* <Text span inherit>
				I can speak <Text span inline inherit fw="bold">
					🇬🇧 English
				</Text> and <Text span inline inherit fw="bold">
					🇹🇷 Turkish
				</Text>, and I'm learning <Text span inline inherit fw="bold">
					🇱🇹 Lithuanian
				</Text>.
			</Text> */}

			<Divider my="sm" label="INTERESTS" />

			<Text span inherit>
				I like a lot of things, such as:
			</Text>

			<List icon={<Box display="none" />} center>
				<List.Item>
					<FanOf
						href="https://www.minecraft.net"
						name="Minecraft"
						icon="/assets/img/ico/minecraft.webp"
					/>
					<List icon={<Box display="none" />} center pl="0.7em">
						<List.Item>
							<FanOf
								href="https://modrinth.com/mod/create"
								name="Create"
								icon="https://cdn.modrinth.com/data/LNytGWDc/61d716699bcf1ec42ed4926a9e1c7311be6087e2_96.webp"
							/>
						</List.Item>
						<List.Item>
							<FanOf
								href="https://figuramc.org/"
								name="Figura"
								icon="https://figuramc.org/_app/immutable/assets/transparent.968a8a0e.gif"
							/>
						</List.Item>
					</List>
				</List.Item>
				<List.Item>
					<FanOf
						href="https://deltarune.com"
						name="Deltarune"
						icon="https://deltarune.com/favicon.ico"
					/>
				</List.Item>
				<List.Item>
					<FanOf
						name="OneShot"
						href="https://futurecatgames.itch.io/oneshot"
						icon="/assets/img/detail/oneshot/item_start_lightbulb.png"
					/>
				</List.Item>
				<List.Item>
					<FanOf
						name="Celeste"
						href="https://www.celestegame.com"
						icon="https://www.celestegame.com/images/ico.png"
					/>
				</List.Item>
				<List.Item>
					<FanOf
						href="https://osu.ppy.sh"
						name="osu!"
						icon="/assets/img/ico/osu.png"
					/>
				</List.Item>
			</List>

			<Text span inherit>
				The background of this website is a recreation of Celeste Chapter 9's background.
			</Text>

			<Divider my="sm" label="USES" />

			<Text span inherit>
				My websites use <FanOf
					name="Mantine"
					href="https://mantine.dev"
					icon="https://mantine.dev/favicon.svg"
					fw="bold"
				/>.
			</Text>

			<Text span inherit>
				I mainly use <FanOf
					name="Vite"
					href="https://vite.dev"
					icon="https://vite.dev/logo-without-border.svg"
					fw="bold"
				/>, <FanOf
					name="TypeScript"
					href="https://www.typescriptlang.org"
					icon="https://www.typescriptlang.org/favicon-32x32.png"
					fw="bold"
				/>, and <FanOf
					name="React"
					href="https://react.dev"
					icon="https://react.dev/favicon.ico"
					fw="bold"
				/>. I like using <FanOf
					name="Cloudflare Pages"
					href="https://pages.cloudflare.com"
					icon="https://pages.cloudflare.com/favicon.ico"
					fw="bold"
				/> for hosting my static sites. <FanOf
					name="pnpm"
					href="https://pnpm.io"
					icon="https://pnpm.io/img/favicon.png"
					fw="bold"
				/> is my package manager of choice.
			</Text>

			<Text span inherit>
				I've also worked with <FanOf
					name="Rust"
					href="https://www.rust-lang.org"
					icon="https://www.rust-lang.org/static/logos/rust-logo-16x16.png"
					fw="bold"
				/> before and I hope I use it again in the future!
			</Text>
		</Stack>
	);
};
