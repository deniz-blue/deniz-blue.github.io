declare module "virtual:projects" {
	export const projects: Projects;

	export interface Projects {
		state: ProjectsState
		list: Project[]
	}

	export interface ProjectsState {
		featured: string[]
		developing: string[]
	}

	export interface Project {
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
}
