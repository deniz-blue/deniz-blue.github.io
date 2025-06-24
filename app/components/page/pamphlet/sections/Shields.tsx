import { Group, Stack } from "@mantine/core";

export const Shields = () => {
    const labelColor = "rgba(37, 38, 43, 0.15)";
    const c = (x: object) => "&" + new URLSearchParams(Object.entries(x));

    const shields: {
        src: string;
        link?: string;
    }[] = [
            {
                src: "https://img.shields.io/discord/1197520507617153064?logo=discord" + c({
                    labelColor,
                    color: "rgba(64, 192, 87, 0.15)",
                }),
                link: "https://deniz.blue/discord-invite?id=1197520507617153064",
            },
            {
                src: "https://img.shields.io/github/sponsors/deniz-blue?style=flat&logo=github" + c({
                    labelColor,
                    color: "rgba(34, 139, 230, 0.15)",
                }),
                link: "https://github.com/sponsors/deniz-blue/",
            },
            {
                src: "https://img.shields.io/github/followers/deniz-blue?style=flat&logo=github" + c({
                    labelColor,
                    color: "rgba(34, 139, 230, 0.15)",
                }),
                link: "https://github.com/deniz-blue",
            },
        ];

    return (
        <Stack w="100%" align="center">
            <Group gap={4}>
                {shields.map(({ src, link }) => {
                    const img = <img
                        src={src}
                        key={src}
                    />

                    if (!link) return img;

                    return (
                        <a href={link} target="_blank" key={src}>
                            {img}
                        </a>
                    );
                })}
            </Group>
        </Stack>
    )
};
