#include "ofApp.h"
// #### setup ########
 
void ofApp::setup(){
    ofSetFrameRate(30);
        ofHideCursor();
        x2 = 1;
        x=0;
        ofEnableAlphaBlending();
        n = dir.listDir("/home/pi/imgs");
        seq.resize( n );
 
        //4. Load images
        for (int i=0; i<n; i++) {
                //Getting i-th file name
                string fileName = dir.getPath( i );
 
                //Load i-th image
                ofLoadImage( seq[i], fileName );
                //seq[i].resize(1920,1080);
        }
        shader.load("shader.vert", "shader.frag");
        fbo.allocate(ofGetWidth(), ofGetHeight());
        ofEnableAlphaBlending();
}
 
 
//###update part ######
 
void ofApp::update(){
    n1 = dir.listDir("/home/pi/imgs");
    if(!(n==n1)){
        seq.resize( n1 );
        for (int i=0; i<n1; i++) {
                string fileName = dir.getPath( i );
                ofLoadImage( seq[i], fileName );
        }
    cout<<"n=" << n <<endl;
    cout<<"n1=" << n1 <<endl;
        n=n1;
    }
        
        y=ofGetFrameNum();
        time1 = (y%201);
        if ((time1==0)&&(x<n)){
                x++;
        }
        if((time1==0)&&(x==n))
        {
                x=0;
        }
        if ((time1==0)&&(x2<n)){
                x2++;
        }
        if ((time1==0)&&(x2==n)){
                x2=0;
        }
        progress=ofMap(time1,0,25,0,1,true);
        fbo.begin();
                ofBackground(0);
                shader.begin();
                        shader.setUniform2f("resolution", ofGetWidth(), ofGetHeight());
                        shader.setUniform1f("progress", progress);
                        shader.setUniformTexture("from",seq[x],1);
                        shader.setUniformTexture("to",seq[x2],2);
                        ofRect(0,0,1920,1080);
                shader.end();
        fbo.end();
}
//--------------------------------------------------------------
void ofApp::draw()
{
	fbo.draw(0,0);
}

//--------------------------------------------------------------


