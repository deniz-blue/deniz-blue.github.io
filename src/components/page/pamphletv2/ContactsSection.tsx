import { IconBrandDiscord, IconBrandGithub, IconBrandMatrix, IconBrandTelegram, IconCopyCheck, IconMail } from "@tabler/icons-react";
import { ReactNode, useMemo, useState } from "react";
import { CustomIconBrandSignal } from "../../icons/CustomIconBrandSignal";
import { Button, CloseButton, Collapse, CopyButton, Group, Paper, Popover, Stack, Text, Tooltip } from "@mantine/core";

interface Contact {
	icon: ReactNode;
	label: string;
	link?: string;
	copy?: string;
	gatekeep?: string;
}

const contacts: Contact[] = [
	{
		icon: <IconBrandGithub title="" />,
		label: "GitHub",
		link: "https://github.com/deniz-blue",
	},
	{
		icon: <IconBrandDiscord title="" />,
		label: "Discord",
		copy: "deniz.blue",
	},
	{
		icon: <IconMail title="" />,
		label: "Email",
		link: "mailto:deniz@deniz.blue",
	},
	{
		icon: <IconBrandTelegram title="" />,
		label: "Telegram",
		link: "https://t.me/denizdotblue",
		gatekeep: "Telegram is good, but please consider using other platforms to contact me",
	},
	{
		icon: <CustomIconBrandSignal />,
		label: "Signal",
		copy: "denizblue.01",
		gatekeep: "Please prefer contacting through other platforms",
	},
	{
		icon: <IconBrandMatrix title="" />,
		label: "Matrix",
		copy: "@deniz:catgirl.cloud",
		gatekeep: "Please prefer contacting through other platforms",
	},
];

export const ContactsSection = () => {
	const [gatekeep, setGatekeep] = useState<Contact | null>(null);
	const [opened, setOpened] = useState(false);

	return (
		<Stack gap={4} align="center" w="100%">
			<Group gap={4} grow w="100%">
				{contacts.map((contact, i) => (
					<ContactButton key={i} contact={contact} onClick={() => {
						setGatekeep(p => {
							if (p === contact) {
								setOpened(o => !o);
								return p;
							};

							return contact ?? p;
						});
					}} />
				))}
			</Group>
			<Collapse expanded={opened}>
				<Paper p="xs" radius="sm" bg="var(--mantine-color-violet-light)">
					<Stack gap="xs">
						<Group gap={4} wrap="nowrap">
							<Text inline inherit span fz="xs" c="dimmed" flex="1">
								{gatekeep?.gatekeep}
							</Text>
							<CloseButton onClick={() => setOpened(false)} />
						</Group>

						<ContactButton
							contact={{
								icon: gatekeep?.icon,
								label: gatekeep?.label ?? "",
								link: gatekeep?.link,
								copy: gatekeep?.copy,
							}}
						/>
					</Stack>
				</Paper>
			</Collapse>
		</Stack>
	);
};

export const ContactButton = ({
	contact,
	onClick,
}: {
	contact: Contact;
	onClick?: () => void;
}) => {
	if (!contact.gatekeep && !!contact.link) return (
		<Tooltip label={contact.label}>
			<Button
				variant="light"
				size="compact-md"
				component="a"
				target="_blank"
				href={contact.link}
				aria-label={contact.label}
			>
				{contact.icon}
			</Button>
		</Tooltip>
	);

	if (!contact.gatekeep && !!contact.copy) return (
		<CopyButton value={contact.copy}>
			{({ copy, copied }) => (
				<Tooltip label={copied ? "Copied!" : contact.label}>
					<Button
						variant="light"
						size="compact-md"
						component="a"
						target="_blank"
						href={contact.link}
						aria-label={contact.label}
						onClick={copy}
						color={copied ? "teal" : undefined}
					>
						{copied ? <IconCopyCheck /> : contact.icon}
					</Button>
				</Tooltip>
			)}
		</CopyButton>
	);

	return (
		<Tooltip label={contact.label}>
			<Button
				variant="light"
				size="compact-md"
				component="button"
				aria-label={contact.label}
				onClick={onClick}
			>
				{contact.icon}
			</Button>
		</Tooltip>
	);
};
