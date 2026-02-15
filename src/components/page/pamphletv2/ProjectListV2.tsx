import { Stack } from "@mantine/core";
import { ProjectButtonSection } from "./ProjectButtonSection";
import { projects } from "virtual:projects";

export const ProjectListV2 = () => {
	return (
		<Stack gap={4} align="center" w="100%">
			{projects.list.filter(x => !x.tags?.includes("archived") && !x.tags?.includes("status:wip")).map(project => (
				<ProjectButtonSection project={project} key={project.id} />
			))}
		</Stack>
	)
};
