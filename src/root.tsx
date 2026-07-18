import { createTheme, DEFAULT_THEME, MantineProvider, TooltipProps } from "@mantine/core";
import "./init";
import { Page } from "./app/Page";

const theme = createTheme({
	fontFamily: "Lexend, " + DEFAULT_THEME.fontFamily,
	fontFamilyMonospace: "Deltarune, " + DEFAULT_THEME.fontFamilyMonospace,
	fontWeights: {
		bold: "600",
		regular: "350",
	},
	primaryColor: "violet",
	components: {
		Tooltip: {
			defaultProps: {
				color: "dark",
			},
			styles: {
				color: "var(--mantine-color-text)",
			},
		} as Partial<TooltipProps>,
	},
});

export const Root = () => {
	return (
		<MantineProvider theme={theme} forceColorScheme="dark">
			<Page />
		</MantineProvider>
	);
};
