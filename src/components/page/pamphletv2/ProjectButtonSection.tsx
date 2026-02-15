import { Image, Text } from "@mantine/core";
import { IconBell, IconCalendar, IconChartDots3, IconDeviceGamepad2, IconFolder, IconPackage, IconSparkles, IconTool, IconWorld, TablerIcon } from "@tabler/icons-react";
import { CustomAccordion } from "./CustomAccordion";
import type { Project } from "virtual:projects";

export const ProjectButtonSection = ({
	project,
}: {
	project: Project & {
		iconOverride?: React.ReactNode;
	};
}) => {
	const iconOverrides = {
		tools: IconTool,
		ziltek: IconBell,
		alphamath: IconSparkles,
		carpanga: IconDeviceGamepad2,
		poly: IconChartDots3,
	} as Record<string, TablerIcon>;

	let icon: React.ReactNode = <IconFolder />;
	if (project.tags?.includes("library")) icon = <IconPackage />;
	if (project.tags?.includes("website")) icon = <IconWorld />;
	if (project.iconURL) icon = (
		<Image
			style={{ fill: "white" }}
			src={project.iconURL}
			height={24}
			width={24}
		/>
	);
	if (iconOverrides[project.id]) {
		const IconComponent = iconOverrides[project.id];
		icon = <IconComponent />;
	};
	if (project.iconOverride) icon = project.iconOverride;

	const isWip = project.tags?.includes("status:wip");

	return (
		<CustomAccordion
			id={project.id}
			title={(
				<Text inline span inherit c={isWip ? "dimmed" : undefined} td={isWip ? "line-through" : undefined}>
					{project.name || project.id}
				</Text>
			)}
			icon={icon}
			link={project.link}
		>
			{project.desc}
		</CustomAccordion>
	);
};
