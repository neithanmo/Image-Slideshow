// Author: Adrian Purser
// License: MIT
#ifdef GL_ES
 precision highp float;
#endif

uniform sampler2D from;
uniform sampler2D to;
uniform float progress;
uniform vec2 resolution;

const vec4 shadow_colour = vec4(0.,0.,0.,.6);
const float shadow_height = 0.075;
const float bounces = 3.0;
const float PI = 3.14159265358;

vec4 getToColor (vec2 uv) { 
  return texture2D(to , uv); 
}

vec4 getFromColor(vec2 uv){
  return texture2D(from, uv);
}


vec4 transition (vec2 uv) {
  float time = progress;
  float stime = sin(time * PI / 2.);
  float phase = time * PI * bounces;
  float y = (abs(cos(phase))) * (1.0 - stime);
  float d = uv.y - y;
  return mix(
    mix(
      getToColor(uv),
      shadow_colour,
      step(d, shadow_height) * (1. - mix(
        ((d / shadow_height) * shadow_colour.a) + (1.0 - shadow_colour.a),
        1.0,
        smoothstep(0.95, 1., progress) // fade-out the shadow at the end
      ))
    ),
    getFromColor(vec2(uv.x, uv.y + (1.0 - y))),
    step(d, 0.0)
  );
}

void main() {
  vec2 p = gl_FragCoord.xy / resolution.xy;
  gl_FragColor = transition(p);
}
