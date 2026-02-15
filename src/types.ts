import { createFactory, Enum } from "@alan404/enum";
import { ReactNode } from "react";

export type BlogPost = {
    id: string;
    title: string;
    description: string;
    date: string;
    default: React.ComponentType<any>;
};

export type Art = {
    src: string;
    author: {
        name: string;
        link: string;
    };
    subtitle?: React.ReactNode;
    aspectRatio: number;
};

export type NavItem = {
    type: "link";
    path: string;
    label: ReactNode;
    icon?: ReactNode;
    description?: ReactNode;
    children?: NavItem[];
} | {
    type: "title";
    title: string;
} | {
    type: "divider";
    text: string;
};

export interface Project {
    id: string;
    primaryImage?: string;
    name: string;
    shortDesc: string;
    year: string;
    types: ProjectType[];
    tech: Tech[];
    buttons: ProjectButton[];
    status?: ProjectStatus;
    default: React.ComponentType<any>;
    hide?: boolean;
}

export type ProjectStatus = "up" | "ok" | "wip" | "archive";
export type Tech = "rust" | "react" | "cs" | "js" | "ts" | "html" | "css" | "vite" | "nextjs" | "nodejs" | "mongodb" | "prisma";
export type ProjectType = "library" | "website" | "restapi" | "desktop" | "cli" | "mobile";

export const ProjectButton = createFactory<ProjectButton>();
export type ProjectButton = Enum<{
    website: string;
    docs: string;
    repo: string;
    npm: string;
}>;

export const project = (p: Omit<Project, "default">) => p;
export const blog = (b: Omit<BlogPost, "default">) => b;
