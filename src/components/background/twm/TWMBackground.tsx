import { useMemo } from "react";
import classes from "./twm.module.css";
import { deterministicRandom } from "../../../utils/deterministicRandom";
import { useElementSize } from "@mantine/hooks";
import { Box } from "@mantine/core";

export const Screen = () => {
	return (
		<div className={classes.screenOuter}>
			<div className={classes.screenInner}>
				<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
					<filter id="noiseFilter">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.65"
							numOctaves="3"
							stitchTiles="stitch"
						>
							<animate
								attributeName="seed"
								values="156116;2125553"
								dur="1s"
								repeatCount="indefinite"
							/>
						</feTurbulence>
					</filter>

					<rect width='100%' height='100%' fill="#3f0c75" />
					<rect width='100%' height='100%' opacity={0.4} filter='url(#noiseFilter)' />
				</svg>
			</div>
		</div>
	);
};

export const TWMBackground = () => {
	const { ref, width, height } = useElementSize();

	const positions = useMemo(() => {
		const rand = deterministicRandom();

		const positions = [];

		for (let y = 0; y < height; y += 96 * 1) {
			for (let x = 0; x < width; x += 96 * 1) {
				if (rand() < 0.2) {
					positions.push({
						x: x + (rand() * 96 * 1.5 - 96 * 1.5 / 2),
						y: y + (rand() * 96 * 1.5 - 96 * 1.5 / 2),
						t: rand(),
						z: rand(),
					});
				}
			}
		}

		return positions;
	}, [width, height]);

	return (
		<div className={"scrollableBackground fullSize " + classes.background} ref={ref}>
			<div className={classes.overlayA} />
			<div className={classes.overlayB} />
			<div className={classes.overlayC} />
			{positions.map((pos, i) => (
				<Box
					key={i}
					className={classes.backgroundItem}
					style={{
						"--x": pos.x + "px",
						"--y": pos.y + "px",
						"--z": pos.z,
						"--t": pos.t*6 + "s",
					}}
				>
					<Screen />
				</Box>
			))}
		</div>
	)
};

