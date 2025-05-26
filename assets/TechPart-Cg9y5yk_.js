import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{c as k,k as z,j as C,l as $,i as P,h as O,e as B,d as X,f as N,I as A,a as L,b as R,m as F}from"./IconBrandVite-CoTowxze.js";const E=(...[n])=>new Proxy({},{get:(e,r)=>i=>({type:r,data:i,...n==null?void 0:n({type:r,data:i})})});/**
 * @license @tabler/icons-react v3.33.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var H=k("outline","brand-nextjs","IconBrandNextjs",[["path",{d:"M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993",key:"svg-0"}],["path",{d:"M15 12v-3",key:"svg-1"}]]);const s=E(),o=n=>n,a=n=>n,W=a({id:"hello",title:"Hello",description:"First blog post",date:"14.08.2024"});function c(n){const e={h1:"h1",p:"p",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.h1,{children:"Hello!"}),`
`,t.jsx(e.p,{children:"Welcome to by blog! :3"}),`
`,t.jsx(e.p,{children:"I have 2 WIP articles as of writing this, dont worry haha"})]})}function J(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(c,{...n})}):c(n)}const U=Object.freeze(Object.defineProperty({__proto__:null,data:W,default:J},Symbol.toStringTag,{value:"Module"})),G=a({id:"internship",title:"That Time I Had an Internship of 2 Days",description:"yeah",date:"2024.08.08"});function l(n){const e={em:"em",p:"p",strong:"strong",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"Hi! It's me, Deniz, im currently bored at metro so I decided I would actually start writing blog posts."}),`
`,t.jsx(e.p,{children:"Now, a bit of context: the type of highschool that i went to does not provide internships. The friendly government that contains my school, however, does a mini internship available to students studying in my type of highschools."}),`
`,t.jsx(e.p,{children:"I applied the first time I heard about it, they called me over and I had to basically fill some forms and do a small interview. A few weeks after that I was accepted! 🎉"}),`
`,t.jsxs(e.p,{children:["I remember the first day of the event. It was raining a lot, I got up at a time I ",t.jsx(e.em,{children:"never"})," woke up in before. Now, from my house to the where I need to go is kinda far (10 kilometers or so) and they previously sent out a table of private bus services for us to get in contact with and possibly use. I did talk with the driver that goes near my house, and we agreed on a pickup spot."]}),`
`,t.jsxs(e.p,{children:["At ",t.jsx(e.strong,{children:"6:50"}),' am, I was at the pickup spot. The infographic they sent had "',t.jsx(e.strong,{children:"7:00"}),' am" written as their starting time. 20 minutes after I arrived, ',t.jsx(e.strong,{children:"7:10"})," am, the bus driver still wasn't there. I started panicking."]}),`
`,t.jsxs(e.p,{children:["I called the bus driver, no response. At ",t.jsx(e.strong,{children:"7:20"}),"am, I saw the bus! But uh, the bus ",t.jsx(e.em,{children:"didnt"})," stop, or even ",t.jsx(e.em,{children:"slow down"})," for that matter. I screamed after it I think, but the bus just kept going."]}),`
`,t.jsx(e.p,{children:"I was frustrated, I hopped on one of the public busses and started to go on my own. I was texting them telling what happened. At one point, the bus driver called me back! ...explaining how he was asleep and that apparently someone else took the route?? Awesome."})]})}function V(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(l,{...n})}):l(n)}const Y=Object.freeze(Object.defineProperty({__proto__:null,data:G,default:V},Symbol.toStringTag,{value:"Module"})),q=a({id:"enum-lib",title:"TypeScript Algebraic Enums",description:"I made an npm library: @alan404/enum",date:"14.08.2024"});function d(n){const e={p:"p",...n.components};return t.jsx(e.p,{children:"meow"})}function Z(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(d,{...n})}):d(n)}const K=Object.freeze(Object.defineProperty({__proto__:null,data:q,default:Z},Symbol.toStringTag,{value:"Module"})),Q=o({id:"nbs-js",name:"nbs.js",shortDesc:"NBS parser in Javascript",year:"2021",status:"archive",buttons:[s.repo("deniz-blue/nbs.js"),s.npm("nbs.js")],tech:["js"],types:["library"],primaryImage:"/assets/img/proj/nbs-js.png"});function u(n){const e={code:"code",p:"p",pre:"pre",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"This is REALLY old"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-js",children:`const NBS = require("nbs.js")

let song = NBS.loadSong("./song.nbs")

console.log(song)
`})})]})}function ee(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(u,{...n})}):u(n)}const te=Object.freeze(Object.defineProperty({__proto__:null,data:Q,default:ee},Symbol.toStringTag,{value:"Module"})),ne=o({id:"denvis",name:"DenVis",shortDesc:"A simple Windows Audio Visualizer",primaryImage:"/assets/img/proj/denvis.png",year:"2022",status:"wip",buttons:[s.repo("deniz-blue/DenVis"),s.website("https://denvis.glitch.me/")],tech:["cs"],types:["desktop"]});function p(n){const e={a:"a",img:"img",p:"p",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:t.jsx(e.img,{src:"/assets/img/proj/denvis.png",alt:""})}),`
`,t.jsx(e.p,{children:"I like Audio-Visual stuff so I added this equalizer-style thing to my desktop. Updates in real time of course."}),`
`,t.jsx(e.p,{children:`It uses .NET/C# and some Windows API's to render a transparent window overlay and some interesting math stuff
(Fourier Transform) to render the bar.`}),`
`,t.jsx(e.p,{children:"It can also render snow!"}),`
`,t.jsxs(e.p,{children:[`For settings, I didn't want to bother with rendering UI in
C# so I expose a websocket in the app and made a `,t.jsx(e.a,{href:"https://denvis.glitch.me/",children:"website"})," for it :P"]}),`
`,t.jsx(e.p,{children:"I do want to rewrite this in Rust sometime, making it platform-independent."})]})}function se(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(p,{...n})}):p(n)}const oe=Object.freeze(Object.defineProperty({__proto__:null,data:ne,default:se},Symbol.toStringTag,{value:"Module"})),re=o({id:"paginated-selects",name:"PaginatedSelects",shortDesc:"A DSharpPlus extension that adds paginated select components",year:"2022",status:"archive",buttons:[s.repo("deniz-blue/DSharpPlus.PaginatedSelects")],tech:["cs"],types:["library"]});function m(n){const e={a:"a",code:"code",p:"p",pre:"pre",...n.components};return t.jsxs(t.Fragment,{children:[t.jsxs(e.p,{children:["This is a really old ",t.jsx(e.a,{href:"https://dsharpplus.github.io/DSharpPlus/",children:"DSharpPlus"})," extension that adds paginated select components"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-cs",children:`using DSharpPlus.PaginatedSelects;

var paginatedExtension = client.UsePaginatedSelects();
`})}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-cs",children:`await ctx.EditResponseAsync(new DiscordWebhookBuilder()
	.WithContent("Hi! Where are you from?")
	.AddPaginatedSelect("myselect", new PaginatedSelect(new(){
		new("America", "us"),
		new("France", "fr"),
		new("Germany", "gb"),
		new("Turkey", "tr"),
		// ... imagine more than 25 options ....
	})));
`})})]})}function ae(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(m,{...n})}):m(n)}const ie=Object.freeze(Object.defineProperty({__proto__:null,data:re,default:ae},Symbol.toStringTag,{value:"Module"})),ce=o({id:"want-you-gone",name:"Want You Gone",shortDesc:"Portal 2 ending credits song animation recreated using HTML",year:"2022",status:"archive",primaryImage:"/assets/img/proj/wantyougone.png",buttons:[s.website("https://deniz.blue/want-you-gone/"),s.repo("deniz-blue/want-you-gone")],tech:["html","css","js"],types:["website"]});function h(n){const e={img:"img",p:"p",...n.components};return t.jsx(e.p,{children:t.jsx(e.img,{src:"/assets/img/proj/wantyougone.png",alt:""})})}function le(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(h,{...n})}):h(n)}const de=Object.freeze(Object.defineProperty({__proto__:null,data:ce,default:le},Symbol.toStringTag,{value:"Module"})),ue=o({id:"mcman",name:"mcman",shortDesc:"A powerful Minecraft Server Management CLI which allows you to use git and many other things",year:"2023",status:"ok",primaryImage:"https://mcman.deniz.blue/mcman-3.png",buttons:[s.repo("ParadigmMC/mcman"),s.docs("https://mcman.deniz.blue/")],tech:["rust"],types:["cli","library"]});function g(n){const e={code:"code",img:"img",p:"p",...n.components};return t.jsxs(t.Fragment,{children:[t.jsxs(e.p,{children:[t.jsx(e.code,{children:"mcman"})," allows you to use ",t.jsx(e.code,{children:"git"})," to version-control your minecraft servers ✨"]}),`
`,t.jsxs(e.p,{children:[`it does this by its own config format and build process that auto-downloads and updates any plugins/mods/worlds/etc
and by seperating actual plugin/mod config files from `,t.jsx(e.code,{children:"jar"})," files"]}),`
`,t.jsx(e.p,{children:t.jsx(e.img,{src:"https://mcman.deniz.blue/mcman-3.png",alt:""})})]})}function pe(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(g,{...n})}):g(n)}const me=Object.freeze(Object.defineProperty({__proto__:null,data:ue,default:pe},Symbol.toStringTag,{value:"Module"})),he=o({id:"oaalmun",name:"OAALMUN",shortDesc:"MUN (Model United Nations) website for my school (commission)",year:"2023",status:"ok",buttons:[s.website("https://mun.oaal.com.tr")],tech:["js","ts","react","vite"],types:["website"],primaryImage:"/assets/img/proj/oaalmun.png"});function b(n){const e={em:"em",p:"p",strong:"strong",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"I still haven't got my payment of 2 toasts at the canteen for this"}),`
`,t.jsxs(e.p,{children:["For the record, ",t.jsx(e.em,{children:t.jsx(e.strong,{children:"no"})}),", I was not a part of any MUN's."]})]})}function ge(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(b,{...n})}):b(n)}const be=Object.freeze(Object.defineProperty({__proto__:null,data:he,default:ge},Symbol.toStringTag,{value:"Module"})),je=o({id:"alphamath",name:"alphamath",shortDesc:"An experimental interactive math engine/solver",year:"2024",status:"wip",buttons:[s.website("https://deniz.blue/alphamath/"),s.repo("deniz-blue/alphamath")],tech:["ts","react","vite"],types:["website","library"],hide:!0});function j(n){const e={p:"p",...n.components};return t.jsx(e.p,{children:"Skip this, its a giant WIP"})}function ye(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(j,{...n})}):j(n)}const xe=Object.freeze(Object.defineProperty({__proto__:null,data:je,default:ye},Symbol.toStringTag,{value:"Module"})),fe=o({id:"carpanga",name:"Çarpanga",shortDesc:"A 1v1 mathematical strategy game",year:"2024",status:"up",buttons:[s.website("https://carpanga.deniz.blue/"),s.repo("deniz-blue/carpanga")],tech:["ts","react","vite"],types:["website"],primaryImage:"/assets/img/proj/carpanga.png"});function y(n){const e={img:"img",p:"p",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"Goal: Get 3 in a row"}),`
`,t.jsx(e.p,{children:"The number your opponent picked on their turn will be multiplied with your choice. You take the result if it exists on the board."}),`
`,t.jsx(e.p,{children:"My classmates really liked this little game haha"}),`
`,t.jsx(e.p,{children:t.jsx(e.img,{src:"/assets/img/proj/carpanga.png",alt:""})})]})}function _e(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(y,{...n})}):y(n)}const we=Object.freeze(Object.defineProperty({__proto__:null,data:fe,default:_e},Symbol.toStringTag,{value:"Module"})),ve=o({id:"discord-jsx",name:"discord-jsx",shortDesc:"A library that allows you to use React/JSX inside your discord bot projects",year:"2024",status:"ok",buttons:[s.repo("deniz-blue/discord-jsx"),s.npm("@alan404/discordjsx")],tech:["ts","react","nodejs"],types:["library"],primaryImage:"/assets/img/proj/discordjsx.png"});function x(n){const e={a:"a",code:"code",p:"p",pre:"pre",strong:"strong",...n.components};return t.jsxs(t.Fragment,{children:[t.jsxs(e.p,{children:["This project uses ",t.jsx(e.a,{href:"https://www.npmjs.com/package/react-reconciler",children:"react-reconciler"})," to render React components into discord messages."]}),`
`,t.jsxs(e.p,{children:["This allows you to use ",t.jsx(e.strong,{children:"all"})," React hooks in your components."]}),`
`,t.jsx(e.p,{children:"This was made as a proof of concept. I dont think anyone would ever actually want to use React to make a discord bot."}),`
`,t.jsxs(e.p,{children:["Below is an example that uses ",t.jsx(e.strong,{children:"effects"})," and ",t.jsx(e.strong,{children:"state"})," to render ",t.jsx(e.strong,{children:"embeds"})," and ",t.jsx(e.strong,{children:"message buttons"})]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-tsx",children:`import { createJSXRenderer } from "@alan404/discordjsx";

const Test = () => {
    const [counter, setCounter] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCounter(c => c + 10);
		}, 30_000);

		return () => clearInterval(interval);
	}, []);

    return (
        <msg>
            <embed
                color="Purple"
                title="discord-jsx Example"
            >
                Hello world!

                Counter: {counter}
            </embed>

            <row>
                <button onClick={() => setCounter(c => c-1)}>
                    -1
                </button>
                <button onClick={() => setCounter(c => c+1)}>
                    +1
                </button>
            </row>
        </msg>
    );
}

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply();

    createJSXRenderer(client, <Test />, async (msg) => {
        await interaction.editReply(msg);
    });
});
`})})]})}function Me(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(x,{...n})}):x(n)}const Ie=Object.freeze(Object.defineProperty({__proto__:null,data:ve,default:Me},Symbol.toStringTag,{value:"Module"})),Te=o({id:"istanbus",name:"Istanbus",shortDesc:"Istanbul Bus Information website (IETT)",year:"2024",status:"up",buttons:[s.website("https://istanbus.deniz.blue/"),s.repo("deniz-blue/istanbus")],tech:["ts","react","nodejs"],types:["website","restapi"]});function f(n){const e={p:"p",...n.components};return t.jsx(e.p,{children:"IETT but better idk"})}function Se(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(f,{...n})}):f(n)}const De=Object.freeze(Object.defineProperty({__proto__:null,data:Te,default:Se},Symbol.toStringTag,{value:"Module"})),ke=o({id:"minecraft-assets",name:"minecraft-assets",shortDesc:"TypeScript library providing minecraft assets (block states, models and textures)",year:"2024",status:"up",buttons:[s.npm("@alan404/minecraft-assets"),s.repo("deniz-blue/minecraft-assets-ts")],tech:["ts"],types:["library"]});function _(n){const e={a:"a",p:"p",...n.components};return t.jsxs(e.p,{children:[t.jsx(e.a,{href:"https://www.npmjs.com/package/minecraft-data",children:"minecraft-data"}),` is NodeJS-only so I made this quickly,
it works on browsers plus its ✨ ESM ✨`]})}function ze(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(_,{...n})}):_(n)}const Ce=Object.freeze(Object.defineProperty({__proto__:null,data:ke,default:ze},Symbol.toStringTag,{value:"Module"})),$e=o({id:"nbt-ts",name:"nbt",shortDesc:"TypeScript library for serializing and deserializing NBT",year:"2024",status:"ok",primaryImage:"/assets/img/proj/nbt-ts.png",buttons:[s.npm("@alan404/nbt"),s.repo("deniz-blue/nbt-ts")],tech:["ts"],types:["library"]});function w(n){const e={a:"a",code:"code",p:"p",pre:"pre",strong:"strong",...n.components};return t.jsxs(t.Fragment,{children:[t.jsxs(e.p,{children:[t.jsx(e.a,{href:"https://minecraft.wiki/w/NBT_format",children:"Named Binary Tag (NBT)"}),` is a data format used
by `,t.jsx(e.strong,{children:"Minecraft"})," - this is a TypeScript library that provides serialization and deserialization for it."]}),`
`,t.jsxs(e.p,{children:["This library uses the native javascript ",t.jsx(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer",children:"ArrayBuffer"})," API. (Browser compatible)"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-ts",children:`import { NBTCompound, serializeNBT, deserializeNBT } from "@alan404/nbt";

let tag = NBTTag.Compound({
    name: NBTTag.String("Rust"),
    age: NBTTag.Byte(19),
});

let buffer: ArrayBuffer = serializeNBT(tag);
let anotherTag: NBTCompound = deserializeNBT(buffer);

// Serde-like functionality	

import { NBTDocument, Field } from "@alan404/nbt";

class Person extends NBTDocument {
    @Field("String")
    name: string = "";

    @Field("Byte")
    age: number = 0;
}
`})}),`
`,t.jsx(e.p,{children:"See README for more details."})]})}function Pe(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(w,{...n})}):w(n)}const Oe=Object.freeze(Object.defineProperty({__proto__:null,data:$e,default:Pe},Symbol.toStringTag,{value:"Module"})),Be=o({id:"nekotube",name:"NekoTube",shortDesc:"an alternative YouTube video player",year:"2024",status:"",buttons:[s.website("https://tube.deniz.blue/"),s.repo("deniz-blue/nekotube")],tech:["js","react","vite"],types:["website"],primaryImage:"/assets/img/proj/nekotube.png"});function v(n){const e={a:"a",p:"p",strong:"strong",...n.components},{Alert:r}=e;return r||Ne("Alert"),t.jsxs(t.Fragment,{children:[t.jsx(r,{variant:"outline",color:"yellow",children:t.jsxs(e.p,{children:["Since YouTube started ",t.jsx(e.a,{href:"https://github.com/iv-org/invidious/issues/4734",children:"being more strict"}),`
invidious instances have become more scarce, so this project doesn't work that much anymore.`]})}),`
`,t.jsx(r,{variant:"outline",color:"yellow",children:t.jsxs(e.p,{children:["LightTube also ",t.jsx(e.a,{href:"https://blog.kuylar.dev/lighttube-end-of-development/",children:"stopped development"})]})}),`
`,t.jsxs(e.p,{children:["NekoTube is an alternative YouTube frontend. It uses other third party API's such as ",t.jsx(e.a,{href:"https://invidious.io/",children:"Invidious"}),`
and `,t.jsx(e.a,{href:"https://lighttube.org/",children:"LightTube"}),"."]}),`
`,t.jsxs(e.p,{children:["The most notable feature of NekoTube was the ability to use a ",t.jsx(e.strong,{children:"comment"})," as a source of ",t.jsx(e.strong,{children:"chapters"})]})]})}function Xe(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(v,{...n})}):v(n)}function Ne(n,e){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}const Ae=Object.freeze(Object.defineProperty({__proto__:null,data:Be,default:Xe},Symbol.toStringTag,{value:"Module"})),Le=o({id:"polycules",name:"Polycules",shortDesc:"A website to graph 'polycules'",year:"2024",status:"up",buttons:[s.website("https://poly.deniz.blue"),s.repo("deniz-blue/polycules")],tech:["ts","react","vite","nodejs"],types:["website"],primaryImage:"/assets/img/proj/polycules.png"});function M(n){const e={a:"a",p:"p",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx("iframe",{src:"https://poly.deniz.blue/default",width:"100%",height:"300",loading:"lazy",style:{border:"0",borderRadius:"0.5rem"}}),`
`,t.jsxs(e.p,{children:["This is basically ",t.jsx(e.a,{href:"https://polycul.es/",children:"polycul.es"})," but its more mobile-friendly and supports DID/OSDD/plurality/systems."]}),`
`,t.jsx(e.p,{children:"Made as a request from my friends who are polyamorous"})]})}function Re(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(M,{...n})}):M(n)}const Fe=Object.freeze(Object.defineProperty({__proto__:null,data:Le,default:Re},Symbol.toStringTag,{value:"Module"})),Ee=o({id:"react-workspace",name:"react-workspace",shortDesc:"Infinitely pannable, accessible map-like workspace for React",year:"2024",status:"ok",primaryImage:"/assets/img/proj/workspace.png",buttons:[s.npm("@alan404/react-workspace"),s.repo("deniz-blue/react-workspace")],tech:["ts","react"],types:["website"]});function I(n){const e={a:"a",p:"p",...n.components};return t.jsxs(e.p,{children:["Used by ",t.jsx(e.a,{href:"/projects/alphamath",children:"alphamath"})," and ",t.jsx(e.a,{href:"/projects/polycules",children:"Polycules"})]})}function He(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(I,{...n})}):I(n)}const We=Object.freeze(Object.defineProperty({__proto__:null,data:Ee,default:He},Symbol.toStringTag,{value:"Module"})),Je=o({id:"ziltek",name:"ZilTek",shortDesc:"A school bell app for schools",year:"2024",status:"up",buttons:[s.website("https://ziltek.deniz.blue/"),s.repo("deniz-blue/ZilTek")],tech:["ts","react","vite","nodejs"],types:["website","desktop"],primaryImage:"/assets/img/proj/ziltekscreenshot.png"});function T(n){const e={img:"img",li:"li",p:"p",ul:"ul",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"ZilTek plays school bells."}),`
`,t.jsx(e.p,{children:"Features:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Available offline"}),`
`,t.jsx(e.li,{children:"Web app"}),`
`,t.jsx(e.li,{children:"Desktop app"}),`
`,t.jsx(e.li,{children:"Remote control"}),`
`,t.jsx(e.li,{children:"No limits"}),`
`,t.jsx(e.li,{children:"Free"}),`
`]}),`
`,t.jsx(e.p,{children:t.jsx(e.img,{src:"/assets/img/proj/ziltekscreenshot.png",alt:""})})]})}function Ue(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(T,{...n})}):T(n)}const Ge=Object.freeze(Object.defineProperty({__proto__:null,data:Je,default:Ue},Symbol.toStringTag,{value:"Module"})),Ve="deniz.blue",Ye=n=>`https://${n}.${Ve}/`,qe=o({id:"events",name:"Deniz'in Etkinlik Sitesi",shortDesc:"A website for finding out about events",year:"2025",status:"wip",buttons:[s.website(Ye("events"))],tech:["ts","vite","react","mongodb","prisma","nodejs"],types:["website","restapi"],primaryImage:"/assets/img/proj/events.png"});function S(n){const e={p:"p",...n.components},{Group:r}=e;return r||Ke("Group"),t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"A website im making so people can find events and such"}),`
`,t.jsx(e.p,{children:"It's Turkish only (maybe for now)"}),`
`,t.jsx(e.p,{children:"Here's an event I went to, displayed by my site:"}),`
`,t.jsx(r,{justify:"center",children:t.jsx("iframe",{src:"https://events.deniz.blue/embed/events/675423692476197849d7f5f8",width:"400",height:"400",loading:"lazy",style:{border:"0",borderRadius:"0.5rem"}})})]})}function Ze(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(S,{...n})}):S(n)}function Ke(n,e){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}const Qe=Object.freeze(Object.defineProperty({__proto__:null,data:qe,default:Ze},Symbol.toStringTag,{value:"Module"})),D=n=>Object.fromEntries(Object.entries(n).map(([e,r])=>[r.data.id,r]).filter(([e])=>e[0]!=="_"));D(Object.assign({"./blog/Hello.mdx":U,"./blog/_Internship.mdx":Y,"./blog/_LibraryEnum.mdx":K}));const st=D(Object.assign({"./proj/2021/nbs-js.mdx":te,"./proj/2022/denvis.mdx":oe,"./proj/2022/paginated-selects.mdx":ie,"./proj/2022/want-you-gone.mdx":de,"./proj/2023/mcman.mdx":me,"./proj/2023/oaalmun.mdx":be,"./proj/2024/alphamath.mdx":xe,"./proj/2024/carpanga.mdx":we,"./proj/2024/discord-jsx.mdx":Ie,"./proj/2024/istanbus.mdx":De,"./proj/2024/minecraft-assets.mdx":Ce,"./proj/2024/nbt-ts.mdx":Oe,"./proj/2024/nekotube.mdx":Ae,"./proj/2024/polycules.mdx":Fe,"./proj/2024/react-workspace.mdx":We,"./proj/2024/ziltek.mdx":Ge,"./proj/2025/events.mdx":Qe})),et={cs:["C#",R],react:["React",L],ts:["TypeScript",A],js:["JavaScript",N],html:["HTML",X],css:["CSS",B],rust:["Rust",O],nextjs:["Next.js",H],vite:["Vite",P],nodejs:["NodeJS",$],mongodb:["MongoDB",C],prisma:["Prisma",z]},ot=({tech:n})=>{const[e,r]=et[n];return t.jsx(F,{label:e,withArrow:!0,children:t.jsx(r,{})})};export{st as D,ot as T};
