export const externalLinkAttributes = (href: string) =>
	/^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
