import { useAudioUnlocker } from "../../../hooks/useAudioUnlocker";
import back from "./bg/03/back.png";
import c3bg0 from "./bg/03/bg0.png";
import c3bg1 from "./bg/03/bg1.png";
import c3bg3 from "./bg/03/bg3.png";
import c3bg3b from "./bg/03/bg3b.png";
import c3fg0 from "./bg/03/fg0.png";
import c0bg2 from "./bg/00/bg2.png";
import c0bg3 from "./bg/00/bg3.png";
import bgCloud from "./bg/04/bgCloud.png";
import env_amb_worldmap from "./audio/env_amb_worldmap.ogg";
import { useCanvas, UseCanvasInit } from "../../../hooks/useCanvas";
import { useCallback, useEffect } from "react";
import { randArr, randInt } from "../../../utils/math";
import { vec2 } from "@alan404/vec2";

interface Snowflake {
	font: string;
	color: string;
	x: number;
	y: number;
	vy: number;
	size: number;
	decay: number;
	sinkSpeed: number;
	alpha: number;
	sway: number;
};

const SnowflakeColors = [
	"#AAAACC",
	"#DDDDFF",
	"#CCCCDD",
	"#F3F3F3",
	"#F0FFFF",
];

const SnowflakeFonts = [
	"Times",
	"Arial",
	"Verdana",
];

export const WinterBackground = () => {
	const init: UseCanvasInit = useCallback((ctx) => {
		let flakes: Set<Snowflake> = new Set();

		const percentage = 0.5;
		const decaySpeed = 0.002;
		const wind = vec2(-1, 0);

		return {
			update(dt: number) {
				for (let flake of flakes) {
					if ((flake.y + flake.size) >= ctx.canvas.height) {
						flake.y = ctx.canvas.height - flake.size;
						if (flake.decay > 1) {
							flakes.delete(flake);
						} else {
							flake.decay += (decaySpeed * flake.vy * dt);
						}
					} else {
						flake.vy += flake.sinkSpeed * 0.01 * dt;
						flake.x += (wind.x * dt);
						flake.y += (flake.vy * dt) + (wind.y * dt);
					}
				}

				let amt = Math.floor(percentage * ctx.canvas.width);
				while (flakes.size < amt) {
					flakes.add({
						x: randInt(ctx.canvas.width * 2) - ctx.canvas.width * 0.5,
						y: -randInt(ctx.canvas.height * 2),
						vy: 0 + Math.random(),
						color: randArr(SnowflakeColors),
						font: randArr(SnowflakeFonts),
						sinkSpeed: randInt(5) + 1,
						size: randInt(2) + 3,
						decay: 0,
						alpha: Math.random() + 0.1,
						sway: randInt(10) + 15,
					});
				}
			},

			draw() {
				for (let flake of flakes) {
					ctx.font = `${flake.size}px ${flake.font}`;

					ctx.fillStyle = flake.color;
					ctx.globalAlpha = flake.alpha - flake.decay;
					const x = flake.x + Math.sin(flake.y / 36) * flake.sway;
					const y = flake.y;
					// ctx.fillText("*", x, y);
					ctx.fillRect(
						x,
						y,
						flake.size,
						flake.size,
					);
				}
			},
		};
	}, []);

	const { ref } = useCanvas(init, {});

	const audioRef = useAudioUnlocker();
	useEffect(() => {
		if (audioRef.current)
			audioRef.current.volume = 0.1;
	}, [audioRef]);

	return (
		<div className="pageBackground fullscreen">
			<audio
				src={env_amb_worldmap}
				ref={audioRef}
				autoPlay
				loop
			/>

			<canvas
				className="fullscreen"
				ref={ref}
			/>

			{([
				[back, {}],
				[c3bg0, {}],
				[bgCloud, {
					backgroundSize: "25%",
					backgroundPositionY: "top",
					backgroundRepeat: "repeat-x",
					opacity: "0.2",
				}],
				[c3bg1, {}],
				[c3bg3, {
					backgroundSize: "100%",
					backgroundPositionY: "bottom",
					backgroundRepeat: "repeat-x",
				}],
				// [c0bg2, {
				//     backgroundSize: "50%",
				//     backgroundPositionY: "bottom",
				//     backgroundRepeat: "repeat-x",
				// }],
				// [c0bg3, {
				//     backgroundSize: "50%",
				//     backgroundPositionY: "bottom",
				//     backgroundRepeat: "repeat-x",
				// }],
				[c3bg3b, {
					backgroundSize: "12.5%",
					backgroundPositionY: "bottom",
					backgroundRepeat: "repeat-x",
				}],
				[c3fg0, {
					backgroundSize: "25%",
					backgroundPositionY: "bottom",
					backgroundRepeat: "repeat-x",
				}],
			] as [string, React.CSSProperties][]).map(([src, sx], i) => (
				<div
					className="pageBackground"
					key={i}
					style={{
						backgroundImage: `url(${src})`,
						backgroundSize: "cover",
						imageRendering: "pixelated",
						objectFit: "cover",
						...sx,
					}}
				/>
			))}
		</div>
	)
};
