export type Art = {
	src: string;
	author: {
		name: string;
		link: string;
	};
	subtitle?: React.ReactNode;
	aspectRatio: number;
};

const KiwiAsli = {
	name: "@kiwi_asli",
	link: "https://www.instagram.com/kiwi_asli/",
};

export const Arts: Art[] = [
	{
		src: "/assets/img/me/dennis_meka2.jpg",
		author: {
			name: "@mekashi_moon",
			link: "https://www.instagram.com/mekashi_moon/",
		},
		aspectRatio: 1280 / 1280,
	},
	// {
	//     src: "/assets/img/me/dennis_yagiz_rust.jpeg",
	//     author: {
	//         name: "@rustwww",
	//         link: "https://www.instagram.com/rustwww/",
	//     },
	//     aspectRatio: 1493/1493,
	// },
	{
		src: "/assets/img/me/dennis_ka.png",
		author: KiwiAsli,
		aspectRatio: 1300 / 1700,
	},
	// {
	//     src: "/assets/img/me/dennis_annatony.png",
	//     author: {
	//         name: "@planebroker12",
	//         link: "https://www.instagram.com/planebroker12/",
	//     },
	//     aspectRatio: 2048/4317,
	// },
	{
		src: "/assets/img/me/dennis_meka.png",
		author: {
			name: "@mekashi_moon",
			link: "https://www.instagram.com/mekashi_moon/",
		},
		aspectRatio: 768 / 1024,
	},
	// {
	//     src: "/assets/img/me/dennis_sophia_ka.png",
	//     author: KiwiAsli,
	//     aspectRatio: 1324/1300,
	// },
	// {
	//     src: "/assets/img/me/warren_polycule.png",
	//     author: {
	//         name: "@warreneatsrats",
	//         link: "https://www.instagram.com/warreneatsrats/",
	//     },
	//     aspectRatio: 3000/1881,
	// },
	{
		src: "/assets/img/me/dennis_yk.png",
		author: {
			name: "@yesilkedu",
			link: "https://www.instagram.com/yesilkedu/",
		},
		aspectRatio: 399 / 399,
	},
];
