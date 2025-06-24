import { Localized, useLanguage } from "@alan404/react-localization";
import { ActionIcon, Group, Stack, Tooltip, Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLanguage } from "@tabler/icons-react";

export const LanguagePickerButton = () => {
    const [opened, { toggle, close }] = useDisclosure();
    const { language, setLanguage, supportedLanguages } = useLanguage();

    return (
        <Stack align="end">
            <Tooltip
                label={(
                    <Localized
                        en="Language"
                        tr="Dil"
                    />
                )}
                position="left"
                withArrow
                withinPortal={false}
                keepMounted
                positionDependencies={[opened]}
            >
                <Group gap={4}>
                    <Transition
                        mounted={opened}
                        transition="fade-left"
                        keepMounted
                    >
                        {(styles) => (
                            <Group gap={4} style={styles}>
                                {supportedLanguages.map((lang) => (
                                    <ActionIcon
                                        variant="light"
                                        color={language == lang ? "green" : "gray"}
                                        size="lg"
                                        onClick={() => {
                                            setLanguage(lang);
                                            close();
                                        }}
                                        key={lang}
                                    >
                                        {lang}
                                    </ActionIcon>
                                ))}
                            </Group>
                        )}
                    </Transition>
                    <ActionIcon
                        variant="light"
                        size="lg"
                        onClick={toggle}
                    >
                        <IconLanguage />
                    </ActionIcon>
                </Group>
            </Tooltip>
        </Stack>
    );
};
