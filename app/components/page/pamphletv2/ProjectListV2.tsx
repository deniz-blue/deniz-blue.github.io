import { Accordion, Stack, Text } from "@mantine/core";
import { useProjectJSON } from "../../../stores/useProjectJSON";
import { ProjectJSONItem } from "../../../utils/fetch-projects";
import { ProjectButtonSection } from "./ProjectButtonSection";

export const ProjectListV2 = () => {
    const data = useProjectJSON(store => store.data);

    let list: ProjectJSONItem[] = data.list.slice();

    const pick = (filter: (item: ProjectJSONItem) => boolean | undefined) => {
        let picked = list.filter(filter);
        list = list.filter(x => !picked.includes(x));
        return picked;
    };

    const makeFilter = ({
        include,
        exclude
    }: {
        include?: string[];
        exclude?: string[];
    }) => {
        return (item: ProjectJSONItem) => {
            return (
                include ? include.every(tag => item.tags?.includes(tag)) : true
            ) && (
                    exclude ? exclude.every(tag => !item.tags?.includes(tag)) : true
                )
        };
    };

    let categories: { name: string; items: ProjectJSONItem[] }[] = [];

    // categories.push({
    //     name: "WEBSITES",
    //     items: pick(makeFilter({ include: ["website"], exclude: ["archived"] }))
    // });

    // categories.push({
    //     name: "PROJECTS",
    //     items: pick(makeFilter({ exclude: ["archived", "library"] }))
    // });

    // categories.push({
    //     name: "LIBRARIES",
    //     items: pick(makeFilter({ include: ["library"], exclude: ["archived"] }))
    // });

	categories.push({
		name: "PROJECTS",
		items: list.filter(x => !x.tags?.includes("archived")),
	});

    return (
        <Stack w="100%">
            {categories.map(category => (
                <Stack
                    w="100%"
                    gap={4}
                    align="center"
                    key={category.name}
                >
                    <Text inline fw="bold" fz="xs">
                        {category.name}
                    </Text>

                    {category.items.map(project => (
                        <ProjectButtonSection
                            project={project}
                            key={project.id}
                        />
                    ))}
                </Stack>
            ))}
        </Stack>
    )
};
