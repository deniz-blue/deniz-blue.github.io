import { Box, Button, Card, Group, Image, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconExternalLink, IconFolder, IconPackage, IconWorld } from "@tabler/icons-react";
import { Project } from "virtual:projects";

export const ProjectCard = ({
	project,
}: {
	project: Project;
}) => {
	let icon: React.ReactNode = <IconFolder />;
	if (project.tags?.includes("library")) icon = <IconPackage />;
	if (project.tags?.includes("website")) icon = <IconWorld />;
	if (project.iconURL) icon = (
		<Image
			style={{ fill: "white", display: "block" }}
			src={project.iconURL}
			height={24}
			width={24}
			w={24}
			h={24}
		/>
	);

	const ProjectButton = ({ text, href }: { text: string; href?: string; }) => {
		if (!href) return null;

		return (
			<Button
				size="compact-sm"
				rightSection={<IconExternalLink size={16} />}
				component="a"
				href={href}
				target="_blank"
				variant="light"
				fullWidth
			>
				{text}
			</Button>
		);
	};

	return (
		<Paper
			bg="var(--mantine-color-gray-light)"
			p={4}
		>
			<Stack gap={4}>
				<Stack p={4} gap="sm">
					<Group gap={4} c="var(--mantine-color-violet-light-color)" wrap="nowrap">
						{icon}
						<Text>{project.name || project.id}</Text>
					</Group>

					<Box>
						<Text fz="sm" c="var(--mantine-color-text)">
							{project.desc}
						</Text>
					</Box>

					<SimpleGrid cols={2} spacing={4} verticalSpacing={4}>
						{project.link && ![
							project.npm,
							project.repo,
							project.website,
						].some(x => x == project.link) && (
							<ProjectButton
								text="View"
								href={project.link}
							/>
						)}

						{project.website && (
							<ProjectButton
								text="Website"
								href={project.website}
							/>
						)}

						{project.repo && (
							<ProjectButton
								text="Repository"
								href={project.repo}
							/>
						)}

						{project.npm && (
							<ProjectButton
								text="NPM"
								href={project.npm}
							/>
						)}
					</SimpleGrid>
				</Stack>
			</Stack>
		</Paper>
	);
};
