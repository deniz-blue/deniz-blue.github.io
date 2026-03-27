import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/code-highlight/styles.css";

import.meta.glob("./styles/**/*.css", { eager: true });

import "./init-events";

import { useBackgroundStore } from "./components/background/PageBackground";
useBackgroundStore.setState({
	background: { type: "sanctuary", data: {} },
});
