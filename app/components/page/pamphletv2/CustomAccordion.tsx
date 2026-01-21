import { Accordion, AccordionChevron, AccordionControlProps, Button, ButtonProps, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { PropsWithChildren, ReactNode } from "react";

export const CustomAccordion = ({
	children,
	id,
	title,
	rightSection,
	link,
	icon,
	buttonProps,
}: PropsWithChildren<{
	id: string;
	title?: ReactNode;
	rightSection?: ReactNode;
	link?: string;
	icon?: ReactNode;
	buttonProps?: ButtonProps & AccordionControlProps;
}>) => {
	return (
		<Accordion.Item value={id} w="100%">
			<Stack w="100%" gap={0}>
				<Group w="100%">
					<Button.Group w="100%">
						<Button
							size="compact-md"
							variant="light"

							component={Accordion.Control}
							chevron={(
								<span aria-hidden="true">
									<AccordionChevron />
								</span>
							)}

							fullWidth
							style={{ overflow: "visible", lineClamp: "unset" }}
							styles={{
								...buttonProps?.styles,
								inner: {
									justifyContent: "start"
								},
								label: {
									overflow: "visible",
									whiteSpace: "normal",
									textAlign: "start",
								},
							}}

							icon={(
								<span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center" }}>
									{icon}
								</span>
							)}
							aria-role="tab"

							className="soulSelectable"
							data-soul-anchor="left-center"
							data-soul-ml={15}
							data-soul-z={2}
							onKeyDown={() => {
								throw new Error("STOP_MANTINE");
							}}

							{...buttonProps}
						>
							<Text
								inline
								inherit
								span
							>
								{title}
							</Text>
						</Button>
						{link && (
							<Tooltip label="Open Link" position="right" withArrow>
								<Button
									size="compact-md"
									variant="light"
									component="a"
									target="_blank"
									href={link}
									aria-label="Open Link"
									className="soulSelectable"
									data-soul-blur
								>
									<IconExternalLink size={18} aria-hidden="true" />
								</Button>
							</Tooltip>
						)}
					</Button.Group>
				</Group>
				<Accordion.Panel>
					<Paper
						p="xs"
						bg={`rgba(121, 80, 242, 0.1)`}
					>
						<Text fz="xs" span inherit>
							{children}
						</Text>
					</Paper>
				</Accordion.Panel>
			</Stack>
		</Accordion.Item >
	);
};
