import{j as t}from"./jsx-runtime-BjG_zV1W.js";import"./chunk-QMGIS6GS-CucUpDno.js";import{r as W,l as H,i as U,j as G,B as J,m as V}from"./polymorphic-factory-BJ4uqfO3.js";const Y=["h1","h2","h3","h4","h5","h6"],q=["xs","sm","md","lg","xl"];function Z(n,e){const o=e!==void 0?e:`h${n}`;return Y.includes(o)?{fontSize:`var(--mantine-${o}-font-size)`,fontWeight:`var(--mantine-${o}-font-weight)`,lineHeight:`var(--mantine-${o}-line-height)`}:q.includes(o)?{fontSize:`var(--mantine-font-size-${o})`,fontWeight:`var(--mantine-h${n}-font-weight)`,lineHeight:`var(--mantine-h${n}-line-height)`}:{fontSize:W(o),fontWeight:`var(--mantine-h${n}-font-weight)`,lineHeight:`var(--mantine-h${n}-line-height)`}}var $={root:"m_8a5d1357"};const K={order:1},Q=V((n,{order:e,size:o,lineClamp:a,textWrap:c})=>{const i=Z(e,o);return{root:{"--title-fw":i.fontWeight,"--title-lh":i.lineHeight,"--title-fz":i.fontSize,"--title-line-clamp":typeof a=="number"?a.toString():void 0,"--title-text-wrap":c}}}),C=H((n,e)=>{const o=U("Title",K,n),{classNames:a,className:c,style:i,styles:O,unstyled:X,order:l,vars:N,size:A,variant:B,lineClamp:L,textWrap:ut,mod:F,...R}=o,E=G({name:"Title",props:o,classes:$,className:c,style:i,classNames:a,styles:O,unstyled:X,vars:N,varsResolver:Q});return[1,2,3,4,5,6].includes(l)?t.jsx(J,{...E("root"),component:`h${l}`,variant:B,ref:e,mod:[{order:l,"data-line-clamp":typeof L=="number"},F],size:A,...R}):null});C.classes=$;C.displayName="@mantine/core/Title";const ee=(...[n])=>new Proxy({},{get:(e,o)=>a=>({type:o,data:a,...n==null?void 0:n({type:o,data:a})})}),s=ee(),r=n=>n,d=n=>n,te=d({id:"hello",title:"Hello",description:"First blog post",date:"14.08.2024"});function u(n){const e={h1:"h1",p:"p",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.h1,{children:"Hello!"}),`
`,t.jsx(e.p,{children:"Welcome to by blog! :3"}),`
`,t.jsx(e.p,{children:"I have 2 WIP articles as of writing this, dont worry haha"})]})}function ne(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(u,{...n})}):u(n)}const se=Object.freeze(Object.defineProperty({__proto__:null,data:te,default:ne},Symbol.toStringTag,{value:"Module"})),oe=d({id:"internship",title:"That Time I Had an Internship of 2 Days",description:"yeah",date:"2024.08.08"});function p(n){const e={em:"em",p:"p",strong:"strong",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"Hi! It's me, Deniz, im currently bored at metro so I decided I would actually start writing blog posts."}),`
`,t.jsx(e.p,{children:"Now, a bit of context: the type of highschool that i went to does not provide internships. The friendly government that contains my school, however, does a mini internship available to students studying in my type of highschools."}),`
`,t.jsx(e.p,{children:"I applied the first time I heard about it, they called me over and I had to basically fill some forms and do a small interview. A few weeks after that I was accepted! 🎉"}),`
`,t.jsxs(e.p,{children:["I remember the first day of the event. It was raining a lot, I got up at a time I ",t.jsx(e.em,{children:"never"})," woke up in before. Now, from my house to the where I need to go is kinda far (10 kilometers or so) and they previously sent out a table of private bus services for us to get in contact with and possibly use. I did talk with the driver that goes near my house, and we agreed on a pickup spot."]}),`
`,t.jsxs(e.p,{children:["At ",t.jsx(e.strong,{children:"6:50"}),' am, I was at the pickup spot. The infographic they sent had "',t.jsx(e.strong,{children:"7:00"}),' am" written as their starting time. 20 minutes after I arrived, ',t.jsx(e.strong,{children:"7:10"})," am, the bus driver still wasn't there. I started panicking."]}),`
`,t.jsxs(e.p,{children:["I called the bus driver, no response. At ",t.jsx(e.strong,{children:"7:20"}),"am, I saw the bus! But uh, the bus ",t.jsx(e.em,{children:"didnt"})," stop, or even ",t.jsx(e.em,{children:"slow down"})," for that matter. I screamed after it I think, but the bus just kept going."]}),`
`,t.jsx(e.p,{children:"I was frustrated, I hopped on one of the public busses and started to go on my own. I was texting them telling what happened. At one point, the bus driver called me back! ...explaining how he was asleep and that apparently someone else took the route?? Awesome."})]})}function re(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(p,{...n})}):p(n)}const ae=Object.freeze(Object.defineProperty({__proto__:null,data:oe,default:re},Symbol.toStringTag,{value:"Module"})),ie=d({id:"enum-lib",title:"TypeScript Algebraic Enums",description:"I made an npm library: @alan404/enum",date:"14.08.2024"});function m(n){const e={p:"p",...n.components};return t.jsx(e.p,{children:"meow"})}function ce(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(m,{...n})}):m(n)}const le=Object.freeze(Object.defineProperty({__proto__:null,data:ie,default:ce},Symbol.toStringTag,{value:"Module"})),de=r({id:"nbs-js",name:"nbs.js",shortDesc:"NBS parser in Javascript",year:"2021",status:"archive",buttons:[s.repo("deniz-blue/nbs.js"),s.npm("nbs.js")],tech:["js"],types:["library"],primaryImage:"/assets/img/proj/nbs-js.png"});function h(n){const e={code:"code",p:"p",pre:"pre",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"This is REALLY old"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-js",children:`const NBS = require("nbs.js")

let song = NBS.loadSong("./song.nbs")

console.log(song)
`})})]})}function ue(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(h,{...n})}):h(n)}const pe=Object.freeze(Object.defineProperty({__proto__:null,data:de,default:ue},Symbol.toStringTag,{value:"Module"})),me=r({id:"denvis",name:"DenVis",shortDesc:"A simple Windows Audio Visualizer",primaryImage:"/assets/img/proj/denvis.png",year:"2022",status:"wip",buttons:[s.repo("deniz-blue/DenVis"),s.website("https://denvis.glitch.me/")],tech:["cs"],types:["desktop"]});function g(n){const e={a:"a",img:"img",p:"p",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:t.jsx(e.img,{src:"/assets/img/proj/denvis.png",alt:""})}),`
`,t.jsx(e.p,{children:"I like Audio-Visual stuff so I added this equalizer-style thing to my desktop. Updates in real time of course."}),`
`,t.jsx(e.p,{children:`It uses .NET/C# and some Windows API's to render a transparent window overlay and some interesting math stuff
(Fourier Transform) to render the bar.`}),`
`,t.jsx(e.p,{children:"It can also render snow!"}),`
`,t.jsxs(e.p,{children:[`For settings, I didn't want to bother with rendering UI in
C# so I expose a websocket in the app and made a `,t.jsx(e.a,{href:"https://denvis.glitch.me/",children:"website"})," for it :P"]}),`
`,t.jsx(e.p,{children:"I do want to rewrite this in Rust sometime, making it platform-independent."})]})}function he(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(g,{...n})}):g(n)}const ge=Object.freeze(Object.defineProperty({__proto__:null,data:me,default:he},Symbol.toStringTag,{value:"Module"})),be=r({id:"paginated-selects",name:"PaginatedSelects",shortDesc:"A DSharpPlus extension that adds paginated select components",year:"2022",status:"archive",buttons:[s.repo("deniz-blue/DSharpPlus.PaginatedSelects")],tech:["cs"],types:["library"]});function b(n){const e={a:"a",code:"code",p:"p",pre:"pre",...n.components};return t.jsxs(t.Fragment,{children:[t.jsxs(e.p,{children:["This is a really old ",t.jsx(e.a,{href:"https://dsharpplus.github.io/DSharpPlus/",children:"DSharpPlus"})," extension that adds paginated select components"]}),`
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
`})})]})}function je(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(b,{...n})}):b(n)}const fe=Object.freeze(Object.defineProperty({__proto__:null,data:be,default:je},Symbol.toStringTag,{value:"Module"})),ye=r({id:"want-you-gone",name:"Want You Gone",shortDesc:"Portal 2 ending credits song animation recreated using HTML",year:"2022",status:"archive",primaryImage:"/assets/img/proj/wantyougone.png",buttons:[s.website("https://deniz.blue/want-you-gone/"),s.repo("deniz-blue/want-you-gone")],tech:["html","css","js"],types:["website"]});function j(n){const e={img:"img",p:"p",...n.components};return t.jsx(e.p,{children:t.jsx(e.img,{src:"/assets/img/proj/wantyougone.png",alt:""})})}function xe(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(j,{...n})}):j(n)}const _e=Object.freeze(Object.defineProperty({__proto__:null,data:ye,default:xe},Symbol.toStringTag,{value:"Module"})),we=r({id:"mcman",name:"mcman",shortDesc:"A powerful Minecraft Server Management CLI which allows you to use git and many other things",year:"2023",status:"ok",primaryImage:"https://mcman.deniz.blue/mcman-3.png",buttons:[s.repo("ParadigmMC/mcman"),s.docs("https://mcman.deniz.blue/")],tech:["rust"],types:["cli","library"]});function f(n){const e={code:"code",img:"img",p:"p",...n.components};return t.jsxs(t.Fragment,{children:[t.jsxs(e.p,{children:[t.jsx(e.code,{children:"mcman"})," allows you to use ",t.jsx(e.code,{children:"git"})," to version-control your minecraft servers ✨"]}),`
`,t.jsxs(e.p,{children:[`it does this by its own config format and build process that auto-downloads and updates any plugins/mods/worlds/etc
and by seperating actual plugin/mod config files from `,t.jsx(e.code,{children:"jar"})," files"]}),`
`,t.jsx(e.p,{children:t.jsx(e.img,{src:"https://mcman.deniz.blue/mcman-3.png",alt:""})})]})}function ve(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(f,{...n})}):f(n)}const Me=Object.freeze(Object.defineProperty({__proto__:null,data:we,default:ve},Symbol.toStringTag,{value:"Module"})),Se=r({id:"oaalmun",name:"OAALMUN",shortDesc:"MUN (Model United Nations) website for my school (commission)",year:"2023",status:"ok",buttons:[s.website("https://mun.oaal.com.tr")],tech:["js","ts","react","vite"],types:["website"],primaryImage:"/assets/img/proj/oaalmun.png"});function y(n){const e={em:"em",p:"p",strong:"strong",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"I still haven't got my payment of 2 toasts at the canteen for this"}),`
`,t.jsxs(e.p,{children:["For the record, ",t.jsx(e.em,{children:t.jsx(e.strong,{children:"no"})}),", I was not a part of any MUN's."]})]})}function Te(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(y,{...n})}):y(n)}const De=Object.freeze(Object.defineProperty({__proto__:null,data:Se,default:Te},Symbol.toStringTag,{value:"Module"})),ze=r({id:"alphamath",name:"alphamath",shortDesc:"An experimental interactive math engine/solver",year:"2024",status:"wip",buttons:[s.website("https://deniz.blue/alphamath/"),s.repo("deniz-blue/alphamath")],tech:["ts","react","vite"],types:["website","library"],hide:!0});function x(n){const e={p:"p",...n.components};return t.jsx(e.p,{children:"Skip this, its a giant WIP"})}function ke(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(x,{...n})}):x(n)}const Ie=Object.freeze(Object.defineProperty({__proto__:null,data:ze,default:ke},Symbol.toStringTag,{value:"Module"})),$e=r({id:"carpanga",name:"Çarpanga",shortDesc:"A 1v1 mathematical strategy game",year:"2024",status:"up",buttons:[s.website("https://carpanga.deniz.blue/"),s.repo("deniz-blue/carpanga")],tech:["ts","react","vite"],types:["website"],primaryImage:"/assets/img/proj/carpanga.png"});function _(n){const e={img:"img",p:"p",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"Goal: Get 3 in a row"}),`
`,t.jsx(e.p,{children:"The number your opponent picked on their turn will be multiplied with your choice. You take the result if it exists on the board."}),`
`,t.jsx(e.p,{children:"My classmates really liked this little game haha"}),`
`,t.jsx(e.p,{children:t.jsx(e.img,{src:"/assets/img/proj/carpanga.png",alt:""})})]})}function Ce(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(_,{...n})}):_(n)}const Pe=Object.freeze(Object.defineProperty({__proto__:null,data:$e,default:Ce},Symbol.toStringTag,{value:"Module"})),Oe=r({id:"discord-jsx",name:"discord-jsx",shortDesc:"A library that allows you to use React/JSX inside your discord bot projects",year:"2024",status:"ok",buttons:[s.repo("deniz-blue/discord-jsx"),s.npm("@alan404/discordjsx")],tech:["ts","react","nodejs"],types:["library"],primaryImage:"/assets/img/proj/discordjsx.png"});function w(n){const e={a:"a",code:"code",p:"p",pre:"pre",strong:"strong",...n.components};return t.jsxs(t.Fragment,{children:[t.jsxs(e.p,{children:["This project uses ",t.jsx(e.a,{href:"https://www.npmjs.com/package/react-reconciler",children:"react-reconciler"})," to render React components into discord messages."]}),`
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
`})})]})}function Xe(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(w,{...n})}):w(n)}const Ne=Object.freeze(Object.defineProperty({__proto__:null,data:Oe,default:Xe},Symbol.toStringTag,{value:"Module"})),Ae=r({id:"istanbus",name:"Istanbus",shortDesc:"Istanbul Bus Information website (IETT)",year:"2024",status:"up",buttons:[s.website("https://istanbus.deniz.blue/"),s.repo("deniz-blue/istanbus")],tech:["ts","react","nodejs"],types:["website","restapi"]});function v(n){const e={p:"p",...n.components};return t.jsx(e.p,{children:"IETT but better idk"})}function Be(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(v,{...n})}):v(n)}const Le=Object.freeze(Object.defineProperty({__proto__:null,data:Ae,default:Be},Symbol.toStringTag,{value:"Module"})),Fe=r({id:"minecraft-assets",name:"minecraft-assets",shortDesc:"TypeScript library providing minecraft assets (block states, models and textures)",year:"2024",status:"up",buttons:[s.npm("@alan404/minecraft-assets"),s.repo("deniz-blue/minecraft-assets-ts")],tech:["ts"],types:["library"]});function M(n){const e={a:"a",p:"p",...n.components};return t.jsxs(e.p,{children:[t.jsx(e.a,{href:"https://www.npmjs.com/package/minecraft-data",children:"minecraft-data"}),` is NodeJS-only so I made this quickly,
it works on browsers plus its ✨ ESM ✨`]})}function Re(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(M,{...n})}):M(n)}const Ee=Object.freeze(Object.defineProperty({__proto__:null,data:Fe,default:Re},Symbol.toStringTag,{value:"Module"})),We=r({id:"nbt-ts",name:"nbt",shortDesc:"TypeScript library for serializing and deserializing NBT",year:"2024",status:"ok",primaryImage:"/assets/img/proj/nbt-ts.png",buttons:[s.npm("@alan404/nbt"),s.repo("deniz-blue/nbt-ts")],tech:["ts"],types:["library"]});function S(n){const e={a:"a",code:"code",p:"p",pre:"pre",strong:"strong",...n.components};return t.jsxs(t.Fragment,{children:[t.jsxs(e.p,{children:[t.jsx(e.a,{href:"https://minecraft.wiki/w/NBT_format",children:"Named Binary Tag (NBT)"}),` is a data format used
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
`,t.jsx(e.p,{children:"See README for more details."})]})}function He(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(S,{...n})}):S(n)}const Ue=Object.freeze(Object.defineProperty({__proto__:null,data:We,default:He},Symbol.toStringTag,{value:"Module"})),Ge=r({id:"nekotube",name:"NekoTube",shortDesc:"an alternative YouTube video player",year:"2024",status:"",buttons:[s.website("https://tube.deniz.blue/"),s.repo("deniz-blue/nekotube")],tech:["js","react","vite"],types:["website"],primaryImage:"/assets/img/proj/nekotube.png"});function T(n){const e={a:"a",p:"p",strong:"strong",...n.components},{Alert:o}=e;return o||Ve("Alert"),t.jsxs(t.Fragment,{children:[t.jsx(o,{variant:"outline",color:"yellow",children:t.jsxs(e.p,{children:["Since YouTube started ",t.jsx(e.a,{href:"https://github.com/iv-org/invidious/issues/4734",children:"being more strict"}),`
invidious instances have become more scarce, so this project doesn't work that much anymore.`]})}),`
`,t.jsx(o,{variant:"outline",color:"yellow",children:t.jsxs(e.p,{children:["LightTube also ",t.jsx(e.a,{href:"https://blog.kuylar.dev/lighttube-end-of-development/",children:"stopped development"})]})}),`
`,t.jsxs(e.p,{children:["NekoTube is an alternative YouTube frontend. It uses other third party API's such as ",t.jsx(e.a,{href:"https://invidious.io/",children:"Invidious"}),`
and `,t.jsx(e.a,{href:"https://lighttube.org/",children:"LightTube"}),"."]}),`
`,t.jsxs(e.p,{children:["The most notable feature of NekoTube was the ability to use a ",t.jsx(e.strong,{children:"comment"})," as a source of ",t.jsx(e.strong,{children:"chapters"})]})]})}function Je(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(T,{...n})}):T(n)}function Ve(n,e){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}const Ye=Object.freeze(Object.defineProperty({__proto__:null,data:Ge,default:Je},Symbol.toStringTag,{value:"Module"})),qe=r({id:"polycules",name:"Polycules",shortDesc:"A website to graph 'polycules'",year:"2024",status:"up",buttons:[s.website("https://poly.deniz.blue"),s.repo("deniz-blue/polycules")],tech:["ts","react","vite","nodejs"],types:["website"],primaryImage:"/assets/img/proj/polycules.png"});function D(n){const e={a:"a",p:"p",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx("iframe",{src:"https://poly.deniz.blue/default",width:"100%",height:"300",loading:"lazy",style:{border:"0",borderRadius:"0.5rem"}}),`
`,t.jsxs(e.p,{children:["This is basically ",t.jsx(e.a,{href:"https://polycul.es/",children:"polycul.es"})," but its more mobile-friendly and supports DID/OSDD/plurality/systems."]}),`
`,t.jsx(e.p,{children:"Made as a request from my friends who are polyamorous"})]})}function Ze(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(D,{...n})}):D(n)}const Ke=Object.freeze(Object.defineProperty({__proto__:null,data:qe,default:Ze},Symbol.toStringTag,{value:"Module"})),Qe=r({id:"react-workspace",name:"react-workspace",shortDesc:"Infinitely pannable, accessible map-like workspace for React",year:"2024",status:"ok",primaryImage:"/assets/img/proj/workspace.png",buttons:[s.npm("@alan404/react-workspace"),s.repo("deniz-blue/react-workspace")],tech:["ts","react"],types:["website"]});function z(n){const e={a:"a",p:"p",...n.components};return t.jsxs(e.p,{children:["Used by ",t.jsx(e.a,{href:"/projects/alphamath",children:"alphamath"})," and ",t.jsx(e.a,{href:"/projects/polycules",children:"Polycules"})]})}function et(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(z,{...n})}):z(n)}const tt=Object.freeze(Object.defineProperty({__proto__:null,data:Qe,default:et},Symbol.toStringTag,{value:"Module"})),nt=r({id:"ziltek",name:"ZilTek",shortDesc:"A school bell app for schools",year:"2024",status:"up",buttons:[s.website("https://ziltek.deniz.blue/"),s.repo("deniz-blue/ZilTek")],tech:["ts","react","vite","nodejs"],types:["website","desktop"],primaryImage:"/assets/img/proj/ziltekscreenshot.png"});function k(n){const e={img:"img",li:"li",p:"p",ul:"ul",...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"ZilTek plays school bells."}),`
`,t.jsx(e.p,{children:"Features:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Available offline"}),`
`,t.jsx(e.li,{children:"Web app"}),`
`,t.jsx(e.li,{children:"Desktop app"}),`
`,t.jsx(e.li,{children:"Remote control"}),`
`,t.jsx(e.li,{children:"No limits"}),`
`,t.jsx(e.li,{children:"Free"}),`
`]}),`
`,t.jsx(e.p,{children:t.jsx(e.img,{src:"/assets/img/proj/ziltekscreenshot.png",alt:""})})]})}function st(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(k,{...n})}):k(n)}const ot=Object.freeze(Object.defineProperty({__proto__:null,data:nt,default:st},Symbol.toStringTag,{value:"Module"})),rt="deniz.blue",at=n=>`https://${n}.${rt}/`,it=r({id:"events",name:"Deniz'in Etkinlik Sitesi",shortDesc:"A website for finding out about events",year:"2025",status:"wip",buttons:[s.website(at("events"))],tech:["ts","vite","react","mongodb","prisma","nodejs"],types:["website","restapi"],primaryImage:"/assets/img/proj/events.png"});function I(n){const e={p:"p",...n.components},{Group:o}=e;return o||lt("Group"),t.jsxs(t.Fragment,{children:[t.jsx(e.p,{children:"A website im making so people can find events and such"}),`
`,t.jsx(e.p,{children:"It's Turkish only (maybe for now)"}),`
`,t.jsx(e.p,{children:"Here's an event I went to, displayed by my site:"}),`
`,t.jsx(o,{justify:"center",children:t.jsx("iframe",{src:"https://events.deniz.blue/embed/events/675423692476197849d7f5f8",width:"400",height:"400",loading:"lazy",style:{border:"0",borderRadius:"0.5rem"}})})]})}function ct(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(I,{...n})}):I(n)}function lt(n,e){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}const dt=Object.freeze(Object.defineProperty({__proto__:null,data:it,default:ct},Symbol.toStringTag,{value:"Module"})),P=n=>Object.fromEntries(Object.entries(n).map(([e,o])=>[o.data.id,o]).filter(([e])=>e[0]!=="_"));P(Object.assign({"./blog/Hello.mdx":se,"./blog/_Internship.mdx":ae,"./blog/_LibraryEnum.mdx":le}));const gt=P(Object.assign({"./proj/2021/nbs-js.mdx":pe,"./proj/2022/denvis.mdx":ge,"./proj/2022/paginated-selects.mdx":fe,"./proj/2022/want-you-gone.mdx":_e,"./proj/2023/mcman.mdx":Me,"./proj/2023/oaalmun.mdx":De,"./proj/2024/alphamath.mdx":Ie,"./proj/2024/carpanga.mdx":Pe,"./proj/2024/discord-jsx.mdx":Ne,"./proj/2024/istanbus.mdx":Le,"./proj/2024/minecraft-assets.mdx":Ee,"./proj/2024/nbt-ts.mdx":Ue,"./proj/2024/nekotube.mdx":Ye,"./proj/2024/polycules.mdx":Ke,"./proj/2024/react-workspace.mdx":tt,"./proj/2024/ziltek.mdx":ot,"./proj/2025/events.mdx":dt}));export{gt as D,C as T};
