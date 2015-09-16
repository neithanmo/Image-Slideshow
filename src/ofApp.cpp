#include "ofApp.h"
int x2;
//--------------------------------------------------------------
void ofApp::setup(){
    ofSetFrameRate(25);
	ofHideCursor();
	x2 = 1;
	ofEnableAlphaBlending();
	n = dir.listDir("/home/pi/openFrameWorks/apps/myApps/slideshow2/bin/data/imgs");
	seq.resize( n );
        im.loadImage("betho.jpg");
	//4. Load images
	for (int i=0; i<n; i++) {
		//Getting i-th file name
		string fileName = dir.getPath( i );

		//Load i-th image
		ofLoadImage( seq[i], fileName );
		//seq[i].resize(1920,1080);
	}
	shader.load("shader.vert", "shader.frag", "");
	fbo.allocate(ofGetWidth(), ofGetHeight());
        
	//ofEnableAlphaBlending();
}

//--------------------------------------------------------------
void ofApp::update(){
    n1 = dir.listDir("/home/pi/openFrameWorks/apps/myApps/slideshow2/bin/data/imgs");
    if(!(n==n1)){
        seq.resize( n1 );
	for (int i=0; i<n1; i++) {
		string fileName = dir.getPath( i );
		ofLoadImage( seq[i], fileName );
                //seq[i].resize(1920, 1080);
	}
    //cout<<"n=" << n <<endl;
    //cout<<"n1=" << n1 <<endl;
	n=n1;
    }
	
	y=ofGetFrameNum();
	time1 = (y%201);
	switch(time1)
        {
	case 0:
   		if(x2==n) {
			x2=0;
                        x++;
		}
        	else if(x2<n){
			x2++;
                        x=x2-1;
			}
       		break;
	default:
        	break;
	}
	progress=ofMap(time1,0,25,0,1,true);
    	//seq[x];
	//seq[x2];
	fbo.begin();
		ofBackground(0);
		shader.begin();
			shader.setUniform2f("resolution", ofGetWidth(), ofGetHeight());
			shader.setUniform1f("time", ofGetElapsedTimef());
                        shader.setUniform1f("progress", progress);
		        shader.setUniformTexture("from", seq[x],1);
			shader.setUniformTexture("to", seq[x2],2);
                        shader.setUniformTexture("luma", im,3);
			//img.draw(0,0);
			ofRect(0,0,1920,1080);
		shader.end();
	fbo.end();
        //std::stringstream pro;
        //pro <<ofToString(time1);
        //ofSetWindowTitle(pro.str()); 
}
//--------------------------------------------------------------
void ofApp::draw(){
	fbo.draw(0,0);
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){

}
