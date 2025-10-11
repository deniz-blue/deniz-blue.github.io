export const PROJECTS_URL = "https://raw.githubusercontent.com/deniz-blue/deniz-blue/refs/heads/main/projects.json";

export interface ProjectsJSON {
    state: ProjectsState
    list: ProjectJSONItem[]
}

export interface ProjectsState {
    featured: string[]
    developing: string[]
}

export interface ProjectJSONItem {
    id: string
    emoji?: string
    name?: string
    desc?: string
    tags?: string[]
    link?: string
    website?: string
    iconURL?: string
    repo?: string
    npm?: string
}

export const fetchProjectsJSON = async () => {
    const res = await fetch(PROJECTS_URL);
    const json = await res.json();

    return json as ProjectsJSON;
};
