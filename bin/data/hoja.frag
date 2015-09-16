#ifdef GL_ES
precision highp float;
#endif
uniform sampler2D from, to;
uniform float progress;
uniform vec2 resolution;
 
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 leaf_uv = (uv - vec2(0.5))/10./pow(progress,3.5);
	leaf_uv.y += 0.35;
	float r = 0.30;
	float o = atan(leaf_uv.y, leaf_uv.x);
  gl_FragColor = mix(texture2D(from, uv), texture2D(to, uv), 1.-step(1. - length(leaf_uv)+r*(1.+sin(o))*(1.+0.9 * cos(8.*o))*(1.+0.1*cos(24.*o))*(0.9+0.05*cos(200.*o)), 1.));
}
