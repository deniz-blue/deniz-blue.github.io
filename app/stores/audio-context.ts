import { create } from "zustand";

export interface AudioContextStore {
	audioContext: AudioContext | null;
	cache: Map<string, AudioBuffer>;
	getContext: () => AudioContext;
}

export const useAudioContextStore = create<AudioContextStore>()((set, get) => ({
	audioContext: null,
	cache: new Map(),
	getContext: () => {
		if (get().audioContext) return get().audioContext!;
		const audioContext = new AudioContext();
		set({ audioContext });
		return audioContext;
	},
}));

export const useWebAudioBuffer = async (src: string) => {
	const store = useAudioContextStore.getState();
	if (store.cache.has(src)) {
		return store.cache.get(src)!;
	}

	const response = await fetch(src);
	const arrayBuffer = await response.arrayBuffer();
	const audioBuffer = await store.getContext().decodeAudioData(arrayBuffer);
	store.cache.set(src, audioBuffer);
	return audioBuffer;
};

export const playSoundEffect = async (src: string) => {
	const store = useAudioContextStore.getState();
	const audioContext = store.getContext();
	const audioBuffer = await useWebAudioBuffer(src);

	const gain = audioContext.createGain();
	gain.gain.setValueAtTime(0.5, 0);
	gain.connect(audioContext.destination);
	const source = audioContext.createBufferSource();
	source.buffer = audioBuffer;
	source.connect(gain);
	source.start(0);
};

export const useSoundEffect = (src: string) => {
	return {
		play: () => playSoundEffect(src).catch(console.error),
	};
}
