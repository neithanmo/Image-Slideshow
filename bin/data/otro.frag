#ifdef GL_ES
precision highp float;
#endif


// Definitions --------
#define DEG2RAD 0.03926990816987241548078304229099 // 1/180*PI


// Hardcoded parameters --------

uniform sampler2D from, to;
uniform float progress;
uniform vec2 resolution;


// Transition parameters --------

// default rotation = 6
const float rotation=9.5; // In degrees

// default scale = 1.2
const float scale=-1.0; // Multiplier


// The code proper --------

void main() {
  // Massage parameters
  float phase = progress < 0.5 ? progress * 2.0 : (progress - 0.5) * 2.0;
  float angleOffset = progress < 0.5 ? mix(0.0, rotation * DEG2RAD, phase) : mix(-rotation * DEG2RAD, 0.0, phase);
  float newScale = progress < 0.5 ? mix(1.0, scale, phase) : mix(scale, 1.0, phase);
  
  vec2 center = vec2(0, 0);

  // Calculate
  float maxRes = max(resolution.x, resolution.y);
  float resX = resolution.x / maxRes * 0.5;
  float resY = resolution.y / maxRes * 0.5;
  vec2 p = (gl_FragCoord.xy / maxRes - vec2(resX, resY)) / newScale;

  // This can probably be optimized (with distance())
  float angle = atan(p.y, p.x) + angleOffset;
  float dist = distance(center, p);
  p.x = cos(angle) * dist + resX;
  p.y = sin(angle) * dist + resY;
  vec4 c = progress < 0.5 ? texture2D(from, p) : texture2D(to, p);

  // Finally, apply the color
  gl_FragColor = c + (progress < 0.5 ? mix(0.0, 1.0, phase) : mix(1.0, 0.0, phase));
}
