#ifdef GL_ES
precision highp float;
#endif
uniform sampler2D from, to;
uniform float progress;
uniform vec2 resolution;

// default interpolationPower = 5;
const float interpolationPower=10.0;

void main() {
  vec2 p = gl_FragCoord.xy / resolution.xy;
  vec4 fTex = texture2D(from,p);
  vec4 tTex = texture2D(to,p);
  gl_FragColor = mix(distance(fTex,tTex)>progress?fTex:tTex,
                     tTex,
                     pow(progress,interpolationPower));
}
