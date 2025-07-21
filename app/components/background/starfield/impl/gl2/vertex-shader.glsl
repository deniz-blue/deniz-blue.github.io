attribute vec2 a_position;
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
