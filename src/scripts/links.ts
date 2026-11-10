export const externalLinkAttributes = (href: string | undefined) =>
	href !== undefined && /^https?:\/\//.test(href)
		? { target: "_blank", rel: "noopener noreferrer" }
		: {};
