import { IconBrandAuth0, IconBrandCSharp, IconBrandCss3, IconBrandDocker, IconBrandFirefox, IconBrandGit, IconBrandHtml5, IconBrandJavascript, IconBrandMongodb, IconBrandNodejs, IconBrandPrisma, IconBrandVite, IconBrandVscode, TablerIcon } from "@tabler/icons-react"
import { Box, Divider, Group, Stack, Text, Tooltip } from "@mantine/core"
import { IconBrandTypescript } from "@tabler/icons-react"
import { IconBrandRust } from "@tabler/icons-react"
import { IconBrandReact } from "@tabler/icons-react"
import { IconBrandGithub } from "@tabler/icons-react"
import { Localized } from "@alan404/react-localization"

export const StuffIUse = () => {
    return (
        <Stack align="center" w="100%" px="sm">
            <Divider
                label={(
                    <Localized
                        en="Stuff I Use"
                        tr="Kullandığım Şeyler"
                    />
                )}
                w="80%"
            />

            <Stack gap={0}>
                <IconsGroup
                    data={[
                        [IconBrandTypescript, "TypeScript"],
                        [IconBrandReact, "React"],
                        [IconBrandCSharp, ".NET 5-8"],
                        [IconBrandHtml5, "HTML"],
                        [IconBrandCss3, "CSS"],
                        [IconBrandJavascript, "JavaScript"],
                        [IconBrandRust, "Rust"],
                    ]}
                />

                <Group align="center" gap={8}>
                    <IconsGroup
                        data={[
                            [IconBrandVite, "Vite"],
                            [IconBrandMongodb, "MongoDB"],
                            [IconBrandPrisma, "Prisma ORM"],
                            [IconBrandAuth0, "Auth0"],
                            [IconBrandNodejs, "NodeJS"],
                        ]}
                    />

                    <Text inline span h={24} c="dimmed">•</Text>

                    <IconsGroup
                        data={[
                            [IconBrandFirefox, "Firefox"],
                            [IconBrandVscode, "vscode"],
                            [IconBrandGit, "Git"],
                            [IconBrandGithub, "Github"],
                            [IconBrandDocker, "Docker"],
                        ]}
                    />
                </Group>
            </Stack>
        </Stack>
    );
}


export const IconsGroup = ({
    data,
}: {
    data: [TablerIcon, string][];
}) => {
    return (
        <Group justify="center" gap={0}>
            {data.map(([Icon, tooltip], i) => (
                <Tooltip label={tooltip} disabled={!tooltip} key={i}>
                    <Box>
                        <Icon />
                    </Box>
                </Tooltip>
            ))}
        </Group>
    );
};

