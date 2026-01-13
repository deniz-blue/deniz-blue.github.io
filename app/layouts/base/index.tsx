import { Outlet } from "react-router";
import { PageBackground } from "~/components/background/PageBackground";
import { MusicPlayerProvider } from "~/components/archive/music/MusicPlayerProvider";
import { SoulElement } from "../../components/soul/SoulElement";
import { ContextStack } from "../../components/ui/ContextStack";
import { SoulController } from "../../components/soul/SoulController";
import { Center, Loader } from "@mantine/core";

export default function Layout() {
    return (
        <ContextStack
            providers={[
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

