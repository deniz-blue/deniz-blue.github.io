import { useEffect, useRef, useId, useState, memo } from "react";
import { EffectsWorkerInput, EffectsWorkerOutput } from "./worker-messages";
import { DEFAULT_DIM } from "./starfield";
import { useWindowEvent } from "@mantine/hooks";
import { vec2 } from "@alan404/vec2";
import { Affix, Group, Loader, Paper, Text, Transition } from "@mantine/core";

export const StarfieldBackground = memo(() => {
	const [mounted, setMounted] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const id = requestAnimationFrame(() => setMounted(true));
		return () => cancelAnimationFrame(id);
	}, []);

	return (
		<div
			className="pageBackground"
			style={{
				backgroundImage: "url('/assets/img/detail/sky.png')",
				backgroundRepeat: "repeat",
				backgroundAttachment: "fixed",
			}}
		>
			{mounted && <StarfieldCanvas setLoading={setLoading} />}

			<Transition mounted={loading} duration={200}>
				{(styles) => (
					<Affix position={{ bottom: 20, right: 20 }} zIndex={1000} style={{ pointerEvents: "none" }}>
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


export const StarfieldCanvas = ({ setLoading }: { setLoading: (loading: boolean) => void }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const workerRef = useRef<Worker | null>(null);
	const offscreenRef = useRef<OffscreenCanvas | null>(null);

	useEffect(() => {
		let abortController = new AbortController();
		let signal = abortController.signal;
		const id = requestAnimationFrame(() => {
			if (signal.aborted) return;

			const canvas = canvasRef.current;
			if (!canvas) return;

			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
			const offscreen = canvas.transferControlToOffscreen();

			const worker = new Worker(new URL("./effects.worker.ts", import.meta.url), {
				type: "module",
			});

			worker.postMessage({ type: "init", data: offscreen }, [offscreen]);
			workerRef.current = worker;

			worker.postMessage({
				type: "scroll", data: vec2(
					0,
					window.scrollY
				)
			});

			worker.onmessage = (ev: MessageEvent<EffectsWorkerOutput>) => {
				const message = ev.data;
				if (message.type === "initialized") {
					setLoading(false);
				}
			};

			window.addEventListener("scroll", () => {
				worker.postMessage({
					type: "scroll", data: vec2(
						0,
						window.scrollY
					)
				});
			}, { signal });
		});

		return () => {
			cancelAnimationFrame(id);
			workerRef.current?.terminate();
			abortController.abort();
			workerRef.current = null;
		};
	}, []);

	useWindowEvent("resize", () => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		workerRef.current?.postMessage({
			type: "dimensionsChange",
			data: vec2(canvas.clientWidth, canvas.clientHeight),
		});
	});

	return (
		<canvas
			ref={canvasRef}
			className="fullscreenDynamic"
			style={{
				objectFit: "contain",
				aspectRatio: DEFAULT_DIM.x / DEFAULT_DIM.y,
				imageRendering: "pixelated",
			}}
		/>
	);
};



