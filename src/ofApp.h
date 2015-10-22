#pragma once
 
#include "ofMain.h"
 
class ofApp : public ofBaseApp{
 
        public:
                void setup();
                void update();
                void draw();
                ofDirectory dir;
                int n;
                int n1;
                int x,y,time1,x2;
        float progress;
        ofTexture img;
        ofTexture img2;
                ofShader shader;
                ofFbo fbo;
        vector<ofTexture> seq;
};
