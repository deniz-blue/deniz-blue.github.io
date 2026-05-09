import { create } from "zustand";
import { useAppFlagsStore } from "../../stores/useAppFlagsStore";
import { DepthBackground } from "./depth/DepthBackground";
import { ManBackground } from "./man/ManBackground";
import { OneShotBackground } from "./oneshot/OneshotBackground";
import { RainForeground } from "./rain/RainForeground";
import { RefugeBackground } from "./refuge/RefugeBackground";
import { StarfieldBackground } from "./starfield/StarfieldBackground";
import { Enum } from "@alan404/enum";
import { WinterBackground } from "./winter/WinterBackground";
import { AuroraBackground } from "./aurora/AuroraBackground";
import { Swapper } from "../ui/swapper/Swapper";
import { useMemo } from "react";
import { SanctuaryBackground } from "./sanctuary/SanctuaryBackground";
import { SpeckleBackground } from "./speckle/SpeckleBackground";
import { TWMBackground } from "./twm/TWMBackground";

export type Background = Enum<{
	null: { fade?: boolean };
	depth: {};
	man: {};
	starfield: {};
	oneshot: { withNiko?: boolean };
	refuge: {};
	winter: {};
	ender: {};
	aurora: {};
	sanctuary: {};
	speckle: {};
	twm: {};
}>;

export const defaultBackground: Background = {
	type: "null",
	data: {},
};

export const useBackgroundStore = create<{
	background: Background;
	setBackground: (bg: Background) => void;
}>()((set, get) => ({
	background: defaultBackground,
	setBackground: (background) => set(state => ({ background })),
}))

// @ts-ignore
globalThis.useBackgroundStore = useBackgroundStore;

export const BackgroundComponentRegistry: Record<string, React.ComponentType<any>> = {
	starfield: StarfieldBackground,
	depth: DepthBackground,
	oneshot: OneShotBackground,
	refuge: RefugeBackground,
	winter: WinterBackground,
	aurora: AuroraBackground,
	sanctuary: SanctuaryBackground,
	speckle: SpeckleBackground,
	twm: TWMBackground,
	man: ManBackground,
};

export const PageBackground = () => {
	const background = useBackgroundStore(store => store.background);
	const rain = useAppFlagsStore(store => store.rain);

	const content = useMemo(() => {
		const Component = BackgroundComponentRegistry[background.type] ?? (() => null);
		return (
			<>
				<Component {...background.data} />
				{rain && <RainForeground />}
			</>
		);
	}, [JSON.stringify(background), rain])

	return (
		<div style={{
			position: "absolute",
			zIndex: -1,
			pointerEvents: "none",
			width: "100%",
			height: "100%",
			inset: 0,
			minHeight: "100svh",
		}}>
			<Swapper
				content={content}
				duration={(background.type == "null" && background.data.fade !== true) ? 0 : 500}
				styles={{
					wrapper: {
						width: "100%",
						height: "100%",
					},
					content: {
						width: "100%",
						height: "100%",
					},
				}}
			/>
		</div>
	)
};
