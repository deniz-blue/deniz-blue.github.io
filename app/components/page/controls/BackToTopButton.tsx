import { Localized } from "@alan404/react-localization";
import { ActionIcon, Box, Tooltip, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";

export const BackToTopButton = () => {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <Transition
            mounted={scroll.y > 50}
            transition="fade"
            keepMounted
        >
            {(styles) => (
                <Box style={styles}>
                    <Tooltip
                        label={(
                            <Localized
                                en="Back to top"
                                tr="Üste git"
                            />
                        )}
                        position="left"
                        withArrow
                        withinPortal={false}
                    >
                        <ActionIcon
                            onClick={() => scrollTo({ y: 0 })}
                            variant="light"
                            size="lg"
                        >
                            <IconArrowUp />
                        </ActionIcon>
                    </Tooltip>
                </Box>
            )}
        </Transition>
    )
};
