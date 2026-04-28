import { useEffect, memo } from "react";
import { EffectsWorkerOutput } from "./worker-messages";
import { vec2 } from "@alan404/vec2";
import { Affix, Group, Loader, Paper, Text, Transition } from "@mantine/core";
import { create } from "zustand";
import { notifications } from "@mantine/notifications";

const RESIZE_DEBOUNCE_MS = 120;

export const StarfieldBackground = memo(() => {
	// const [mounted, setMounted] = useState(false);
	const loading = useStarfieldStore(store => store.loading);

	// useEffect(() => {
	// 	const id = requestAnimationFrame(() => setMounted(true));
	// 	return () => cancelAnimationFrame(id);
	// }, []);

	return (
		<div
			className="pageBackground"
			style={{
				backgroundImage: "url('/assets/img/detail/sky.png')",
				backgroundRepeat: "repeat",
				backgroundAttachment: "fixed",
			}}
		>
			<StarfieldCanvas />

			<Transition mounted={loading} duration={200}>
				{(styles) => (
					<Affix position={{ bottom: 20, right: 20 }} zIndex={1000} style={{ ...styles, pointerEvents: "none" }}>
						<Paper p="xs">
							<Group align="center" justify="center">
								<Text>
									Loading...
								</Text>
								<Loader size="sm" />
							</Group>
						</Paper>
					</Affix>
				)}
			</Transition>
		</div>
	);
});

export const useStarfieldStore = create<{
	worker: Worker | null;
	canvas: HTMLCanvasElement | null;
	offscreen: OffscreenCanvas | null;
	loading: boolean;
	handleCanvasRef: (ref: HTMLCanvasElement | null) => void | (() => void);
}>()((set, get) => ({
	worker: null,
	loading: true,
	canvas: null,
	offscreen: null,
	handleCanvasRef: (canvas: HTMLCanvasElement | null) => {
		if(!canvas) return;
		if(get().canvas === canvas) return;

		set({ canvas });

		// if(get().worker) get().worker!.terminate();
		// if(get().offscreen) set({ offscreen: null });

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		const offscreen = canvas.transferControlToOffscreen();
		// set({ offscreen });

		const worker = new Worker(new URL("./effects.worker.ts", import.meta.url), {
			type: "module",
		});

		worker.postMessage({ type: "init", data: offscreen }, [offscreen]);
		set({ worker });

		worker.postMessage({
			type: "scroll", data: vec2(
				0,
				window.scrollY
			)
		});

		worker.onmessage = (ev: MessageEvent<EffectsWorkerOutput>) => {
			const message = ev.data;
			if (message.type === "initialized") {
				set({ loading: false });
			}
		};

		return () => {};
	},
}))

export const StarfieldCanvas = () => {
	const canvas = useStarfieldStore(store => store.canvas);

	useEffect(() => {
		let abortController = new AbortController();

		window.addEventListener("scroll", () => {
			useStarfieldStore.getState().worker?.postMessage({
				type: "scroll", data: vec2(
					0,
					window.scrollY
				)
			});
		}, { signal: abortController.signal });

		return () => {
			abortController.abort();
		};
	}, []);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout> | null = null;
		let ro: ResizeObserver | null = null;
		let vv: VisualViewport | null = null;
		let lastWidth = -1;
		let lastHeight = -1;

		const sendDimensions = () => {
			const storeCanvas = canvas ?? useStarfieldStore.getState().canvas;
			const width = Math.max(1, Math.round(storeCanvas?.clientWidth ?? window.innerWidth));
			const height = Math.max(1, Math.round(storeCanvas?.clientHeight ?? (window.visualViewport?.height ?? window.innerHeight)));

			if (width === lastWidth && height === lastHeight) return;
			lastWidth = width;
			lastHeight = height;

			useStarfieldStore.getState().worker?.postMessage({
				type: "dimensionsChange",
				data: vec2(width, height),
			});
		};

		const scheduleDimensions = () => {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(sendDimensions, RESIZE_DEBOUNCE_MS);
		};

		window.addEventListener("resize", scheduleDimensions);
		window.addEventListener("orientationchange", scheduleDimensions);
		vv = window.visualViewport;
		vv?.addEventListener("resize", scheduleDimensions);

		if (canvas && typeof ResizeObserver !== "undefined") {
			ro = new ResizeObserver(scheduleDimensions);
			ro.observe(canvas);
		}

		sendDimensions();

		return () => {
			window.removeEventListener("resize", scheduleDimensions);
			window.removeEventListener("orientationchange", scheduleDimensions);
			vv?.removeEventListener("resize", scheduleDimensions);
			ro?.disconnect();
			if (timeout) clearTimeout(timeout);
		};
	}, [canvas]);

	const handleCanvasRef = useStarfieldStore(store => store.handleCanvasRef);

	return (
		<canvas
			ref={ref => {
				try {
					return handleCanvasRef(ref);
				} catch (e) {
					console.error("StarfieldCanvas: Failed to set canvas ref", e);
					notifications.show({
						title: "Starfield Error",
						message: "Failed to initialize starfield background.",
						color: "red",
					});
				}
			}}
			className="fullscreenDynamic"
			style={{
				imageRendering: "pixelated",
			}}
		/>
	);
};



