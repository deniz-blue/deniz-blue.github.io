import { useHotkeys } from "@mantine/hooks";
import { useBackgroundStore } from "./components/background/PageBackground";
import { useAppFlagsStore } from "./stores/useAppFlagsStore";
import { useEffect } from "react";
import { WingDing } from "./components/page/wingding/WingDing";
import { Device } from "./components/page/device/Device";
import { Affix, Box } from "@mantine/core";
import { Terminal } from "./components/terminal/Terminal";
import { Pamphlet } from "./components/page/pamphlet/Pamphlet";
import { PamphletV2 } from "./components/page/pamphletv2/PamphletV2";
import { CountdownThing } from "./components/page/countdown/CountdownThing";

export const IndexPage = () => {
	const setBackground = useBackgroundStore(store => store.setBackground);

	const flags = useAppFlagsStore();

	const exitable = (
		flags.showPamphlet
		|| flags.showPamphletV2
		|| flags.showDevice
		|| flags.showCountdown
	);

	const exit = () => {
		if (!exitable) return;
		setBackground({ type: "null", data: {} });
		useAppFlagsStore.setState({
			showTerminal: true,

			showPamphlet: false,
			showPamphletV2: false,
			showDevice: false,
			showCountdown: false,
			showWD: false,
		})
	};

	useHotkeys([
		["Ctrl+C", exit],
	]);

	useEffect(() => {
		const d = new Date();
		// set showCountdown to true between Dec 30 and Jan 2
		if (d.getMonth() === 11 && d.getDate() >= 30 || d.getMonth() === 0 && d.getDate() <= 2) {
			useAppFlagsStore.setState({ showCountdown: true, showPamphletV2: false });
		}
	}, []);

	return (
		<>
			{flags.showDevice && <Device />}
			{flags.showWD && <WingDing />}

			<Box display={flags.showTerminal ? "block" : "none"} pos="absolute">
				<Terminal />
			</Box>

			{flags.showPamphlet && (
				<Pamphlet layout />
			)}

			{flags.showPamphletV2 && (
				<PamphletV2 />
			)}

			{flags.showCountdown && (
				<CountdownThing />
			)}

			{exitable && (
				<Affix position={{ top: 0, left: 0 }}>
					<div className="terminal">
						<pre className="terminal-content">
							<a
								style={{
									fontWeight: "bold",
									color: "#2472c8",
								}}
								onClick={exit}
								tabIndex={-1}
							>
								^C Exit
							</a>
						</pre>
					</div>
				</Affix>
			)}
		</>
	);
}
