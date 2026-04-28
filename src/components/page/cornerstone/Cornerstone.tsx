import { Collapse, Container, Group, Loader, Paper, Space, Stack, Tabs, Text, Title } from "@mantine/core";
import { AboutMe } from "./about/AboutMe";
import { useListeningToStore } from "../../../stores/useListeningToStore";
import { TrackMetadataCard } from "./about/TrackMetadataCard";
import { CosplayWebring } from "./other/CosplayWebring";
import { Badges } from "./other/badges/Badges";
import { projects } from "virtual:projects";
import { ProjectCard } from "./projects/ProjectCard";
import classes from "./cornerstone.module.css";

export const Cornerstone = () => {
	return (
		<Stack h="100%" w="100%" px="xl" className={classes.container}>
			<Stack
				w={((88 * 3) + (4 * 2)) + 24 * 2}
				px="md"
				pt="xl"
				className={classes.column}
				h="100%"
				mih="100dvh"
			>
				<Tabs defaultValue="about" variant="pills">
					<Stack>
						<Group justify="center">
							<Title className={classes.name} fz="h2">
								deniz.blue
							</Title>
						</Group>

						<Paper
							pos="sticky"
							top="var(--mantine-spacing-xl)"
							bg="var(--mantine-color-dark-light)"
							style={{ zIndex: 5 }}
							shadow="md"
						>
							<Tabs.List grow>
								<Tabs.Tab value="about">About</Tabs.Tab>
								<Tabs.Tab value="projects">Projects</Tabs.Tab>
								<Tabs.Tab value="other">Other</Tabs.Tab>
							</Tabs.List>
						</Paper>


						<Tabs.Panel value="about">
							<Stack>
								<AboutMe />
								<ListeningToSection />
							</Stack>
						</Tabs.Panel>

						<Tabs.Panel value="projects">
							<Stack>
								<Text span inherit>
									Here are a list of some of my projects. Feel free to poke around!
								</Text>

								{projects.list.filter(x => !x.tags?.includes("archived") && !x.tags?.includes("status:wip")).map(project => (
									<ProjectCard project={project} key={project.id} />
								))}
							</Stack>
						</Tabs.Panel>

						<Tabs.Panel value="other">
							<Stack>
								<CosplayWebring />
								<Badges />
							</Stack>
						</Tabs.Panel>
					</Stack>
				</Tabs>

				<Space h="10rem" />
			</Stack>
		</Stack>
	)
};

export const ListeningToSection = () => {
	const { track } = useListeningToStore();

	return (
		<Collapse expanded={!!track} w="100%">
			<Stack gap={4} align="center" w="100%">
				<Text c="dimmed" inline span fz="sm">
					Currently listening to
				</Text>
				<Stack w="100%">
					{track && (
						<TrackMetadataCard track={track} />
					)}
				</Stack>
			</Stack>
		</Collapse>
	)
}
