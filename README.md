# RPI-Slideshow
The RPI-Slideshow is a simple image slideshow for the Raspberry Pi2 B++ or superior. 

The RPI-Slideshow uses shaders for the effects used in the images transitions, not computational cost because it is entirely based on accelerated graphics in the Raspberry Pi GPU. The transitions are based on fragment shaders which are programmmed using the OpenGL shading Lenguage(GLSL), about how write your own transition you can look [here](https://thebookofshaders.com/) and others interactive resources are [gl-transitions](https://gl-transitions.com/), [sandbox](http://glslsandbox.com/).
 The shader transitions used in this proyect were taken from the The Open Collection of [GLTransitions](https://gl-transitions.com/gallery).
 
 ## Building Instructions
 RPI-Slideshow uses [Openframeworks](https://openframeworks.cc/) version 0.10.0, the most recent. Go to the [Download](https://openframeworks.cc/download/) and choose the proper ARM version for your Raspberry Pi, currently only support for *armv6* and *armv7*, but the *armv7* should work for the latest Raspberry Pi. Download and unzip openframeworks in your  Raspberry Pi  with:
 ```
wget --no-check-certificate https://openframeworks.cc/versions/v0.10.0/of_v0.10.0_linuxarmv6l_release.tar.gz
tar -xf of_v0.10.0_linuxarmv6l_release.tar.gz
```
then, install the Openframeworks dependencies, according the OS running in your Raspberry Pi, suppose it is raspbian:
```
cd ~/of_v0.10.0_linuxarmv6l_release/scripts/linux/debian
./install_dependencies.sh   
```
The `install_dependencies.sh` script will take a while for downloading and installing all necessary dependencies.
after the dependencies installation is time to  compile Openframeworks, but first, is necessary have enough memory. check your raspi-config and assign only 64MB for graphics memory, this value is the default, so, the system will have enough ram memory for compiling.
```
cd ~/of_v0.10.0_linuxarmv6l_release/scripts/linux
./compileOF.sh   
```
The `compileOF.sh` script will take a lot of time compiling openframeworks.
If something wrong occured during the installation refer to openframeworks forum for answers or send me a email.Now we need to compile the RPI-Slideshow source, for that:
```
cd ~/of_v0.10.0_linuxarmv6l_release/apps/myApps
git clone https://github.com/neithanmo/Image-Slideshow.git
cd Image-Slideshow/
make 
```
This will compile the source code of RPI-Slideshow, some important element to consider before running the RPI-Slideshow is about the path to the images directory and fragment shaders directory, change it in the `ofApp.cpp` file inside the `src/` directory, according to the path in your system 

```
#define FRAGMENT_DIR "PATH_TO/openframeworks0-10-armv6/apps/myApps/Image-Slideshow/bin/data/fragShaders"
#define IMAGES_DIR "PATH_TO/imgs"
```
The fragment shaders are located inside the proyect directory, under the `bin/data` subdirectory and inside of `fragShaders/` directory. then we are ready for running the RPI-Slideshow binary, this binary is located inside the bin subdirectory, but before that we need to change the system configuration specifically the memory assigned for graphics, in the compilation steps the graphics memory was reduced to 64MB, now it should be changed to 512MB. for that, run the `sudo raspi-config` command and adjust his value in the advanced options. after that reboot the system and run the Image-Slideshow

```
cd ~/of_v0.10.0_linuxarmv6l_release/apps/myApps/Image-Slideshow
./bin/Image-slideshow
```

## Development Plans
I am working in a way for configuring the Image-Slideshow dynamically using configuration files, things like:
1. Path to the directory containing the images( images should be 1080p)
2. Transition time between images
3. Duration between images
4. Path to the fragment shaders directory(by default this directory is located in Image-Slideshow/bin/data/fragShaders)
5. Automatic resize for images which are not 1920x1080p(can be expensive)




