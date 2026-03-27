import { useListeningToStore } from "./stores/useListeningToStore";

const controller = new AbortController();
let ticking = false;
let scrollY = 0;
if (typeof window !== "undefined") window.addEventListener("scroll", (e) => {
	scrollY = window.scrollY;
	if (!ticking) requestAnimationFrame(() => {
		document.documentElement.style.cssText = "--scroll-y: " + scrollY + ";";
		ticking = false;
	});
	ticking = true;
}, { passive: true, signal: controller.signal });

let cleanup = useListeningToStore.getState().init();

import.meta.hot?.accept(() => {
	controller.abort();
	cleanup?.();
});
