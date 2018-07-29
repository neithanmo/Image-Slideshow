#pragma once
 
#include "ofMain.h"
 
class ofApp : public ofBaseApp{
 
        public:
                void setup();
                void update();
                void draw();
                ofDirectory dir;
		ofDirectory shaderDir;
                int numberImages;
                int from,
		    y,
		    time1,
		    to,
		    shaderIndex,
		    numberShaders;
        	float progress;
        	ofShader shader;
                ofFbo fbo;
        	vector<ofTexture> seq;
		vector<string> shaderList;
};
