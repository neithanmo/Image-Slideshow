#ifdef GL_ES
precision highp float;
#endif
uniform sampler2D from, to;
uniform float progress;
uniform vec2 resolution;

const float power=45.0;
const bool powerDest=false;

void main() {
  vec2 p = gl_FragCoord.xy / resolution.xy;
  
  vec2 p2 = mix(
    p, 
    vec2(pow(p.x, power), pow(p.y, power)), 
    (powerDest ? 0.5 : 1.0)-distance(progress, powerDest ? 0.5 : 1.0));
  
  gl_FragColor = mix(
    texture2D(from, p2), 
    texture2D(to, powerDest ? p2: p), 
    progress);
}
