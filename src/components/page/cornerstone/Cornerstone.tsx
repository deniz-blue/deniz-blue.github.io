import { Collapse, Container, Divider, Group, Loader, Paper, Space, Stack, Tabs, Text, Title } from "@mantine/core";
import { AboutMe } from "./about/AboutMe";
import { CosplayWebring } from "./other/CosplayWebring";
import { Badges } from "./other/badges/Badges";
import { projects } from "virtual:projects";
import { ProjectCard } from "./projects/ProjectCard";
import classes from "./cornerstone.module.css";

export const Cornerstone = () => {
	return (
		<Stack h="100%" w="100%" className={classes.container}>
			<Stack
				p="xs"
				className={classes.column}
				h="100%"
				mih="100dvh"
			>
				<Stack>
					<Stack>
						<Group justify="center">
							<Title className={classes.name} fz="h2">
								deniz.blue
							</Title>
						</Group>

						<AboutMe />

						<Divider my="sm" label="PROJECTS" />

						<Stack gap="xs">
							{projects.list.filter(x => !x.tags?.includes("archived") && !x.tags?.includes("status:wip")).map(project => (
								<ProjectCard project={project} key={project.id} />
							))}
						</Stack>

						<Divider my="sm" label="WEBRING" />

						<CosplayWebring />

						<Divider my="sm" label="88x31" />

						<Badges />
					</Stack>
				</Stack>

				<Space h="10rem" />
			</Stack>
		</Stack >
	)
};


