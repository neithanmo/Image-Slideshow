#ifdef GL_ES
precision highp float;
#endif
uniform sampler2D from, to;
uniform float progress;
uniform vec2 resolution;

const vec2 tileSize = vec2(256,256 );

const float checkerDistance = 0.015;

const bool flipX = true;
const bool flipY = false;

const bool preTileSingleColor = false; ///8bit ftw
const bool postTileSingleColor = false; ///8bit ftw

vec2 tile2Global(vec2 tex, vec2 tileNum, bool tileSingleColor) {
    vec2 perTile = tileSize / resolution.xy;
    return tileNum * perTile + (tileSingleColor ? vec2(0) : tex*perTile);
}

void main(void)
{
	vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec4 fragColor = vec4(1, 1, 0, 1);

    vec2 posInTile = mod(vec2(gl_FragCoord), tileSize);
    vec2 tileNum = floor(vec2(gl_FragCoord)/ tileSize);
    int num = int(tileNum.x);
    vec2 totalTiles = ceil(resolution.xy / tileSize);
    float countTiles = totalTiles.x * totalTiles.y;
     
	vec2 perTile = ceil(tileSize / resolution.xy);
    float offset = 0.0;   //curtain
    //   scanline horizontal
    offset = (tileNum.x + tileNum.y * totalTiles.x) / countTiles;
    //   and scanline vertical ofc
    //offset = (tileNum.y + tileNum.x * totalTiles.y) / countTiles;

    float timeOffset = (progress - offset) * countTiles;
    timeOffset = clamp(timeOffset, 0.0, 0.5);
    
    float sinTime = 1.0 - abs(cos(fract(timeOffset) * 3.1415926));
    
    fragColor.rg = uv;
    fragColor.b = sinTime;
    
    vec2 texC = posInTile / tileSize;
    
    if (sinTime <= 0.5){
    

        if (flipX) {
            if ((texC.x < sinTime) || (texC.x > 1.0 - sinTime)){
                discard;
            }
            if (texC.x < 0.5) {
                texC.x = (texC.x - sinTime) * 0.5 / (0.5 - sinTime);
            } else {
                texC.x = (texC.x - 0.5) * 0.5 / (0.5 - sinTime) + 0.5;
            }
        }

        if (flipY) {
            if ((texC.y < sinTime) || (texC.y > 1.0 - sinTime)){
                discard;
            }
            if (texC.y < 0.5) {
                texC.y = (texC.y - sinTime) * 0.5 / (0.5 - sinTime);
            } else {
                texC.y = (texC.y - 0.5) * 0.5 / (0.5 - sinTime) + 0.5;
            }
        }

        fragColor = texture2D(from, tile2Global(texC, tileNum, preTileSingleColor));

    } else {
        if (flipX) {
            if ((texC.x > sinTime) || (texC.x < 1.0 - sinTime)){
                discard;
            }
            if (texC.x < 0.5) {
                texC.x = (texC.x - sinTime) * 0.5 / (0.5 - sinTime);
            } else {
                texC.x = (texC.x - 0.5) * 0.5 / (0.5 - sinTime) + 0.5;
            }
            texC.x = 1.0 - texC.x;
        }

        if (flipY) {
            if ((texC.y > sinTime) || (texC.y < 1.0 - sinTime)){
                discard;
            }
            if (texC.y < 0.5) {
                texC.y = (texC.y - sinTime) * 0.5 / (0.5 - sinTime);
            } else {
                texC.y = (texC.y - 0.5) * 0.5 / (0.5 - sinTime) + 0.5;
            }
            texC.y = 1.0 - texC.y;
        }

        fragColor.rgb = texture2D(to, tile2Global(texC, tileNum, postTileSingleColor)).rgb;

    }
    gl_FragColor = fragColor;
  
}
