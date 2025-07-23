import { Localized } from "@alan404/react-localization";
import { Divider, Stack } from "@mantine/core"
import { DataProjects } from "../../../../../data";
import { ProjectCard } from "../../project/ProjectCard";

export const Projects = () => {
    return (
        <Stack align="center" w="100%" px="sm">
            <Divider
                label={(
                    <Localized
                        tr="Projelerim"
                        en="Projects"
                    />
                )}
                w="80%"
            />

            <Stack>
                {Object.values(DataProjects).filter(x => !x.data.hide).map(({ data }) => (
                    <ProjectCard
                        value={data}
                    />
                ))}
            </Stack>
        </Stack>
    );
}
