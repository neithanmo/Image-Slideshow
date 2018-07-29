// Author: mikolalysenko
// License: MIT

#ifdef GL_ES
precision highp float;
#endif
uniform sampler2D from;
uniform sampler2D to;
uniform float progress;
uniform vec2 resolution;

vec2 offset(float progress, float x, float theta) {
  float phase = progress*progress + progress + theta;
  float shifty = 0.05*progress*cos(10.0*(progress+x));
  return vec2(0, shifty);
}

void main() {
  vec2 p = gl_FragCoord.xy / resolution.xy;
  gl_FragColor = mix(texture2D(from, p + offset(progress, p.x, 0.0)), texture2D(to, p + offset(1.0-progress, p.y, 3.14)), progress);
}
