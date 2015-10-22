#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

// FractalAnxiety by Kali 2015-09-03
//
// original:  https://www.shadertoy.com/view/4tBXRh
//
// A trick to use any variable as an array index.
// Array index must be a constant, and the loop index is a constant when unrolled 
// so we can use it to compare it with any variable and return the array value that matches, 
// or an interpolation of the two closest matches.

// move mouse to the right side to see palette

vec3 palette[7]; // the color palette is stored here

// just pick a color based on c value
vec3 getcolor(float c) 
{
	c=mod(c,7.); // cycle palette
	int p=0;
	vec3 color=vec3(0.);
	for(int i=0;i<7;i++) {
		if (float(i)-c<=.0) { // check loop index against color value
			color=palette[i]; // store color picked	
		}
	}
	return color;
}

// get a gradient of the palette based on c value, with a "smooth" parameter (0...1)
vec3 getsmcolor(float c, float s) 
{
    s*=.5;
    c=mod(c-.5,7.);
    vec3 color1=vec3(0.0),color2=vec3(0.0);
    for(int i=0;i<7;i++) {
        if (float(i)-c<=.0) {
            color1 = palette[i];
            color2 = palette[(i+1>6)?0:i+1];
        }
    }
    // smooth mix the two colors
    return mix(color1,color2,smoothstep(.5-s,.5+s,fract(c)));
}
void main( void )
{
	float time = time * 0.02 + mouse.x;
	
	// define the colors 
	palette[6]=vec3(0,0,0.5);
	palette[5]=vec3(1);
	palette[4]=vec3(0,0.3,0.5);
	palette[3]=vec3(0,0,1);
	palette[2]=vec3(0.3,0,0.51);
	palette[1]=vec3(1);
	palette[0]=vec3(0,0,0.5);
	
	vec3 color=vec3(0.);
	vec2 uv = gl_FragCoord.xy / resolution.xy;

	if (uv.x>.9) { 
		color=getsmcolor(uv.y*7.+time*.5,.25+.75*abs(time)); //gradient function
	}  

	vec2 p=(uv-.5);
	p.x*=resolution.x/resolution.y;
	
	vec2 r = vec2(length(p), atan(p.x, p.y)*1.5);
	p = r.x * vec2(sin(r.y), cos(r.y));
	
	
	// fractal
	float a=time*.075;	
	float ot=1000.;
	mat2 rot=mat2(cos(a),sin(a),-sin(a),cos(a));
	float l=length(p);
	for(int i=0;i<20;i++) {
		p*=rot;
		p *= 1.+length(mouse);
        	p=abs(p)*1.2-1.;
        	ot=min(ot,abs(dot(p,p)-sin(l*20.)*.015-.15)); //orbit trap
	}
	ot=max(0.,.1-ot)/.1; //orbit trap 
	if (length(max(vec2(0.),abs(uv-.5)-vec2(.485,.47)))>0.0) color*=0.; // border 	
	if (mouse.x<0.9 || length(max(vec2(0.),abs(uv-.5)-vec2(.37,.46)))<0.01) {
		color=getsmcolor(ot*4.+l*10.-time*7.,1.)*(1.-.4*step(.5,1.-dot(p,p))); //get color gradient for orbit trap value	
	}
	color=mix(vec3(length(color))*.5,color,.6); // saturation adjustment
	color*=1.-pow(l*1.1,5.); color+=pow(max(0.,.2-l)/.2,3.)*1.2; // center glow
	gl_FragColor = vec4(color,1.0);
}

