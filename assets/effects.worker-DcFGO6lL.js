(function(){let e=e=>t(e,e),t=(e,t)=>typeof e==`object`&&e?{x:e.x||0,y:e.y||0}:{x:e||0,y:t||0},n=n=>typeof n==`object`&&n?t(n):e(n),r=(...e)=>e.map(n).reduce((e,n)=>t(e.x+n.x,e.y+n.y)),i=(...e)=>e.map(n).reduce((e,n)=>t(e.x*n.x,e.y*n.y)),a=(e,t)=>r(e,i(t,-1)),o=(e,r)=>{let i=n(e),a=n(r);return t(i.x/a.x,i.y/a.y)},s=e=>{let t=n(e);return Math.sqrt(t.x**2+t.y**2)},c=e=>o(e,s(e));t(0,0),t(1,1);let l=e=>t=>t[e.type]?t[e.type](e.data):t._(),u=(e=1)=>Math.round(Math.random()*e),d=(e=1)=>Math.random()*e,f=(e,t)=>Math.random()>.5?e:t,p=(e,t,n)=>Math.min(Math.max(e,t),n),m=(e,t,n)=>e+(t-e)*n;var h=class{texture=0;position=t();opacity=1;NodeIndex=0;NodePercent=0;Distance=0;Sine=0;constructor(){let e=d(1);this.NodeIndex=u(g-1),this.NodePercent=d(1),this.Distance=4+e*20,this.Sine=d(Math.PI*2),this.texture=Math.floor(p(0,(1-e)**3*4,3)),this.opacity=m(.6,0,e*.5)}};let g=15,_=e=>{let t=[],n=d(e.y),r=0;for(;15>r;)r++,t.push(n),n+=f(-1,1)*(32+d(24*(e.y/360)*2));for(let e=0;e<4;e++)t[t.length-1-e]=m(t[t.length-1-e],t[0],p(0,1-e/4,1));return t},v=t(320,180);var y=class e{stars=[];yNodes=_(v);color=`#ffffff`;flowSpeed=1;scroll=t();stepSize=32;constructor(e,t,n){e&&(this.color=e),t&&(this.scroll=t),n&&(this.flowSpeed=n),this.stars=Array(128).fill(0).map(()=>new h),this.stars.forEach(e=>e.position=this.targetOfStar(e))}resize(e=v){return this.yNodes=_(e),this.stepSize=e.x/10,this.stars.forEach(e=>e.position=this.targetOfStar(e)),this}update(e=1){for(let n of this.stars){let i=this.targetOfStar(n);n.Sine+=e*this.flowSpeed,n.NodePercent+=e*.25*this.flowSpeed,n.NodePercent>=1&&(--n.NodePercent,n.NodeIndex++,n.NodeIndex>=14&&(n.NodeIndex=0,n.position.x=0)),n.position=r(n.position,o(a(i,n.position),t(50,50)))}}targetOfStar(e){let n={x:e.NodeIndex*this.stepSize,y:this.yNodes[e.NodeIndex]},o={x:(e.NodeIndex+1)*this.stepSize,y:this.yNodes[e.NodeIndex+1]},s=r(n,i(a(o,n),t(e.NodePercent))),l=c(a(o,n));return{x:s.x+-l.x*e.Distance*Math.sin(e.Sine),y:s.y+l.y*e.Distance*Math.sin(e.Sine)}}static ScreenPosOfStar(e,n=t(448,212)){let i=(e,n)=>t(e.x%n.x,e.y%n.y);return a(r(t(-64,-16),((e,t)=>i(r(i(e,t),t),t))(e.position,n)),16)}static createDefaultLayers(){return[new e(`ab6ffa`,t(.3,.3),.8),new e(`71d5ff`,t(.3,.3),1.1),new e(`53f3dd`,t(.5,.5),.8),new e(`cefdff`,t(.5,.5),1.2)]}},b=`attribute vec2 a_position;
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
`,x=`precision mediump float;
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
`;let S=(e,t,n,r,i=1)=>{e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,i,e.FLOAT,!1,0,0)},C=(e,t,n)=>{let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error(`SHADER COMPILATION ERROR`,n),console.error(e.getShaderInfoLog(r)),e.deleteShader(r),null)):null},w=(e,t)=>{let n=e.createProgram();for(let r of t)e.attachShader(n,r);return e.linkProgram(n),e.getProgramParameter(n,e.LINK_STATUS)?n:(console.error(e.getProgramInfoLog(n)),e.deleteProgram(n),null)},T=(e,t)=>{let n=e.createTexture();return e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),(async()=>{let r=await(await fetch(t)).blob(),i=await createImageBitmap(r);e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST)})(),n},E=[`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHUlEQVR4Ae3OAQ0AAAABMP1Lo4UxT3Dg1tGqwhcjpd4D/epMC1wAAAAASUVORK5CYII=`,`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIklEQVR4Ae3MsQ0AAAzCMP5/uuUHGBDCewJMuCM5tkym3gOLZg/xodIpmQAAAABJRU5ErkJggg==`,`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVR4Ae3PSwoAAAQEUNz/zlgrn5KymLc2MyGCW+q6G9mO8HSZ3bgglmTh9oUqCJ8YQAgMB0rhaRAAAAAASUVORK5CYII=`,`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVR4Ae2RSw4AMAREjfvfuZV01/hNbL0140FkSTlGVYNOMwwqwJschYBW/oLA7O1ZjFfQ7vEiM610sw8sjwsTECAKHmlhcAAAAABJRU5ErkJggg==`],D=e=>{let t=w(e,[C(e,e.VERTEX_SHADER,b),C(e,e.FRAGMENT_SHADER,x)]);return{program:t,textures:E.map(t=>T(e,t)),bindings:{color:e.getUniformLocation(t,`u_color`),dim:e.getUniformLocation(t,`u_dim`),flash:e.getUniformLocation(t,`u_flash`),scroll:e.getUniformLocation(t,`u_scroll`),scrollPosition:e.getUniformLocation(t,`u_scrollPosition`),mousePosition:e.getUniformLocation(t,`u_mousePosition`),pointSize:e.getUniformLocation(t,`u_pointSize`),opacity:e.getAttribLocation(t,`a_opacity`),position:e.getAttribLocation(t,`a_position`),textureIndex:e.getAttribLocation(t,`a_textureIndex`)},buffers:{texture:e.createBuffer(),opacity:e.createBuffer(),position:e.createBuffer()}}},O=(e,{bindings:t,buffers:n,program:r,textures:i},{dimensions:a,scrollPosition:o,starfields:s})=>{e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.blendEquation(e.FUNC_ADD),e.enable(e.BLEND),e.useProgram(r),e.uniform1f(t.flash,0),e.uniform2f(t.dim,a.x,a.y),e.uniform2f(t.scrollPosition,o.x,o.y),e.uniform1f(t.pointSize,32),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,i[0]),e.uniform1i(e.getUniformLocation(r,`u_textures[0]`),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,i[1]),e.uniform1i(e.getUniformLocation(r,`u_textures[1]`),1),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,i[2]),e.uniform1i(e.getUniformLocation(r,`u_textures[2]`),2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,i[3]),e.uniform1i(e.getUniformLocation(r,`u_textures[3]`),3);for(let r of s){let i=parseInt(r.color.slice(0,2),16)/255,a=parseInt(r.color.slice(2,4),16)/255,o=parseInt(r.color.slice(4,6),16)/255;e.uniform3f(t.color,i,a,o),e.uniform2f(t.scroll,r.scroll.x,r.scroll.y);let s=[],c=[],l=[];r.stars.forEach(e=>{s.push(e.position.x,e.position.y),c.push(e.opacity),l.push(e.texture)}),S(e,t.position,n.position,new Float32Array(s),2),S(e,t.opacity,n.opacity,new Float32Array(c)),S(e,t.textureIndex,n.texture,new Float32Array(l)),e.drawArrays(e.POINTS,0,r.stars.length)}},k=(e,t)=>{let n=performance.now(),r=()=>{let a=performance.now();if(a-n>=t){let t=(a-n)/1e3;t>1&&(t%=1),e(t),n=performance.now()}i=requestAnimationFrame(r)},i=requestAnimationFrame(r);return()=>cancelAnimationFrame(i)};console.log(`worker: effects worker starting`);let A=y.createDefaultLayers(),j,M,N,P=t(),F=()=>{if(!j)throw Error(`dim not initialized`);if(!M)throw Error(`canvas not initialized`);if(N=M.getContext(`webgl2`,{antialias:!1,powerPreference:`low-power`,desynchronized:!0,failIfMajorPerformanceCaveat:!0}),!N)throw Error(`GL2 failed to init`);for(let e of A)e.resize(j);for(let e of A)e.update(1);N.viewport(0,0,j.x,j.y),self.postMessage({type:`initialized`});let e=D(N);console.log(`worker: gl2 init complete`),k(t=>{N.clearColor(0,0,0,0),N.clear(N.COLOR_BUFFER_BIT);for(let e of A)e.update(t);O(N,e,{dimensions:j,scrollPosition:P,starfields:A})},24)};self.onmessage=e=>{let n=e.data;l(n)({init:e=>{j=t(e.width,e.height),M=e,F()},dimensionsChange:e=>{j=e,M&&(M.width=j.x,M.height=j.y),N&&N.viewport(0,0,j.x,j.y);for(let e of A)e.resize(j)},scroll:e=>{P=e},_:()=>{}})},console.log(`worker: effects worker loaded`)})();