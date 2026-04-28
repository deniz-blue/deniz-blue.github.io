import { Anchor, AnchorProps, Box, Group, Stack } from "@mantine/core";
import { Fragment } from "react";
import classes from "./cosplaywebring.module.css";

export const CosplayWebring = () => {
	const anchorProps: AnchorProps = {
		inherit: true,
		style: {
			fontFamily: "orb, sans-serif",
			fontSize: "small",
			color: "black",
			backgroundImage: "linear-gradient(transparent, #ffffff)",
		},
	};

	return (
		<Stack>
			<Box
				id="cosring"
				className={classes.cosring}
				w={88 * 3 + 4 * 2}
				py={4}
			>
				<Stack align="center" justify="space-between" gap={0}>
					<Anchor
						href="https://eyeorb.net/webring/cosplay.html"
						target="_blank"
						{...anchorProps}
						className="soulSelectable"
						data-soul-anchor="right-center"
						data-soul-mr={12}
						data-soul-z={1}
					>
						Cosplay Webring
					</Anchor>
					<Group wrap="nowrap" gap={4} align="center">
						{["prev", "rand", "next"].map((action, i, a) => (
							<Fragment key={action}>
								<Stack>
									<Anchor
										href={`https://eyeorb.net/webring/simplering.html?opt=${action}&slug=deniz`}
										{...anchorProps}
										className="soulSelectable"
										data-soul-z={1}
										data-soul-anchor="center-bottom"
										data-soul-mb={12}
									>
										{action}
									</Anchor>
								</Stack>

								{i !== a.length - 1 && " ▫ "}
							</Fragment>
						))}
					</Group>
				</Stack>
			</Box>
		</Stack>
	)
};
