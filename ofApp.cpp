#include "ofApp.h"
float scaleX;
float scaleY;
//--------------------------------------------------------------
void ofApp::setup(){
    ofSetFrameRate(25);
	//2. Get the number of files in the folder data/woolCloudSeq
	n = dir.listDir("imgs");

	//3. Set the array size to n
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
    //ofSetWindowShape( seq[1].getWidth, seq[1].getHeight );
    //scaleX = ofGetWidth/seq[0].getWidth;
}

//--------------------------------------------------------------
void ofApp::update(){

    n1 = dir.listDir("imgs");
    if(!(n==n1)){
        seq.resize( n1 );
	for (int i=0; i<n1; i++) {
		//Getting i-th file name
		string fileName = dir.getPath( i );

		//Load i-th image
		ofLoadImage( seq[i], fileName );
	}
    cout<<"n=" << n <<endl;
    cout<<"n1=" << n1 <<endl;
	n=n1;
    }
}

//--------------------------------------------------------------
void ofApp::draw(){
	//Draw background video
	ofBackground(0);
	ofSetColor( 255, 255, 255 );
	float time = ofGetElapsedTimef();
	float duration = (9*n) / 1.0; // al fin de cuentas es una duracion en segundos, uniforme
	float pos = fmodf( time, duration );
	int i = int( pos / duration * n );
	ofImage img = seq[i];
	img.resize(1280, 720);
        float time1 = ofGetElapsedTimef();
	ofBackground(255);
	ofSetColor(255,255,255);
        shader.begin();
        	shader.setUniform1f("time", time1);
        	shader.setUniformTexture("tex0", img.getTextureReference(), 1);
        shader.end();

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
