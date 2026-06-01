(function(){let e=e=>t(e,e),t=(e,t)=>typeof e==`object`&&e?{x:e.x||0,y:e.y||0}:{x:e||0,y:t||0},n=n=>typeof n==`object`&&n?t(n):e(n),r=(...e)=>e.map(n).reduce((e,n)=>t(e.x+n.x,e.y+n.y)),i=(...e)=>e.map(n).reduce((e,n)=>t(e.x*n.x,e.y*n.y)),a=(e,t)=>r(e,i(t,-1)),o=(e,r)=>{let i=n(e),a=n(r);return t(i.x/a.x,i.y/a.y)},s=e=>{let t=n(e);return Math.sqrt(t.x**2+t.y**2)},c=e=>o(e,s(e));t(0,0),t(1,1);let l=e=>t=>t[e.type]?t[e.type](e.data):t._(),u=(e=1)=>Math.round(Math.random()*e),d=(e=1)=>Math.random()*e,f=(e,t)=>Math.random()>.5?e:t,p=(e,t,n)=>Math.min(Math.max(e,t),n),m=(e,t,n)=>e+(t-e)*n;var h=class{texture=0;position=t();opacity=1;NodeIndex=0;NodePercent=0;Distance=0;Sine=0;constructor(){let e=d(1);this.NodeIndex=u(_-1),this.NodePercent=d(1),this.Distance=4+e*20,this.Sine=d(Math.PI*2),this.texture=Math.floor(p(0,(1-e)**3*4,3)),this.opacity=m(.4,0,e*.5)}},g=class e{color=`#000000`;speed=t();scroll=t();constructor(e,t,n){this.color=e,this.speed=t,this.scroll=n}static createDefaultLayers(){return[new e(`#7e2168`,t(2,1),t(.15,.15)),new e(`#2f7f98ff`,t(4,2),t(.2,.2)),new e(`#000000ff`,t(8,4),t(.6,.6))]}};let _=15,v=e=>{let t=[],n=d(e.y),r=0;for(;15>r;)r++,t.push(n),n+=f(-1,1)*(32+d(24*(e.y/360)*2));for(let e=0;e<4;e++)t[t.length-1-e]=m(t[t.length-1-e],t[0],p(0,1-e/4,1));return t},y=t(320,180);var b=class e{stars=[];yNodes=v(y);color=`#ffffff`;dims=t(y.x,y.y);flowSpeed=1;scroll=t();stepSize=32;constructor(e,t,n){e&&(this.color=e),t&&(this.scroll=t),n&&(this.flowSpeed=n),this.stars=Array(32).fill(0).map(()=>new h),this.stars.forEach(e=>e.position=this.targetOfStar(e))}resize(e=y){if(e.x<=0||e.y<=0)return this;let n=this.dims,r=e.x/n.x,i=e.y/n.y;return this.stepSize=e.x/10,this.yNodes=this.yNodes.map(e=>e*i),this.stars.forEach(e=>{e.position.x*=r,e.position.y*=i}),this.dims=t(e.x,e.y),this}update(e=1){for(let n of this.stars){let i=this.targetOfStar(n);n.Sine+=e*this.flowSpeed,n.NodePercent+=e*.25*this.flowSpeed,n.NodePercent>=1&&(--n.NodePercent,n.NodeIndex++,n.NodeIndex>=14&&(n.NodeIndex=0,n.position.x-=this.stepSize*14)),n.position=r(n.position,o(a(i,n.position),t(50,50)))}}targetOfStar(e){let n={x:e.NodeIndex*this.stepSize,y:this.yNodes[e.NodeIndex]},o={x:(e.NodeIndex+1)*this.stepSize,y:this.yNodes[e.NodeIndex+1]},s=r(n,i(a(o,n),t(e.NodePercent))),l=c(a(o,n));return{x:s.x+-l.y*e.Distance*Math.sin(e.Sine),y:s.y+l.x*e.Distance*Math.sin(e.Sine)}}static ScreenPosOfStar(e,n=t(448,212)){let i=(e,n)=>t(e.x%n.x,e.y%n.y);return a(r(t(-64,-16),((e,t)=>i(r(i(e,t),t),t))(e.position,n)),16)}static createDefaultLayers(){return[new e(`ab6ffa`,t(.3,.3),.8),new e(`71d5ff`,t(.3,.3),1.1),new e(`53f3dd`,t(.5,.5),.8),new e(`cefdff`,t(.5,.5),1.2)]}},x=`attribute vec2 a_position;
attribute float a_textureIndex;
attribute float a_opacity;
uniform float u_pointSize;
uniform vec2 u_scroll;
uniform vec2 u_viewDim;
uniform vec2 u_simulationDim;
uniform vec2 u_tileOffset;
uniform float u_worldScale;
uniform vec2 u_scrollPosition;
varying float v_opacity;
varying float v_flash;
varying float v_textureIndex;
uniform vec2 u_mousePosition;

void main() {
    gl_PointSize = u_pointSize;

    vec2 position = mod((a_position - u_scrollPosition * u_scroll) * u_worldScale, u_simulationDim * u_worldScale) + u_tileOffset;

    vec2 clipSpace = ((position / u_viewDim) * 2.0) - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

    // Pass attributes to the fragment shader

    v_opacity = a_opacity;
    v_textureIndex = a_textureIndex;
}
`,S=`precision mediump float;
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
`;let C=(e,t,n,r,i=1)=>{e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,i,e.FLOAT,!1,0,0)},w=(e,t,n)=>{let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error(`SHADER COMPILATION ERROR`,n),console.error(e.getShaderInfoLog(r)),e.deleteShader(r),null)):null},T=(e,t)=>{let n=e.createProgram();for(let r of t)e.attachShader(n,r);return e.linkProgram(n),e.getProgramParameter(n,e.LINK_STATUS)?n:(console.error(e.getProgramInfoLog(n)),e.deleteProgram(n),null)},E=(e,t)=>{let n=e.createTexture();return e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),(async()=>{let r=await(await fetch(t)).blob(),i=await createImageBitmap(r);e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST)})(),n},D={x:600,y:600},O=[`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHUlEQVR4Ae3OAQ0AAAABMP1Lo4UxT3Dg1tGqwhcjpd4D/epMC1wAAAAASUVORK5CYII=`,`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIklEQVR4Ae3MsQ0AAAzCMP5/uuUHGBDCewJMuCM5tkym3gOLZg/xodIpmQAAAABJRU5ErkJggg==`,`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVR4Ae3PSwoAAAQEUNz/zlgrn5KymLc2MyGCW+q6G9mO8HSZ3bgglmTh9oUqCJ8YQAgMB0rhaRAAAAAASUVORK5CYII=`,`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVR4Ae2RSw4AMAREjfvfuZV01/hNbL0140FkSTlGVYNOMwwqwJschYBW/oLA7O1ZjFfQ7vEiM610sw8sjwsTECAKHmlhcAAAAABJRU5ErkJggg==`],k=e=>{let t=T(e,[w(e,e.VERTEX_SHADER,x),w(e,e.FRAGMENT_SHADER,S)]),n=O.map(t=>E(e,t)),r=E(e,`/assets/img/detail/mist.png`);e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);let i=T(e,[w(e,e.VERTEX_SHADER,`
attribute vec2 a_position;
uniform vec2 u_viewDim;
varying vec2 v_screenPos;

void main() {
    v_screenPos = a_position * u_viewDim;
    vec2 clipSpace = (a_position * 2.0) - 1.0;
    gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
}
`),w(e,e.FRAGMENT_SHADER,`
precision mediump float;
uniform sampler2D u_mistTexture;
uniform vec4 u_color;
uniform vec2 u_scroll;
uniform vec2 u_speed;
uniform vec2 u_scrollPosition;
uniform vec2 u_textureDim;
uniform float u_worldScale;
uniform float u_time;
varying vec2 v_screenPos;

void main() {
    const float SPEED_SCALE = 16.0;
    vec2 uvPixel = v_screenPos
        + (u_scrollPosition * u_scroll * u_worldScale)
        - (u_speed * u_time * u_worldScale * SPEED_SCALE);
    vec2 uv = uvPixel / (u_textureDim * u_worldScale);
    vec4 mist = texture2D(u_mistTexture, uv);

    gl_FragColor = vec4(mist.rgb * u_color.rgb, mist.a * u_color.a);
}
`)]),a={color:e.getUniformLocation(t,`u_color`),viewDim:e.getUniformLocation(t,`u_viewDim`),simulationDim:e.getUniformLocation(t,`u_simulationDim`),tileOffset:e.getUniformLocation(t,`u_tileOffset`),worldScale:e.getUniformLocation(t,`u_worldScale`),flash:e.getUniformLocation(t,`u_flash`),scroll:e.getUniformLocation(t,`u_scroll`),scrollPosition:e.getUniformLocation(t,`u_scrollPosition`),mousePosition:e.getUniformLocation(t,`u_mousePosition`),pointSize:e.getUniformLocation(t,`u_pointSize`),opacity:e.getAttribLocation(t,`a_opacity`),position:e.getAttribLocation(t,`a_position`),textureIndex:e.getAttribLocation(t,`a_textureIndex`)},o={texture:e.createBuffer(),opacity:e.createBuffer(),position:e.createBuffer()};return{program:t,mistProgram:i,textures:n,mistTexture:r,bindings:a,mistBindings:{position:e.getAttribLocation(i,`a_position`),viewDim:e.getUniformLocation(i,`u_viewDim`),color:e.getUniformLocation(i,`u_color`),scroll:e.getUniformLocation(i,`u_scroll`),speed:e.getUniformLocation(i,`u_speed`),scrollPosition:e.getUniformLocation(i,`u_scrollPosition`),textureDim:e.getUniformLocation(i,`u_textureDim`),worldScale:e.getUniformLocation(i,`u_worldScale`),time:e.getUniformLocation(i,`u_time`)},buffers:o,mistBuffers:{quad:e.createBuffer()}}},A=e=>{let t=e.replace(`#`,``),n=t.length>=8;return{r:parseInt(t.slice(0,2),16)/255,g:parseInt(t.slice(2,4),16)/255,b:parseInt(t.slice(4,6),16)/255,a:n?parseInt(t.slice(6,8),16)/255:1}},j=(e,{bindings:t,buffers:n,program:r,mistProgram:i,mistBindings:a,mistBuffers:o,mistTexture:s,textures:c},{dimensions:l,simulationDim:u,scrollPosition:d,mists:f,elapsedTime:p,starfields:m})=>{e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.blendEquation(e.FUNC_ADD),e.enable(e.BLEND),e.useProgram(i),e.uniform2f(a.viewDim,l.x,l.y),e.uniform2f(a.scrollPosition,d.x,d.y),e.uniform2f(a.textureDim,D.x,D.y),e.uniform1f(a.worldScale,2),e.uniform1f(a.time,p),e.bindBuffer(e.ARRAY_BUFFER,o.quad),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(a.position),e.vertexAttribPointer(a.position,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,s),e.uniform1i(e.getUniformLocation(i,`u_mistTexture`),4);for(let t of f){let{r:n,g:r,b:i,a:o}=A(t.color);e.uniform4f(a.color,n,r,i,o),e.uniform2f(a.scroll,t.scroll.x,t.scroll.y),e.uniform2f(a.speed,t.speed.x,t.speed.y),e.drawArrays(e.TRIANGLE_STRIP,0,4)}e.useProgram(r),e.uniform1f(t.flash,0),e.uniform2f(t.viewDim,l.x,l.y),e.uniform2f(t.simulationDim,u.x,u.y),e.uniform1f(t.worldScale,2),e.uniform2f(t.scrollPosition,d.x,d.y),e.uniform1f(t.pointSize,32);let h=u.x*2,g=u.y*2,_=Math.max(1,Math.ceil(l.x/h)),v=Math.max(1,Math.ceil(l.y/g)),y=h,b=g;e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,c[0]),e.uniform1i(e.getUniformLocation(r,`u_textures[0]`),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,c[1]),e.uniform1i(e.getUniformLocation(r,`u_textures[1]`),1),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,c[2]),e.uniform1i(e.getUniformLocation(r,`u_textures[2]`),2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,c[3]),e.uniform1i(e.getUniformLocation(r,`u_textures[3]`),3);for(let r of m){let{r:i,g:a,b:o}=A(r.color);e.uniform3f(t.color,i,a,o),e.uniform2f(t.scroll,r.scroll.x,r.scroll.y);let s=[],c=[],l=[];r.stars.forEach(e=>{s.push(e.position.x,e.position.y),c.push(e.opacity),l.push(e.texture)}),C(e,t.position,n.position,new Float32Array(s),2),C(e,t.opacity,n.opacity,new Float32Array(c)),C(e,t.textureIndex,n.texture,new Float32Array(l));for(let n=-1;n<=v;n++)for(let i=-1;i<=_;i++)e.uniform2f(t.tileOffset,i*h-y,n*g-b),e.drawArrays(e.POINTS,0,r.stars.length)}},M=(e,t)=>{let n=performance.now(),r=()=>{let a=performance.now();if(a-n>=t){let t=(a-n)/1e3;t>1&&(t%=1),e(t),n=performance.now()}i=requestAnimationFrame(r)},i=requestAnimationFrame(r);return()=>cancelAnimationFrame(i)};console.log(`worker: effects worker starting`);let N=b.createDefaultLayers(),P=g.createDefaultLayers(),F=t(y.x,y.y),I,L,R,z=t(),B=0,V=()=>{if(!I)throw Error(`dim not initialized`);if(!L)throw Error(`canvas not initialized`);if(R=L.getContext(`webgl2`,{antialias:!1,powerPreference:`low-power`,desynchronized:!0,failIfMajorPerformanceCaveat:!0}),!R)throw Error(`GL2 failed to init`);for(let e of N)e.resize(F);for(let e of N)e.update(1);R.viewport(0,0,I.x,I.y),self.postMessage({type:`initialized`});let e=k(R);console.log(`worker: gl2 init complete`),M(t=>{B+=t,R.clearColor(0,0,0,0),R.clear(R.COLOR_BUFFER_BIT);for(let e of N)e.update(t);j(R,e,{dimensions:I,simulationDim:F,scrollPosition:z,mists:P,elapsedTime:B,starfields:N})},24)};self.onmessage=e=>{let n=e.data;l(n)({init:e=>{I=t(e.width,e.height),L=e,V()},dimensionsChange:e=>{I=e,L&&(L.width=I.x,L.height=I.y),R&&R.viewport(0,0,I.x,I.y)},scroll:e=>{z=e},_:()=>{}})},console.log(`worker: effects worker loaded`)})();