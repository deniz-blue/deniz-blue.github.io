import { create } from "zustand";
import { ProjectsJSON } from "../utils/fetch-projects";

export const useProjectJSON = create<{
    data: ProjectsJSON;
}>((set, get) => ({
    data: { list: [], state: { featured: [], developing: [] } } as ProjectsJSON,
}))
