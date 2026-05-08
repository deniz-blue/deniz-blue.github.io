import { ActionIcon, Group, Image, Stack } from "@mantine/core";
import { useBackgroundStore } from "../../../background/PageBackground";
import { PropsWithChildren, useRef } from "react";
import blueheart from "./icons/blueheart.gif";
import twmpc from "./icons/twmpc.png";
import soul from "./icons/soul.png";

export const BackgroundSwitcher = () => {
	const { background, setBackground } = useBackgroundStore();

	const clickAmount = useRef(0);
	const clickTimeout = useRef<any>(null);

	return (
		<Stack>
			<Group justify="center">
				<BackgroundButton onClick={() => setBackground({ type: "starfield", data: {} })}>
					<Image
						src={blueheart}
						alt="Celeste Crystal Heart"
						width={40}
						height={40}
					/>
				</BackgroundButton>
				<BackgroundButton
					onClick={() => {
						if (background.type === "man") return;
						if (clickTimeout.current) clearTimeout(clickTimeout.current);
						clickAmount.current += 1;
						if (clickAmount.current >= 5)
							setBackground({ type: "man", data: {} });
						else
							setBackground({ type: "sanctuary", data: {} });
						clickTimeout.current = setTimeout(() => {
							clickAmount.current = 0;
						}, 1000);
					}}
				>
					<Image
						src={soul}
						alt="Soul"
						width={44}
						height={44}
						style={{ imageRendering: "pixelated" }}
					/>
				</BackgroundButton>
				<BackgroundButton
					onClick={() => setBackground({ type: "twm", data: {} })}
				>
					<Image
						src={twmpc}
						alt="The World Machine"
						width={60}
						height={46}
					/>
				</BackgroundButton>
			</Group>
		</Stack>
	)
};

export const BackgroundButton = ({
	children,
	onClick,
}: PropsWithChildren<{
	onClick?: () => void;
}>) => {
	return (
		<ActionIcon
			onClick={onClick}
			size={48}
			variant="subtle"
		>
			{children}
		</ActionIcon>
	);
};
