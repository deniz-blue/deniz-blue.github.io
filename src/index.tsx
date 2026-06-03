import { useHotkeys } from "@mantine/hooks";
import { useBackgroundStore } from "./components/background/PageBackground";
import { useAppFlagsStore } from "./stores/useAppFlagsStore";
import { useEffect } from "react";
import { Device } from "./components/page/device/Device";
import { Affix } from "@mantine/core";
import { Terminal } from "./components/terminal/Terminal";
import { CountdownThing } from "./components/page/countdown/CountdownThing";
import { Centerstone } from "./components/page/cornerstone/Centerstone";
import { EggRoom } from "./components/page/device/EggRoom";

export const IndexPage = () => {
	const setBackground = useBackgroundStore(store => store.setBackground);

	const flags = useAppFlagsStore();

	const exitable = (
		flags.showPamphlet
		|| flags.showPamphletV2
		|| flags.showCornerstone
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
			showEgg: false,
			showCornerstone: false,
		})
	};

	useHotkeys([
		["Ctrl+C", exit],
	]);

	useEffect(() => {
		const d = new Date();
		// set showCountdown to true between Dec 30 and Jan 2
		if (d.getMonth() === 11 && d.getDate() >= 30 || d.getMonth() === 0 && d.getDate() <= 2) {
			useAppFlagsStore.setState({ showCountdown: true, showCornerstone: false });
		}
	}, []);

	return (
		<>
			{flags.showDevice && <Device />}

			{flags.showTerminal && (
				<Terminal />
			)}

			{flags.showCornerstone && (
				<Centerstone />
			)}

			{flags.showCountdown && (
				<CountdownThing />
			)}

			{flags.showEgg && (
				<EggRoom />
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
