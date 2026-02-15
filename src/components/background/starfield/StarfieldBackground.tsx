import { useEffect, useRef, useId, useState, memo } from "react";
import { EffectsWorkerInput, EffectsWorkerOutput } from "./worker-messages";
import { DEFAULT_DIM } from "./starfield";
import { useWindowEvent } from "@mantine/hooks";
import { vec2 } from "@alan404/vec2";
import { Affix, Group, Loader, Paper, Text, Transition } from "@mantine/core";
import { create } from "zustand";
import { notifications } from "@mantine/notifications";

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

		window.addEventListener("resize", () => {
			useStarfieldStore.getState().worker?.postMessage({
				type: "dimensionsChange", data: vec2(window.innerWidth, window.innerHeight),
			});
		}, { signal: abortController.signal });

		return () => {
			abortController.abort();
		};
	}, []);

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
				objectFit: "contain",
				aspectRatio: DEFAULT_DIM.x / DEFAULT_DIM.y,
				imageRendering: "pixelated",
			}}
		/>
	);
};



