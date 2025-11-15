import { Box, Image, ImageProps, LoadingOverlay } from "@mantine/core";
import { useState } from "react";

export const TransImage = (imageProps: ImageProps) => {
    let [isLoaded, setLoaded] = useState(false);

    return (
        <Box pos="relative">
            <LoadingOverlay visible={!isLoaded} pos="absolute" overlayProps={{ backgroundOpacity: 0 }} />
            <Image
                onLoad={() => setLoaded(true)}
                onError={() => setLoaded(true)}
                ref={el => {
                    if(el?.complete) setLoaded(true);
                }}
                {...imageProps}
            />
        </Box>
    );
};
