import { Center, createTheme, DEFAULT_THEME, Loader, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { PropsWithChildren } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { Route } from "./+types/root";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/code-highlight/styles.css";
import "./styles/fonts.css";
import "./styles/style.css";
import "./styles/mixins.css";
import { ModalsProvider } from "@mantine/modals";
import { LocalizationProvider } from "./components/localization/LocalizationProvider";

export const meta: Route.MetaFunction = () => [
    { title: "deniz.blue" },
    { property: "og:title", content: "deniz.blue" },
    { property: "og:description", content: "..." },
];

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
];

const theme = createTheme({
    fontFamily: "Lexend, " + DEFAULT_THEME.fontFamily,
    fontFamilyMonospace: "Deltarune, " + DEFAULT_THEME.fontFamilyMonospace,
    primaryColor: "violet",
    colors: {
        dark: [
            '#C1C2C5',
            '#A6A7AB',
            '#909296',
            '#5c5f66',
            '#373A40',
            '#2C2E33',
            '#25262b',
            '#1A1B1E',
            '#141517',
            '#101113',
        ],
    },
    components: {
        Tooltip: {
            defaultProps: {
                color: "dark",
            },
            styles: {
                color: "var(--mantine-color-text)"
            }
        }
    }
});

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Links />
                <Meta />
            </head>
            <body data-starry>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
};

export default function App() {
    return (
        <MantineProvider theme={theme} forceColorScheme="dark">
            <LocalizationProvider>
                <Notifications position="top-right" classNames={{
                    notification: "frost bordered",
                }} />
                <ModalsProvider>
                    <Outlet />
                </ModalsProvider>
            </LocalizationProvider>
        </MantineProvider>
    )
}

export function HydrateFallback() {
    return (
        <MantineProvider theme={theme} forceColorScheme="dark">
            <Center my="xl" h="90vh">
                <Loader />
            </Center>
        </MantineProvider>
    );
}
