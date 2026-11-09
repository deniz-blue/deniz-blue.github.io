export const watchOnScreen = (element: Element, change: (onScreen: boolean) => void) =>
	new IntersectionObserver(([entry]) => change(entry?.isIntersecting ?? false)).observe(element);

export const pauseAnimationsOffScreen = (element: HTMLElement) =>
	watchOnScreen(element, (onScreen) => element.toggleAttribute("data-off-screen", !onScreen));
