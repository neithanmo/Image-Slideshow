// Author: gre
// License: MIT

#ifdef GL_ES
 precision highp float;
#endif

uniform sampler2D from;
uniform sampler2D to;
uniform float progress;
uniform vec2 resolution;

const vec2 direction = vec2(1.0, -1.0);

const float smoothness = 0.5;
const vec2 center = vec2(0.5, 0.5);

vec4 getToColor (vec2 uv) { 
  return texture2D(to , uv); 
}

vec4 getFromColor(vec2 uv){
  return texture2D(from, uv);
}

vec4 transition (vec2 uv) {
  vec2 v = normalize(direction);
  v /= abs(v.x) + abs(v.y);
  float d = v.x * center.x + v.y * center.y;
  float m = 1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d - 0.5 + progress * (1.0 + smoothness)));
  return mix(getFromColor((uv - 0.5) * (1.0 - m) + 0.5), getToColor((uv - 0.5) * m + 0.5), m);
}

void main() {
  vec2 p = gl_FragCoord.xy / resolution.xy;
  gl_FragColor = transition(p);
}
