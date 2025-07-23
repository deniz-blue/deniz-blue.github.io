import { Tech } from "~/types";
import { Tooltip } from "@mantine/core";
import { IconBrandCss3, IconBrandMongodb, IconBrandNextjs, IconBrandNodejs, IconBrandPrisma, IconBrandRust, IconBrandVite, IconProps } from "@tabler/icons-react";
import { IconBrandHtml5, IconBrandJavascript, IconBrandTypescript } from "@tabler/icons-react";
import { IconBrandCSharp, IconBrandReact } from "@tabler/icons-react";
import React from "react";

const TechMap: Record<Tech, [string, React.ComponentType<IconProps>]> = {
    cs: ["C#", IconBrandCSharp],
    react: ["React", IconBrandReact],
    ts: ["TypeScript", IconBrandTypescript],
    js: ["JavaScript", IconBrandJavascript],
    html: ["HTML", IconBrandHtml5],
    css: ["CSS", IconBrandCss3],
    rust: ["Rust", IconBrandRust],
    nextjs: ["Next.js", IconBrandNextjs],
    vite: ["Vite", IconBrandVite],
    nodejs: ["NodeJS", IconBrandNodejs],
    mongodb: ["MongoDB", IconBrandMongodb],
    prisma: ["Prisma", IconBrandPrisma],
};

export const TechPart = ({ tech }: { tech: Tech }) => {
    const [label, Icon] = TechMap[tech];

    return (
        <Tooltip label={label} withArrow>
            <Icon />
        </Tooltip>
    )
};
