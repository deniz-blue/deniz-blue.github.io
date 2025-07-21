precision mediump float;
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
