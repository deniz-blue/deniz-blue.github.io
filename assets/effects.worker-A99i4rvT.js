(function(){"use strict";const L=e=>i(e,e),i=(e,t)=>typeof e=="object"&&e!==null?{x:e.x||0,y:e.y||0}:{x:e||0,y:t||0},x=e=>typeof e=="object"&&e?i(e):L(e),m=(...e)=>e.map(x).reduce((t,o)=>i(t.x+o.x,t.y+o.y)),T=(...e)=>e.map(x).reduce((t,o)=>i(t.x*o.x,t.y*o.y)),p=(e,t)=>m(e,T(t,-1)),R=(e,t)=>{let o=x(e),r=x(t);return i(o.x/r.x,o.y/r.y)},M=e=>{let t=x(e);return Math.sqrt(t.x**2+t.y**2)},B=e=>R(e,M(e));i(0,0),i(1,1);const b=e=>t=>t[e.type]?t[e.type](e.data):t._(),O=(e=1)=>Math.round(Math.random()*e),l=(e=1)=>Math.random()*e,F=(e,t)=>Math.random()>.5?e:t,S=(e,t,o)=>Math.min(Math.max(e,t),o),v=(e,t,o)=>e+(t-e)*o;class z{texture=0;position=i();opacity=1;NodeIndex=0;NodePercent=0;Distance=0;Sine=0;constructor(){let t=l(1);this.NodeIndex=O(E-1),this.NodePercent=l(1),this.Distance=4+t*20,this.Sine=l(Math.PI*2),this.texture=Math.floor(S(0,Math.pow(1-t,3)*4,3)),this.opacity=v(.6,0,t*.5)}}const E=15,I=e=>{let t=[],o=l(e.y),r=0;for(;E>r;)r++,t.push(o),o+=F(-1,1)*(32+l(24*(e.y/360)*2));for(let n=0;n<4;n++)t[t.length-1-n]=v(t[t.length-1-n],t[0],S(0,1-n/4,1));return t},U=i(320,180);class f{stars=[];yNodes=I(U);color="#ffffff";flowSpeed=1;scroll=i();stepSize=32;constructor(t,o,r){t&&(this.color=t),o&&(this.scroll=o),r&&(this.flowSpeed=r),this.stars=Array(128).fill(0).map(()=>new z),this.stars.forEach(n=>n.position=this.targetOfStar(n))}resize(t=U){return this.yNodes=I(t),this.stepSize=t.x/10,this.stars.forEach(o=>o.position=this.targetOfStar(o)),this}update(t=1){for(let o of this.stars){let r=this.targetOfStar(o);o.Sine+=t*this.flowSpeed,o.NodePercent+=t*.25*this.flowSpeed,o.NodePercent>=1&&(o.NodePercent-=1,o.NodeIndex++,o.NodeIndex>=E-1&&(o.NodeIndex=0,o.position.x=0)),o.position=m(o.position,R(p(r,o.position),i(50,50)))}}targetOfStar(t){let o={x:t.NodeIndex*this.stepSize,y:this.yNodes[t.NodeIndex]},r={x:(t.NodeIndex+1)*this.stepSize,y:this.yNodes[t.NodeIndex+1]},n=m(o,T(p(r,o),i(t.NodePercent))),a=B(p(r,o));return{x:n.x+-a.x*t.Distance*Math.sin(t.Sine),y:n.y+a.y*t.Distance*Math.sin(t.Sine)}}static ScreenPosOfStar(t,o=i(448,212)){const r=(a,s)=>i(a.x%s.x,a.y%s.y),n=(a,s)=>r(m(r(a,s),s),s);return p(m(i(-64,-16),n(t.position,o)),16)}static createDefaultLayers(){return[new f("ab6ffa",i(.3,.3),.8),new f("71d5ff",i(.3,.3),1.1),new f("53f3dd",i(.5,.5),.8),new f("cefdff",i(.5,.5),1.2)]}}var G=`attribute vec2 a_position;
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

    vec2 clipSpace = ((position / u_dim) * 2.0) - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    // Pass attributes to the fragment shader

    v_opacity = a_opacity;
    v_textureIndex = a_textureIndex;
}
`,X=`precision mediump float;
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
`;const y=(e,t,o,r,n=1)=>{e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,n,e.FLOAT,!1,0,0)},w=(e,t,o)=>{const r=e.createShader(t);return r?(e.shaderSource(r,o),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error("SHADER COMPILATION ERROR",o),console.error(e.getShaderInfoLog(r)),e.deleteShader(r),null)):null},Q=(e,t)=>{const o=e.createProgram();for(let r of t)e.attachShader(o,r);return e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)?o:(console.error(e.getProgramInfoLog(o)),e.deleteProgram(o),null)},V=(e,t)=>{const o=e.createTexture();return e.bindTexture(e.TEXTURE_2D,o),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),(async()=>{const a=await(await fetch(t)).blob(),s=await createImageBitmap(a);e.bindTexture(e.TEXTURE_2D,o),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST)})(),o},Y=["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHUlEQVR4Ae3OAQ0AAAABMP1Lo4UxT3Dg1tGqwhcjpd4D/epMC1wAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIklEQVR4Ae3MsQ0AAAzCMP5/uuUHGBDCewJMuCM5tkym3gOLZg/xodIpmQAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVR4Ae3PSwoAAAQEUNz/zlgrn5KymLc2MyGCW+q6G9mO8HSZ3bgglmTh9oUqCJ8YQAgMB0rhaRAAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVR4Ae2RSw4AMAREjfvfuZV01/hNbL0140FkSTlGVYNOMwwqwJschYBW/oLA7O1ZjFfQ7vEiM610sw8sjwsTECAKHmlhcAAAAABJRU5ErkJggg=="],k=e=>{const t=Q(e,[w(e,e.VERTEX_SHADER,G),w(e,e.FRAGMENT_SHADER,X)]),o=Y.map(a=>V(e,a)),r={color:e.getUniformLocation(t,"u_color"),dim:e.getUniformLocation(t,"u_dim"),flash:e.getUniformLocation(t,"u_flash"),scroll:e.getUniformLocation(t,"u_scroll"),scrollPosition:e.getUniformLocation(t,"u_scrollPosition"),mousePosition:e.getUniformLocation(t,"u_mousePosition"),pointSize:e.getUniformLocation(t,"u_pointSize"),opacity:e.getAttribLocation(t,"a_opacity"),position:e.getAttribLocation(t,"a_position"),textureIndex:e.getAttribLocation(t,"a_textureIndex")},n={texture:e.createBuffer(),opacity:e.createBuffer(),position:e.createBuffer()};return{program:t,textures:o,bindings:r,buffers:n}},H=(e,{bindings:t,buffers:o,program:r,textures:n},{dimensions:a,scrollPosition:s,starfields:j})=>{e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.blendEquation(e.FUNC_ADD),e.enable(e.BLEND),e.useProgram(r),e.uniform1f(t.flash,0),e.uniform2f(t.dim,a.x,a.y),e.uniform2f(t.scrollPosition,s.x,s.y),e.uniform1f(t.pointSize,32),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,n[0]),e.uniform1i(e.getUniformLocation(r,"u_textures[0]"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,n[1]),e.uniform1i(e.getUniformLocation(r,"u_textures[1]"),1),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,n[2]),e.uniform1i(e.getUniformLocation(r,"u_textures[2]"),2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,n[3]),e.uniform1i(e.getUniformLocation(r,"u_textures[3]"),3);for(let u of j){const J=parseInt(u.color.slice(0,2),16)/255,W=parseInt(u.color.slice(2,4),16)/255,Z=parseInt(u.color.slice(4,6),16)/255;e.uniform3f(t.color,J,W,Z),e.uniform2f(t.scroll,u.scroll.x,u.scroll.y);const P=[],C=[],D=[];u.stars.forEach(_=>{P.push(_.position.x,_.position.y),C.push(_.opacity),D.push(_.texture)}),y(e,t.position,o.position,new Float32Array(P),2),y(e,t.opacity,o.opacity,new Float32Array(C)),y(e,t.textureIndex,o.texture,new Float32Array(D)),e.drawArrays(e.POINTS,0,u.stars.length)}},K=(e,t)=>{let o=performance.now();const r=()=>{const a=performance.now();if(a-o>=t){let s=(a-o)/1e3;s>1&&(s%=1),e(s),o=performance.now()}n=requestAnimationFrame(r)};let n=requestAnimationFrame(r);return()=>cancelAnimationFrame(n)};console.log("worker: effects worker starting");let h=f.createDefaultLayers(),c,d,A,N=i();const q=()=>{if(!c)throw new Error("dim not initialized");if(!d)throw new Error("canvas not initialized");if(A=d.getContext("webgl2",{antialias:!1,powerPreference:"low-power",desynchronized:!0,failIfMajorPerformanceCaveat:!0}),!A)throw new Error("GL2 failed to init");for(let t of h)t.resize(c);for(let t of h)t.update(1);A.viewport(0,0,c.x,c.y),self.postMessage({type:"initialized"});let e=k(A);console.log("worker: gl2 init complete"),K(t=>{A.clearColor(0,0,0,0),A.clear(A.COLOR_BUFFER_BIT);for(let o of h)o.update(t);H(A,e,{dimensions:c,scrollPosition:N,starfields:h})},24)};self.onmessage=e=>{const t=e.data;b(t)({init:o=>{c=i(o.width,o.height),d=o,q()},dimensionsChange:o=>{c=o,d&&(d.width=c.x,d.height=c.y),A&&A.viewport(0,0,c.x,c.y);for(let r of h)r.resize(c)},scroll:o=>{N=o},_:()=>{}})},console.log("worker: effects worker loaded")})();
