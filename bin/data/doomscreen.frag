
#ifdef GL_ES
precision highp float;
#endif
 
 
// Hardcoded parameters --------
 
uniform sampler2D from, to;
uniform float progress;
uniform vec2 resolution;
 
 
// Transition parameters --------
 
// default barWidth = 10
const int barWidth = 10; // Number of bars
 
// default amplitude = 2
const float amplitude = 2.1; // 0 = no variation when going down, higher = some elements go much faster
 
// default noise = 0.1
const float noise = 0.2; // 0 = no noise, 1 = super noisy
 
// default frequency = 1
const float frequency = 0.85; // the bigger the value, the shorter the waves
 
// The code proper --------
 
float rand(int num) {
return fract(mod(float(num) * 67123.313, 12.0) * sin(float(num) * 10.3) * cos(float(num)));
}
 
float wave(int num) {
float fn = float(num) * frequency * 0.1 * float(barWidth);
return cos(fn * 0.5) * cos(fn * 0.13) * sin((fn+10.0) * 0.3) / 2.0 + 0.5;
}
 
float pos(int num) {
return noise == 0.0 ? wave(num) : mix(wave(num), rand(num), noise);
}
 
void main() {
int bar = int(gl_FragCoord.x) / barWidth;
float scale = 1.0 + pos(bar) * amplitude;
float phase = progress * scale;
float posY = gl_FragCoord.y / resolution.y;
vec2 p;
vec4 c;
if (phase + posY < 1.0) {
p = vec2(gl_FragCoord.x, gl_FragCoord.y + mix(0.0, resolution.y, phase)) / resolution.xy;
c = texture2D(from, p);
} else {
p = gl_FragCoord.xy / resolution.xy;
c = texture2D(to, p);
}
 
// Finally, apply the color
gl_FragColor = c;
}


