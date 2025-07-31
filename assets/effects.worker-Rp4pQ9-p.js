(function(){"use strict";const D=e=>i(e,e),i=(e,t)=>typeof e=="object"&&e!==null?{x:e.x||0,y:e.y||0}:{x:e||0,y:t||0},f=e=>typeof e=="object"&&e?i(e):D(e),d=(...e)=>e.map(f).reduce((t,o)=>i(t.x+o.x,t.y+o.y)),y=(...e)=>e.map(f).reduce((t,o)=>i(t.x*o.x,t.y*o.y)),p=(e,t)=>d(e,y(t,-1)),T=(e,t)=>{let o=f(e),n=f(t);return i(o.x/n.x,o.y/n.y)},C=e=>{let t=f(e);return Math.sqrt(t.x**2+t.y**2)},L=e=>T(e,C(e));i(0,0),i(1,1);const M=e=>t=>t[e.type]?t[e.type](e.data):t._(),b=(e=1)=>Math.round(Math.random()*e),m=(e=1)=>Math.random()*e,B=(e,t)=>Math.random()>.5?e:t,S=(e,t,o)=>Math.min(Math.max(e,t),o),v=(e,t,o)=>e+(t-e)*o;class O{texture=0;position=i();opacity=1;NodeIndex=0;NodePercent=0;Distance=0;Sine=0;constructor(){let t=m(1);this.NodeIndex=b(_-1),this.NodePercent=m(1),this.Distance=4+t*20,this.Sine=m(Math.PI*2),this.texture=Math.floor(S(0,Math.pow(1-t,3)*4,3)),this.opacity=v(.6,0,t*.5)}}const _=15,R=e=>{let t=[],o=m(e.y),n=0;for(;_>n;)n++,t.push(o),o+=B(-1,1)*(32+m(24*(e.y/360)*2));for(let r=0;r<4;r++)t[t.length-1-r]=v(t[t.length-1-r],t[0],S(0,1-r/4,1));return t},I=i(320,180);class F{stars=[];yNodes=R(I);color="#ffffff";flowSpeed=1;stepSize=32;constructor(){this.stars=Array(128).fill(0).map(()=>new O),this.stars.forEach(t=>t.position=this.targetOfStar(t))}resize(t=I){return this.yNodes=R(t),this.stepSize=t.x/10,this.stars.forEach(o=>o.position=this.targetOfStar(o)),this}update(t=1){for(let o of this.stars){let n=this.targetOfStar(o);o.Sine+=t*this.flowSpeed,o.NodePercent+=t*.25*this.flowSpeed,o.NodePercent>=1&&(o.NodePercent-=1,o.NodeIndex++,o.NodeIndex>=_-1&&(o.NodeIndex=0,o.position.x=0)),o.position=d(o.position,T(p(n,o.position),i(50,50)))}}targetOfStar(t){let o={x:t.NodeIndex*this.stepSize,y:this.yNodes[t.NodeIndex]},n={x:(t.NodeIndex+1)*this.stepSize,y:this.yNodes[t.NodeIndex+1]},r=d(o,y(p(n,o),i(t.NodePercent))),a=L(p(n,o));return{x:r.x+-a.x*t.Distance*Math.sin(t.Sine),y:r.y+a.y*t.Distance*Math.sin(t.Sine)}}static ScreenPosOfStar(t,o=i(448,212)){const n=(a,s)=>i(a.x%s.x,a.y%s.y),r=(a,s)=>n(d(n(a,s),s),s);return p(d(i(-64,-16),r(t.position,o)),16)}}var z=`attribute vec2 a_position;
attribute float a_textureIndex;
attribute float a_opacity;
uniform float u_pointSize;
uniform vec2 u_scroll;
uniform vec2 u_dim;
uniform vec2 u_scrollPosition;
varying float v_opacity;
varying float v_flash;
varying float v_textureIndex;
uniform vec2 u_mousePosition;

void main() {
    gl_PointSize = u_pointSize;

    vec2 position = mod(a_position - u_scrollPosition * u_scroll, u_dim);

    //float mouseDistance = sqrt(pow(position.x - u_mousePosition.x, 2.0) + pow(position.y - u_mousePosition.y, 2.0));
    // float threshold = 50.0;
    // float moveDistance = max(0.0, threshold - mouseDistance);
    // vec2 directionToMouse = normalize(position - u_mousePosition);
    // vec2 moveAway = directionToMouse * moveDistance * 1.0;
    // position += moveAway;

    vec2 clipSpace = ((position / u_dim) * 2.0) - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    // Pass attributes to the fragment shader
    v_opacity = a_opacity;
    v_textureIndex = a_textureIndex;
    // v_flash = mouseDistance / 50.0;
}
`,G=`precision mediump float;
uniform sampler2D u_textures[4];
uniform vec3 u_color;
uniform float u_flash;
varying float v_flash;
varying float v_opacity;
varying float v_textureIndex;

void main() {
    vec4 textureColor;

    int texIndex = int(floor(v_textureIndex + 0.5));

    if (texIndex == 0) {
        textureColor = texture2D(u_textures[0], gl_PointCoord);
    } else if (texIndex == 1) {
        textureColor = texture2D(u_textures[1], gl_PointCoord);
    } else if (texIndex == 2) {
        textureColor = texture2D(u_textures[2], gl_PointCoord);
    }  else if (texIndex == 3) {
        textureColor = texture2D(u_textures[3], gl_PointCoord);
    } else {
        // Fallback
        textureColor = vec4(1.0, 0.0, 0.0, 1.0);
    }

    gl_FragColor = vec4(
        (textureColor.rgb * u_color + (
            textureColor.a * u_flash * v_flash * vec3(1.0,1.0,1.0)
        )),
        textureColor.a * v_opacity + ((textureColor.a * u_flash) / 3.0)
    );
}
`;const E=(e,t,o,n,r=1)=>{e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,new Float32Array(n),e.STATIC_DRAW),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,r,e.FLOAT,!1,0,0)},U=(e,t,o)=>{const n=e.createShader(t);return n?(e.shaderSource(n,o),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS)?n:(console.error("SHADER COMPILATION ERROR",o),console.error(e.getShaderInfoLog(n)),e.deleteShader(n),null)):null},X=(e,t)=>{const o=e.createProgram();for(let n of t)e.attachShader(o,n);return e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)?o:(console.error(e.getProgramInfoLog(o)),e.deleteProgram(o),null)},Q=(e,t)=>{const o=e.createTexture();return e.bindTexture(e.TEXTURE_2D,o),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),(async()=>{const a=await(await fetch(t)).blob(),s=await createImageBitmap(a);e.bindTexture(e.TEXTURE_2D,o),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST)})(),o},V=["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHUlEQVR4Ae3OAQ0AAAABMP1Lo4UxT3Dg1tGqwhcjpd4D/epMC1wAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIklEQVR4Ae3MsQ0AAAzCMP5/uuUHGBDCewJMuCM5tkym3gOLZg/xodIpmQAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVR4Ae3PSwoAAAQEUNz/zlgrn5KymLc2MyGCW+q6G9mO8HSZ3bgglmTh9oUqCJ8YQAgMB0rhaRAAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVR4Ae2RSw4AMAREjfvfuZV01/hNbL0140FkSTlGVYNOMwwqwJschYBW/oLA7O1ZjFfQ7vEiM610sw8sjwsTECAKHmlhcAAAAABJRU5ErkJggg=="],Y=e=>{const t=X(e,[U(e,e.VERTEX_SHADER,z),U(e,e.FRAGMENT_SHADER,G)]),o=V.map(a=>Q(e,a)),n={color:e.getUniformLocation(t,"u_color"),dim:e.getUniformLocation(t,"u_dim"),flash:e.getUniformLocation(t,"u_flash"),scroll:e.getUniformLocation(t,"u_scroll"),scrollPosition:e.getUniformLocation(t,"u_scrollPosition"),mousePosition:e.getUniformLocation(t,"u_mousePosition"),pointSize:e.getUniformLocation(t,"u_pointSize"),opacity:e.getAttribLocation(t,"a_opacity"),position:e.getAttribLocation(t,"a_position"),textureIndex:e.getAttribLocation(t,"a_textureIndex")},r={texture:e.createBuffer(),opacity:e.createBuffer(),position:e.createBuffer()};return{program:t,textures:o,bindings:n,buffers:r}},k=(e,{bindings:t,buffers:o,program:n,textures:r},{dimensions:a,scrollPosition:s,starfields:K})=>{e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.blendEquation(e.FUNC_ADD),e.enable(e.BLEND),e.useProgram(n),e.uniform1f(t.flash,0),e.uniform2f(t.dim,a.x,a.y),e.uniform2f(t.scrollPosition,s.x,s.y),e.uniform1f(t.pointSize,32),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r[0]),e.uniform1i(e.getUniformLocation(n,"u_textures[0]"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,r[1]),e.uniform1i(e.getUniformLocation(n,"u_textures[1]"),1),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,r[2]),e.uniform1i(e.getUniformLocation(n,"u_textures[2]"),2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,r[3]),e.uniform1i(e.getUniformLocation(n,"u_textures[3]"),3);for(let x of K){const j=parseInt(x.color.slice(0,2),16)/255,J=parseInt(x.color.slice(2,4),16)/255,W=parseInt(x.color.slice(4,6),16)/255;e.uniform3f(t.color,j,J,W);const w=[],P=[],N=[];x.stars.forEach(h=>{w.push(h.position.x,h.position.y),P.push(h.opacity),N.push(h.texture)}),E(e,t.position,o.position,new Float32Array(w),2),E(e,t.opacity,o.opacity,new Float32Array(P)),E(e,t.textureIndex,o.texture,new Float32Array(N)),e.drawArrays(e.POINTS,0,x.stars.length)}},q=(e,t)=>{let o=performance.now();const n=()=>{const a=performance.now();if(a-o>=t){let s=(a-o)/1e3;s>1&&(s%=1e3),e(s),o=performance.now()}r=requestAnimationFrame(n)};let r=requestAnimationFrame(n);return()=>cancelAnimationFrame(r)};let l=[{color:"ab6ffa",scroll:i(.3,.3)},{color:"71d5ff",scroll:i(.3,.3),flowSpeed:2.5},{color:"53f3dd",scroll:i(.5,.5)},{color:"cefdff",scroll:i(.5,.5),flowSpeed:3}].map(({color:e})=>{let t=new F;return t.color=e,t}),c,A,u;const H=()=>{if(!c)throw new Error("dim not initialized");if(!A)throw new Error("canvas not initialized");if(u=A.getContext("webgl2",{antialias:!1,powerPreference:"low-power",desynchronized:!0,failIfMajorPerformanceCaveat:!0}),!u)throw new Error("GL2 failed to init");for(let t of l)t.resize(c);for(let t of l)t.update(1);u.viewport(0,0,c.x,c.y),self.postMessage({type:"initialized"});let e=Y(u);console.log("worker: gl2 init complete"),q(t=>{u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT);for(let o of l)o.update(t);k(u,e,{dimensions:c,scrollPosition:i(),starfields:l})},24)};self.onmessage=e=>{const t=e.data;M(t)({init:o=>{c=i(o.width,o.height),A=o,H()},dimensionsChange:o=>{c=o,A&&(A.width=c.x,A.height=c.y),u&&u.viewport(0,0,c.x,c.y);for(let n of l)n.resize(c)},_:()=>{}})}})();
