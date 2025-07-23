import { ProjectButton } from "~/types";
import { match } from "@alan404/enum";
import { Button } from "@mantine/core";
import { IconBook2, IconBrandGithub, IconBrandNpm, IconExternalLink, IconProps } from "@tabler/icons-react";
import React from "react";

export const ProjectButtonComponent = ({
    button,
    projectName,
}: {
    button: ProjectButton;
    projectName?: string;
}) => {
    let href = match(button)({
        website: (v) => v,
        docs: (v) => v,
        repo: (repo) => `https://github.com/${repo}`,
        npm: (pkg) => `https://www.npmjs.com/package/${pkg}`,
    }) as string;

    let Icon = match(button)({
        website: () => IconExternalLink,
        repo: () => IconBrandGithub,
        npm: () => IconBrandNpm,
        docs: () => IconBook2,
    }) as React.ComponentType<IconProps>;

    let label = match(button)({
        website: () => `Open ${projectName || "Project"}`,
        docs: () => "View Documentation",
        npm: (p) => p,
        repo: () => `View Repository`,
    }) as string;

    return (
        <Button
            variant="light"
            component="a"
            color="gray"
            href={href}
            target="_blank"
            leftSection={<Icon />}
        >
            {label}
        </Button>
    )
};
