#ifdef GL_ES
precision highp float;
#endif
uniform sampler2D from, to;
uniform float progress;
uniform vec2 resolution;

uniform sampler2D luma;

void main() {
  vec2 p = gl_FragCoord.xy / resolution.xy;
  gl_FragColor = mix(
    texture2D(from, p),
    texture2D(to, p),
    step(texture2D(luma, p).r, progress)
  );
}
