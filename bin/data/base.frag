#ifdef GL_ES
 precision highp float;
#endif

uniform sampler2D from;
uniform sampler2D to;
uniform float progress;
uniform vec2 resolution;


vec4 getToColor (vec2 uv) { 
  return texture2D(to , uv); 
}

vec4 getFromColor(vec2 uv){
  return texture2D(from, uv);
}


void main() {
  vec2 p = gl_FragCoord.xy / resolution.xy;
  gl_FragColor = transition(p);
}
