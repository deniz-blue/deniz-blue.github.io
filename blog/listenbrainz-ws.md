# ListenBrainz WebSocket API

I wanted to have a real-time "now listening" status on my website. Normally, this would require polling the ListenBrainz API every few seconds, which is inefficient and kinda meh.

I wanted to see if they have a websocket API, and apparently, its an undocumented feature! The code exists, but it's not mentioned anywhere.

They have a [socket.io](https://socket.io/) websocket at `https://listenbrainz.org/` which works as some sort of pub/sub system. You can subscribe to changes to the now listening status and recieve new scrobbles in real time.

You need to emit a `json` event with the username you want to subscribe to, and then you'll start receiving `playing_now` events whenever the user scrobbles a new track.

```ts
const user = "deniz.blue";

let socket = io(socketEndpoint);

socket.on("connect", () => {
	console.log("Connected to ListenBrainz socket");
	socket.emit("json", { user });
});

type TrackMetadata = {
	artist_name?: string;
	track_name?: string;
	release_name?: string;
	// ...
};

socket.on("playing_now", (json: string) => {
	const data = JSON.parse(json) as {
		track_metadata: TrackMetadata;
	};

	console.log("Received playing_now event", data);
});
```

Keep in mind that when you connect to the socket, you will not immediately receive the currently playing track - only changes. So you must also make an HTTP request to the ListenBrainz API to get the current status, and then listen for changes via the websocket.

```ts
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

const endpoint = `https://api.listenbrainz.org/1/user/${user}/playing-now`;
const res = await fetch(endpoint);
const data = await res.json() as PlayingNowResponse;
const track = data?.payload?.listens?.[0]?.track_metadata ?? null;
```

Bone apple tea!
