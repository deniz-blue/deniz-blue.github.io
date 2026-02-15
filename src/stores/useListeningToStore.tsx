import { create } from "zustand";
import { io } from "socket.io-client";

export interface TrackMetadata {
	artist_name?: string;
	release_name?: string;
	track_name?: string;
	additional_info?: {
		origin_url?: string;
	};
};

export interface ListeningToState {
	track: TrackMetadata | null;
	loading: boolean;

	init: () => () => void;
};

const endpoint = "https://api.listenbrainz.org/1/user/deniz.blue/playing-now";
const socketEndpoint = "https://listenbrainz.org/";

export const useListeningToStore = create<ListeningToState>()((set, get) => ({
	track: null,
	loading: false,

	init: () => {
		if (typeof window === "undefined") return () => { };

		let socket = io(socketEndpoint);

		socket.on("connect", () => {
			console.log("Connected to ListenBrainz socket");
			socket.emit("json", { user: "deniz.blue" });
		});

		socket.on("playing_now", (json: string) => {
			const data = JSON.parse(json) as PlayingNowSocketResponse;
			console.log("Received playing_now event", data);
			const track = data?.track_metadata ?? null;
			set({ track });
		});

		const fetchNowPlaying = async () => {
			if (socket.connected) return;
			set({ loading: true });
			try {
				const res = await fetch(endpoint);
				const data = await res.json() as PlayingNowResponse;
				const track = data?.payload?.listens?.[0]?.track_metadata ?? null;
				set({ track });
			} catch (e) {
				console.error("Failed to fetch listening data", e);
			} finally {
				set({ loading: false });
			}
		};

		fetchNowPlaying();

		let interval = setInterval(fetchNowPlaying, 60 * 1000);

		return () => {
			clearInterval(interval);
			socket.disconnect();
		};
	},
}));

interface PlayingNowResponse {
	payload: {
		count: number;
		listens: {
			playing_now: boolean;
			track_metadata: TrackMetadata;
		}[];
		playing_now: boolean;
		user_id: string;
	};
};

interface PlayingNowSocketResponse {
	track_metadata: TrackMetadata;
}
