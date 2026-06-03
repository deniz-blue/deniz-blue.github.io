import { create } from "zustand";

type TextTask = {
	text: string;
	speed?: number;
	onComplete?: () => void;
};

// null = clear screen

type Typer = {
	displayedText: string;
	isTyping: boolean;
	queue: (TextTask | null)[];
	add: (task: TextTask | null) => void;
	next: () => void;
	skip: () => void;
	textIndex: number;
	interval: NodeJS.Timeout | null;
};

export const useTyper = create<Typer>((set, get) => ({
	displayedText: "",
	isTyping: false,
	queue: [],
	textIndex: 0,
	interval: null,
	add: (task) => {
		set((state) => ({
			queue: [...state.queue, task],
		}));
		if (!get().isTyping) {
			get().next();
		}
	},
	skip: () => {
		if (get().isTyping) {
			clearInterval(get().interval!);
			const nextTask = get().queue[0];
			nextTask && nextTask.onComplete?.();
			set((state) => ({
				isTyping: false,
				displayedText: state.queue[0]?.text || "",
				queue: state.queue.slice(1),
			}));
		}
	},
	next: () => {
		if (get().isTyping) return;
		const nextTask = get().queue[0];
		if (nextTask === undefined) return;
		if (nextTask === null) {
			set({ displayedText: "" });
			set((state) => ({
				queue: state.queue.slice(1),
			}));
			get().next();
			return;
		}
		set({ isTyping: true, textIndex: 0 });
		const interval = setInterval(() => {
			const { textIndex } = get();
			if (textIndex >= nextTask.text.length) {
				clearInterval(get().interval!);
				set((state) => ({
					isTyping: false,
					displayedText: nextTask.text,
					queue: state.queue.slice(1),
				}));
				if (nextTask.onComplete) nextTask.onComplete();
			} else {
				set((state) => ({
					displayedText: nextTask.text.slice(0, state.textIndex + 1),
					textIndex: state.textIndex + 1,
				}));
			}
		}, nextTask.speed || 100);
		set({ interval });
	},
}));
