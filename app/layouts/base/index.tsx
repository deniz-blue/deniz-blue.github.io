import { Outlet } from "react-router";
import { FeaturesProvider } from "~/components/base/FeaturesContext";
import { UIContextProvider } from "~/components/base/UIContext";
import { PageBackground } from "~/components/background/PageBackground";
import { MusicPlayerProvider } from "~/components/features/music/MusicPlayerProvider";
import { BackgroundContextProvider } from "../../contexts/background/BackgroundContext";

export default function Layout() {
    return (
        <BackgroundContextProvider>
            <FeaturesProvider>
                <UIContextProvider>
                    <MusicPlayerProvider>
                        <PageBackground />
                        <Outlet />
                    </MusicPlayerProvider>
                </UIContextProvider>
            </FeaturesProvider>
        </BackgroundContextProvider>
    )
};
