#ifdef GL_ES
precision highp float;
#endif
#define PI 3.14159265358979323
#define POW2(X) X*X
#define POW3(X) X*X*X
uniform sampler2D from, to;
uniform float progress;
uniform vec2 resolution;
const int endx=-2;
const int endy=4;

float Rand(vec2 v) {
  return fract(sin(dot(v.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
vec2 Rotate(vec2 v, float a) {
  mat2 rm = mat2(cos(a), -sin(a),
                 sin(a), cos(a));
  return rm*v;
}
float CosInterpolation(float x) {
  return -cos(x*PI)/2.+.5;
}
void main() {
  vec2 p = gl_FragCoord.xy / resolution.xy - .5;
  vec2 rp = p;
  float rpr = (progress*2.-1.);
  float z = -(rpr*rpr*2.) + 3.;
  float az = abs(z);
  rp *= az;
  rp += mix(vec2(.5, .5), vec2(float(endx) + .5, float(endy) + .5), POW2(CosInterpolation(progress)));
  vec2 mrp = mod(rp, 1.);
  vec2 crp = rp;
  bool onEnd = int(floor(crp.x))==endx&&int(floor(crp.y))==endy;
  if(!onEnd) {
    float ang = float(int(Rand(floor(crp))*4.))*.5*PI;
    mrp = vec2(.5) + Rotate(mrp-vec2(.5), ang);
  }
  if(onEnd || Rand(floor(crp))>.5) {
    gl_FragColor = texture2D(to, mrp);
  } else {
    gl_FragColor = texture2D(from, mrp);
  }
}

