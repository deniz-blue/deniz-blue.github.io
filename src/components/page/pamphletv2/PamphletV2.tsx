import { Accordion, Box, Collapse, Group, Loader, Paper, Space, Stack, Text, Transition } from "@mantine/core";
import { MeName } from "../pamphlet/PamphletHeader";
import { IconBrandGithub } from "@tabler/icons-react";
import { CosplayWebring } from "../pamphlet/webring/CosplayWebring";
import { ProjectListV2 } from "./ProjectListV2";
import { Badges } from "../pamphlet/badges/Badges";
import { TrackMetadataCard } from "../parts/TrackMetadataCard";
import { useBackgroundStore } from "../../background/PageBackground";
import { BackgroundSwitcher } from "../controls/BackgroundSwitcher";
import { OneShotSun } from "../parts/OneShotSun";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { CustomAccordion } from "./CustomAccordion";
import { AboutMe } from "./AboutMe";
import { useListeningToStore } from "../../../stores/useListeningToStore";

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
							<Section title="LINKS">
								<CustomAccordion
									id="x:github"
									link="https://github.com/deniz-blue"
									title="GitHub"
									icon={<IconBrandGithub title="" />}
								>
									Check out my repositories!
								</CustomAccordion>
							</Section>

							<Section title="THEME">
								<BackgroundSwitcher />
							</Section>

							<Section title="PROJECTS">
								<ProjectListV2 />
							</Section>

							<Section title="LISTENING TO">
								<ListeningToSection />
							</Section>

							<Section title="ABOUT ME">
								<AboutMe />

								<CustomAccordion
									id="x:discord"
									link="https://deniz.blue/discord-invite?id=1197520507617153064"
									title="Discord Server"
								>
									<Text span inherit>
										You can join my Discord server to talk about my or similar projects. It's not really made for general chatting, but be my guest.
									</Text>
								</CustomAccordion>
							</Section>

							<Section title="WEBRINGS">
								<CosplayWebring />
							</Section>

							<Section title="BADGES">
								<Badges />
							</Section>

							<Stack gap={4} align="center">
								<Text inline fw="bold" fz="xs">
									RANDOM LINKS
								</Text>
								<CustomAccordion
									id="x:rest.wiki"
									link="https://rest.wiki"
									title="rest.wiki"
								>
									Static OpenAPI viewer
								</CustomAccordion>
								<CustomAccordion
									id="x:vert.sh"
									link="https://vert.sh"
									title="vert.sh"
								>
									File Converter (Images, Audio, Video, Documents)
								</CustomAccordion>
								<CustomAccordion
									id="x:cobalt.tools"
									link="https://cobalt.tools"
									title="cobalt.tools"
								>
									Media downloader
								</CustomAccordion>
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

export const Section = ({
	title,
	children,
}: PropsWithChildren<{ title: ReactNode }>) => {
	return (
		<Stack gap={4} align="center">
			<Text inline fw="bold" fz="xs">
				{title}
			</Text>
			{children}
		</Stack>
	);
};

export const ListeningToSection = () => {
	const { loading, track } = useListeningToStore();

	return (
		<Stack gap={4} align="center" w="100%">
			<Collapse in={!track}>
				<Text c="dimmed" ta="center" inline span fz="xs">
					Not listening to anything
				</Text>
			</Collapse>
			<Collapse in={!!track} w="100%">
				<Stack w="100%">
					{track && (
						<TrackMetadataCard track={track} />
					)}
				</Stack>
			</Collapse>
			<Collapse in={loading}>
				<Loader />
			</Collapse>
		</Stack>
	)
}
