import { Accordion, Box, Collapse, Group, Loader, Paper, Space, Stack, Text, Transition } from "@mantine/core";
import { MeName } from "../pamphlet/PamphletHeader";
import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons-react";
import { CosplayWebring } from "../pamphlet/webring/CosplayWebring";
import { ProjectListV2 } from "./ProjectListV2";
import { Badges } from "../pamphlet/badges/Badges";
import { LastFMTrackCard, useLastFMNowPlaying } from "../parts/NowPlayingLastFM";
import { useBackgroundStore } from "../../background/PageBackground";
import { ProjectButtonSection } from "./ProjectButtonSection";
import { BackgroundSwitcher } from "../controls/BackgroundSwitcher";
import { OneShotSun } from "../parts/OneShotSun";
import { useEffect } from "react";
import { CustomAccordion } from "./CustomAccordion";

export const PamphletV2 = () => {
	const background = useBackgroundStore(store => store.background);

	useEffect(() => {
		useBackgroundStore.getState().setBackground({ type: "sanctuary", data: {} });
	}, []);

	return (
		<Stack
			mih="100dvh"
			align="center"
		>
			<Stack
				gap={4}
				align="center"
				pb="7rem"
				className={["winter", "starfield", "aurora", "refuge"].includes(background.type) ? "frost" : ""}
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
					<Collapse in={background.type == "oneshot"}>
						<Box mt="xl">
							<OneShotSun />
						</Box>
					</Collapse>

					<Paper fw="bold" px="xl" py={4} className="frost" my="1rem">
						<MeName />
					</Paper>

					<Accordion unstyled loop={false} w="100%">
						<Stack w="100%">
							<Stack gap={4} align="center">
								<Text inline fw="bold" fz="xs">
									LINKS
								</Text>
								<CustomAccordion
									id="x:github"
									link="https://github.com/deniz-blue"
									title="GitHub"
									icon={<IconBrandGithub size={16} />}
								>
									Check out my repositories!
								</CustomAccordion>
								<CustomAccordion
									id="x:discord"
									link="https://deniz.blue/discord-invite?id=1197520507617153064"
									title="Discord Server"
									icon={<IconBrandDiscord size={16} />}
								>
									For support about my projects!
								</CustomAccordion>
							</Stack>

							<Stack gap={4} align="center">
								<Text inline fw="bold" fz="xs">
									THEME
								</Text>
								<BackgroundSwitcher />
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

							<Stack gap={4} align="center">
								<Text inline fw="bold" fz="xs">
									RANDOM LINKS
								</Text>
								<ProjectButtonSection
									project={{
										id: "x:rest.wiki",
										name: "rest.wiki",
										desc: "Static OpenAPI viewer",
										link: "https://rest.wiki",
									}}
								/>
								<ProjectButtonSection
									project={{
										id: "x:vert.sh",
										name: "vert.sh",
										desc: "File Converter (Images, Audio, Video, Documents)",
										link: "https://vert.sh",
									}}
								/>
								<ProjectButtonSection
									project={{
										id: "x:cobalt.tools",
										name: "cobalt.tools",
										desc: "Media downloader",
										link: "https://cobalt.tools",
									}}
								/>
							</Stack>

							<Text c="dimmed" ta="center" inline span fz="xs" fs="italic">
								don't forget
								<br />
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
				<Group gap={0} align="center" wrap="nowrap">
					<Text inline fw="bold" fz="xs">
						LISTENING TO
					</Text>
					<Transition mounted={loading} transition="scale-x" duration={200}>
						{(styles) => (
							<Loader style={styles} ml={4} size="12px" />
						)}
					</Transition>
				</Group>
				<Stack w="100%">
					{track && (
						<LastFMTrackCard
							track={track}
						/>
					)}
				</Stack>
			</Stack>
		</Collapse>
	)
}
