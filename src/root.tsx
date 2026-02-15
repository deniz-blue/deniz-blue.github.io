import { createTheme, DEFAULT_THEME, MantineProvider, TooltipProps } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { IndexPage } from ".";
import { PageBackground } from "./components/background/PageBackground";
import "./init";

const theme = createTheme({
	fontFamily: "Lexend, " + DEFAULT_THEME.fontFamily,
	fontFamilyMonospace: "Deltarune, " + DEFAULT_THEME.fontFamilyMonospace,
	primaryColor: "violet",
	components: {
		Tooltip: {
			defaultProps: {
				color: "dark",
			},
			styles: {
				color: "var(--mantine-color-text)"
			},
		} as Partial<TooltipProps>,
	},
});

export const Root = () => {
	return (
		<span suppressHydrationWarning>
			<MantineProvider theme={theme} forceColorScheme="dark">
				<Notifications position="top-right" classNames={{
					notification: "frost bordered",
				}} />
				<ModalsProvider>
					<PageBackground />
					<IndexPage />
				</ModalsProvider>
			</MantineProvider>
		</span>
	);
};
