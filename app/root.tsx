import { Center, createTheme, DEFAULT_THEME, Loader, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { PropsWithChildren } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { Route } from "./+types/root";
import css_mantine_core from "@mantine/core/styles.css?url";
import css_mantine_notifications from "@mantine/notifications/styles.css?url";
import css_mantine_carousel from "@mantine/carousel/styles.css?url";
import css_mantine_highlight from "@mantine/code-highlight/styles.css?url";
import css_custom_styles from "./styles/style.css?url";
import css_custom_mixins from "./styles/mixins.css?url";
import { ModalsProvider } from "@mantine/modals";
import { LocalizationProvider } from "./components/localization/LocalizationProvider";

export const meta: Route.MetaFunction = () => [
    { title: "deniz.blue 💡" },
    { property: "og:title", content: "deniz.blue 💡" },
    { property: "og:description", content: "[...]" },
];

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "stylesheet", href: css_mantine_core },
    { rel: "stylesheet", href: css_mantine_notifications },
    { rel: "stylesheet", href: css_mantine_carousel },
    { rel: "stylesheet", href: css_mantine_highlight },
    { rel: "stylesheet", href: css_custom_styles },
    { rel: "stylesheet", href: css_custom_mixins },
];

const theme = createTheme({
    fontFamily: "Lexend-VariableFont, " + DEFAULT_THEME.fontFamily,
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
