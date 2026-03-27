import { vec2, Vec2 } from "@alan404/vec2";
import { Box } from "@mantine/core";
import { PropsWithChildren, SVGProps } from "react";

export const SpeckleBackground = () => {
	const papers = [
		{ pos: vec2(-170, 150), depth: -0.5, r: 10 },
		{ pos: vec2(170, 270), depth: -0.5, r: -8 },
		{ pos: vec2(215, 189), depth: -0.5, r: 5 },
	];

	return (
		<Box
			className="scrollableBackground fullSize"
			style={{
				background: "radial-gradient(circle at 93.7% 83.96%, #400047, transparent 100%),radial-gradient(circle at 94.27% 13.38%, #2b0041, transparent 100%),radial-gradient(circle at 51.88% 44.18%, #241b47, transparent 100%),radial-gradient(circle at 24.22% 86.8%, #26293a, transparent 100%),radial-gradient(circle at 3.7% 7.79%, #210040, transparent 100%),radial-gradient(circle at 1.61% 94.96%, #270034, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)",
			}}
		>
			<Box
				style={{
					position: "absolute",
					top: "0",
					left: "50%",
					transform: "translateX(-50%)",
				}}
			>
				{papers.map((d, i) => (
					<Clue key={i} pos={d.pos} depth={d.depth}>
						<ClueDocument style={{ transformOrigin: "top center", transform: `translateY(-5px) rotate(${d.r}deg)` }} />
					</Clue>
				))}
			</Box>
			<RedString a={vec2(200, -50)} b={vec2(1500, 300)} depth={-2} />
			<RedString a={vec2(-5000, 2100)} b={vec2(5000, 1600)} depth={-2} />

			<RedString a={papers[0].pos} b={papers[1].pos} depth={-.5} />
			<RedString a={papers[2].pos} b={papers[1].pos} depth={-.5} />
		</Box>
	);
};

export const ClueDocument = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg width={50} height={50 * 1.4} {...props}>
			<rect x={0} y={0} width={50} height={50 * 1.4} fill="#c0b6ef" />
			{/* Random lines */}
			{Array(8).fill(0).map((_, i) => (
				<line
					key={i}
					x1={5}
					y1={5 + i * 5}
					x2={45}
					y2={5 + i * 5}
					stroke="#8b7bb5"
					strokeWidth={2}
				/>
			))}
		</svg>
	);
};

export const Clue = ({
	children,
	pos,
	size,
	depth = 0,
}: PropsWithChildren<{
	pos: Vec2;
	size?: Vec2;
	depth?: number;
}>) => {
	return (
		<Box
			style={{
				position: "absolute",
				top: pos.y,
				left: pos.x,
				width: size?.x,
				height: size?.y,
				transform: `translateX(-50%) translateY(calc(1px * var(--scroll-y) * ${depth}))`,
				transformOrigin: "top center",
			}}
		>
			{children}
		</Box>
	);
};

export const RedString = ({
	a, b, depth, zIndex,
}: {
	a: Vec2;
	b: Vec2;
	depth: number;
	zIndex?: number;
}) => {
	const min = vec2(Math.min(a.x, b.x), Math.min(a.y, b.y));
	const max = vec2(Math.max(a.x, b.x), Math.max(a.y, b.y));
	const size = vec2(max.x - min.x, max.y - min.y);

	const tension = 1.5;
	const mid = vec2((min.x + max.x) / 2, ((min.y + max.y) / 2) * tension + (size.x * 0.01));

	return (
		<svg
			style={{
				position: "absolute",
				width: "100%",
				height: "100%",
				left: "50%",
				stroke: "#fe1c68",
				strokeWidth: "3",
				fill: "none",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				transform: `translateY(calc(1px * var(--scroll-y) * ${depth}))`,
				overflow: "visible",
				display: "flex",
				zIndex,
				pointerEvents: "none",
			}}
		>
			{/* <circle cx={a.x} cy={a.y} r={5} fill="red" />
			<circle cx={b.x} cy={b.y} r={5} fill="red" />
			<circle cx={mid.x} cy={mid.y} r={5} fill="red" /> */}
			<path d={`M ${a.x} ${a.y} Q ${mid.x} ${mid.y} ${b.x} ${b.y}`} fill="none" />
		</svg>
	);
};
