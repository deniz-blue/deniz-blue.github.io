import { WebGLEffect } from "../../../background/starfield/impl/types";
import { compileShader, createGLTexture, createProgram } from "./webglHelpers";
import { vec2, Vec2 } from "@alan404/vec2";

// Vertex Shader Code
const vertexShaderSrc = `
    void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    }

`;

// Fragment Shader Code
const fragmentShaderSrc = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Full red
    }

`;

export interface Mist {
    color: string;
    speed: Vec2;
    scroll: Vec2;
}

export const MistConfigurations: Mist[] = [
    { color: "#7e2168ff", speed: vec2(2, 0), scroll: vec2(0.15, 0.15) },
    { color: "#2f7f98ff", speed: vec2(4, 0), scroll: vec2(0.2, 0.2) },
    { color: "#000000ff", speed: vec2(16, 8), scroll: vec2(0.6, 0.6) },
];

export type MistProgramBindings = {
    position: number;
    // texCoord: number;
    // time: WebGLUniformLocation;
    // mistColor: WebGLUniformLocation;
    // mistTexture: WebGLUniformLocation;
};

export class MistBackgroundEffect extends WebGLEffect<MistProgramBindings> {
    id = "farewell_mist";
    texture: WebGLTexture;
    mists: Mist[] = [];

    constructor(gl: WebGL2RenderingContext) {
        super(gl);

        this.program = createProgram(gl, [
            compileShader(gl, gl.VERTEX_SHADER, vertexShaderSrc)!,
            compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc)!,
        ])!;

        this.texture = createGLTexture(gl, "/assets/img/detail/mist.png");

        this.bindings = {
            position: this.binding("a", "position"),
            // texCoord: this.binding("a", "texCoord"),
            // time: this.binding("u", "time"),
            // mistColor: this.binding("u", "mistColor"),
            // mistTexture: this.binding("u", "mistTexture"),
        };

        this.mists = MistConfigurations;
    }

    onDimensionsChange(newDims: Vec2): void {
        this.dimensions = newDims;
    }

    update(dt: number): void { }

    render(): void {
        this.gl.useProgram(this.program!);
        
        let gl = this.gl;

        const positions = new Float32Array([
            -1.0, -1.0,  // Bottom-left
             1.0, -1.0,  // Bottom-right
            -1.0,  1.0,  // Top-left
            -1.0,  1.0,  // Top-left
             1.0, -1.0,  // Bottom-right
             1.0,  1.0   // Top-right
        ]);
        
        // Create buffer and load data
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        
        // Get attribute location
        // const positionLocation = gl.getAttribLocation(this.program, "a_position");
        // gl.enableVertexAttribArray(positionLocation);
        // gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Clear and draw
        // gl.clearColor(0, 0, 0, 0);
        // gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // console.log("mist render");

        // const buffer = this.createBuffer(new Float32Array([
        //     -1, -1,  // Bottom-left
        //      1, -1,  // Bottom-right
        //      0,  1   // Top
        // ]));

        // this.gl.enableVertexAttribArray(this.bindings.position);
        // this.gl.vertexAttribPointer(this.bindings.position, 2, this.gl.FLOAT, false, 0, 0);
        
        // this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

        return

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.uniform1i(this.gl.getUniformLocation(this.program, "u_mistTexture"), 0);

        // this.gl.uniform1f(this.bindings.time, performance.now() / 1000);

        for (let mist of this.mists)
            this.renderDrawMist(mist);
    }

    renderDrawMist(mist: Mist) {
        const hex = mist.color.replace("#", ""); // Remove `#`
        const r = parseInt(hex.slice(0, 2), 16) / 255;
        const g = parseInt(hex.slice(2, 4), 16) / 255;
        const b = parseInt(hex.slice(4, 6), 16) / 255;
        this.gl.uniform3f(this.bindings.mistColor, r, g, b);
    
        const quad = this.createBuffer(new Float32Array([
            // Position (x, y)
            -1.0, 1.0,  
            -1.0, -1.0,  
            1.0, 1.0,  
            1.0, -1.0,  
    
            // Texture Coordinates (s, t)
            0.0, 1.0,  
            0.0, 0.0,  
            1.0, 1.0,  
            1.0, 0.0   
        ]));
    
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, quad);
        
        this.gl.vertexAttribPointer(this.bindings.position, 2, this.gl.FLOAT, false, 4 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(this.bindings.position);
    
        this.gl.vertexAttribPointer(this.bindings.texCoord, 2, this.gl.FLOAT, false, 4 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
        this.gl.enableVertexAttribArray(this.bindings.texCoord);
    
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }    
}
