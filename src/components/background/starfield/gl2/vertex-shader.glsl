attribute vec2 a_position;
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
