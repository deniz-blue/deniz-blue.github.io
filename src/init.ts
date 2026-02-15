import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/code-highlight/styles.css";
import { useListeningToStore } from "./stores/useListeningToStore";

import.meta.glob("./styles/**/*.css", { eager: true });

const controller = new AbortController();
let ticking = false;
let scrollY = 0;
if (typeof window !== "undefined") window.addEventListener("scroll", (e) => {
	scrollY = window.scrollY;
	if (!ticking) requestAnimationFrame(() => {
		document.documentElement.style.cssText = "--scroll-y: " + window.scrollY + "px;";
		ticking = false;
	});
	ticking = true;
}, { passive: true, signal: controller.signal });

let cleanup = useListeningToStore.getState().init();

import.meta.hot?.accept(() => {
	controller.abort();
	cleanup?.();
});
