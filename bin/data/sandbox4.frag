// Endless Tunnel
// By: Brandon Fogerty
// bfogerty at gmail dot com

#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

#define HorizontalAmplitude		0.80
#define VerticleAmplitude		0.80
#define HorizontalSpeed			0.90
#define VerticleSpeed			0.50
#define ParticleMinSize			1.76
#define ParticleMaxSize			1.71
#define ParticleBreathingSpeed		0.30
#define ParticleColorChangeSpeed	0.70
#define ParticleCount			7.0
#define ParticleColor1			vec3(9.0, 5.0, 3.0)
#define ParticleColor2			vec3(1.0, 3.0, 9.0)


vec3 checkerBoard( vec2 uv, vec2 pp )
{
    vec2 p = floor( uv * 4.6 );
    float t = mod( p.x + p.y, 2.2);
    vec3 c = vec3(t+pp.x, t+pp.y, t+(pp.x*pp.y));

    return c;
}

vec3 tunnel( vec2 p, float scrollSpeed, float rotateSpeed )
{    
    float a = 2.0 * atan( p.x, p.y  );
	
    // Remove the seam at the bottom.
    a *= ( 3.0 / 3.141596 );
	
    float po = 2.0;
    float px = pow( p.x*p.x, po );
    float py = pow( p.y*p.y, po );
    float r = pow( px + py, 1.0/(2.0*po) );    
    vec2 uvp = vec2( 1.0/r + (time*scrollSpeed), a + (time*rotateSpeed));	
    vec3 finalColor = checkerBoard( uvp, p ).xyz;
    finalColor *= r;

    return finalColor;
}

vec3 particles( vec2 uv )
{
	vec2 pos = uv * 2.0 - 1.0;
	pos.x *= (resolution.x / resolution.y);
	
	vec3 c = vec3( 0, 0, 0 );
	
	for( float i = 1.0; i < ParticleCount+1.0; ++i )
	{
		float cs = cos( time * HorizontalSpeed * (i/ParticleCount) ) * HorizontalAmplitude;
		float ss = sin( time * VerticleSpeed   * (i/ParticleCount) ) * VerticleAmplitude;
		vec2 origin = vec2( cs , ss );
		
		float t = sin( time * ParticleBreathingSpeed * i ) * 0.5 + 0.5;
		float particleSize = mix( ParticleMinSize, ParticleMaxSize, t );
		float d = clamp( sin( length( pos - origin )  + particleSize ), 0.0, particleSize);
		
		float t2 = sin( time * ParticleColorChangeSpeed * i ) * 0.5 + 0.5;
		vec3 color = mix( ParticleColor1, ParticleColor2, t2 );
		c += color * pow( d, 70.0 );
	}
	
	return c;
}

void main(void)
{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float timeSpeedX = time * 0.3;
    float timeSpeedY = time * 0.2;
    vec2 p = uv + vec2( -0.50+cos(timeSpeedX)*0.2, -0.5-sin(timeSpeedY)*0.3 );

    vec3 finalColor = tunnel( p , 1.0, 0.0);


    timeSpeedX = time * 0.30001;
    timeSpeedY = time * 0.20001;
    p = uv + vec2( -0.50+cos(timeSpeedX)*0.2, -0.5-sin(timeSpeedY)*0.3 );
    
	
	finalColor += particles( uv );
	
    gl_FragColor = vec4( finalColor, 1.0 );
}
