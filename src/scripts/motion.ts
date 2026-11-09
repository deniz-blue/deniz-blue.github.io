export const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export const supportsScrollDrivenAnimations = () => CSS.supports("animation-timeline: scroll()");

export const animateOnScroll = (update: () => void) => {
	if (prefersReducedMotion()) return;
	update();
	addEventListener("scroll", update, { passive: true });
	addEventListener("resize", update);
};
