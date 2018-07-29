#include "ofApp.h"
// #### setup ########

#define FRAGMENT_DIR "/home/pi/openframeworks0-10-armv6/apps/myApps/rpiSlideshow/bin/data/fragShaders"

void ofApp::setup(){
    ofSetFrameRate(30);
    ofHideCursor();
    to = 0;
    from  = -1;
    shaderIndex = 0;
    ofEnableAlphaBlending();
    numberImages = dir.listDir("/home/pi/imgs");
    seq.resize( numberImages );
 
    //4. Load images
    for (int i=0; i < numberImages; i++) {
        //Getting i-th file name
        string fileName = dir.getPath( i );
 
        //Load i-th image
        ofLoadImage( seq[i], fileName );
        //seq[i].resize(1920,1080);
    }

    numberShaders = shaderDir.listDir(FRAGMENT_DIR);
    for(int i=0; i<numberShaders;i++){
	shaderList.push_back(shaderDir.getPath(i));
	cout<<shaderDir.getPath(i)<<endl;
    }
    cout<<"number of shaders "<<numberShaders <<"shaderList:" << shaderList.size()<<endl;
    shader.load("shader.vert", shaderList[0]);
    fbo.allocate(ofGetWidth(), ofGetHeight());
    ofEnableAlphaBlending();
}
 
 
//###update part ######
 
void ofApp::update(){
    int n1 = dir.listDir("/home/pi/imgs");
    if( numberImages != n1 ){
        seq.resize( n1 );
	numberImages = n1;
        for (int i=0; i<n1; i++) {
            string fileName = dir.getPath( i );
            ofLoadImage( seq[i], fileName );
        }
    }
        
    y = ofGetFrameNum();
    time1 = ( y % 101 );
    if( !time1 ){
	from++;
	to++;
	shaderIndex++;
        if( from == numberImages )
            from = 0;
	if( to == numberImages)
            to = 0;
	if(shaderIndex == numberShaders)
	    shaderIndex = 0;
    	cout <<"total images: "<< n1 << " from = "<< from << " to = "<< to <<endl;
	cout << "shader effect "<< shaderList[shaderIndex]<<endl;
	shader.unload();
	shader.load("shader.vert", shaderList[shaderIndex]);
    }
    progress = ofMap(time1,0,25,0,1,true);
    fbo.begin();
    ofBackground(0);
    shader.begin();
        shader.setUniform2f("resolution", ofGetWidth(), ofGetHeight());
        shader.setUniform1f("progress", progress);
        shader.setUniform1f("time", ofGetElapsedTimef());
        shader.setUniformTexture("from",seq[from],1);
        shader.setUniformTexture("to",seq[to],2);
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


