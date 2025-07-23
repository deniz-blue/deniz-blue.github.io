import { Project } from "~/types";
import { Alert, Code, Group, Stack, Text, TypographyStylesProvider } from "@mantine/core";
import { ProjectButtonComponent } from "./ProjectButtonComponent";
import { CodeHighlight, InlineCodeHighlight } from "@mantine/code-highlight";
import { ImageWithLoader } from "../../ui/ImageWithLoader";
import { Link } from "react-router";

const components = {
    p: Text,
    a: (props: any) => <Link {...props} to={props.href} target={props.href.startsWith("/") ? undefined : "_blank"} />,
    code: (props: any) => {
        return (
            props.className ? (
                <CodeHighlight
                    code={props.children}
                    language={props.className.split("-")[1]}
                />
            ) : (
                <InlineCodeHighlight
                    code={props.children}
                />
            )
        )
    },
    img: ImageWithLoader,
    Alert,
    Group,
    Stack,
};

export const ProjectContent = ({
    p,
}: {
    p: Project;
}) => {
    const projectButtons = p.buttons.map((button, i) => (
        <ProjectButtonComponent button={button} projectName={p.name} key={i} />
    ));

    const projectButtonsSection = (
        <>
            <Group grow visibleFrom="sm">
                {projectButtons}
            </Group>
            <Stack hiddenFrom="sm">
                {projectButtons}
            </Stack>
        </>
    );

    return (
        <Stack>
            {projectButtonsSection}

            <Stack gap="sm">
                <p.default components={components} />
            </Stack>
        </Stack>
    );
};
