import { Outlet } from "react-router";
import { FeaturesProvider } from "~/components/base/FeaturesContext";
import { UIContextProvider } from "~/components/base/UIContext";
import { PageBackground } from "~/components/background/PageBackground";
import { MusicPlayerProvider } from "~/components/features/music/MusicPlayerProvider";
import { BackgroundContextProvider } from "../../contexts/background/BackgroundContext";
import { SoulElement } from "../../contexts/soul/SoulElement";
import { ContextStack } from "../../components/ui/ContextStack";
import { SoulController } from "../../contexts/soul/SoulController";
import { WebAudioContextProvider } from "../../contexts/audio/WebAudioContext";
import { AppContextProvider } from "../../contexts/app/AppContext";
import { Center, Loader } from "@mantine/core";

export default function Layout() {
    return (
        <ContextStack
            providers={[
                BackgroundContextProvider,
                WebAudioContextProvider,
                FeaturesProvider,
                AppContextProvider,
                UIContextProvider,
                MusicPlayerProvider,
            ]}
        >
            <PageBackground />
            <SoulElement />
            <SoulController />
            <Outlet />
        </ContextStack>
    )
};

export function HydrateFallback() {
    return (
        <Center my="xl" h="90vh">
            <Loader />
        </Center>
    );
}

