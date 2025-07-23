import { Outlet } from "react-router";
import { FeaturesProvider } from "~/components/base/FeaturesContext";
import { UIContextProvider } from "~/components/base/UIContext";
import { PageBackground } from "~/components/background/PageBackground";
import { MusicPlayerProvider } from "~/components/features/music/MusicPlayerProvider";
import { BackgroundContextProvider } from "../../contexts/background/BackgroundContext";
import { SoulElement } from "../../contexts/soul/SoulElement";
import { ContextStack } from "../../components/ui/ContextStack";
import { SoulContextProvider } from "../../contexts/soul/SoulContext";
import { WebAudioContextProvider } from "../../contexts/audio/WebAudioContext";

export default function Layout() {
    return (
        <ContextStack
            providers={[
                BackgroundContextProvider,
                WebAudioContextProvider,
                FeaturesProvider,
                UIContextProvider,
                MusicPlayerProvider,
                SoulContextProvider,
            ]}
        >
            <PageBackground />
            <SoulElement />
            <Outlet />
        </ContextStack>
    )
};
