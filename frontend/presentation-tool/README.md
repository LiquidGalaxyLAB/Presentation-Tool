# Presentation Tool - User interface

## About

The user interface was developed to facilitate the managing of the presentations created with the Presentation Tool API. 

This tool provides full connection to all API functionality, including create, edit and delete operations, and also import and export.

It is a web application that was developed using the [Vue.js](https://vuejs.org/) framework and has a pwa support, so it can be installed as a shortcut in your devices.

## How to install

To properly install the frontend is very important to follow all the steps and to make sure all the required software is correctly installed and working, including the API. 

### Choose where the project will be running

As you should already have the repository cloned in the master machine, now you can choose between running its server on the master machine or copying the frontend folder to another computer and run the server there.

### Using in another computer

#### Pre requisites

The following programs have to be installed in your computer:

* [Nodejs](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/get-npm)

#### Install

1. Copy the whole */frontend* directory from the project repository to the other computer
2. With a terminal openned, navigate to where you stored the frontend and them to */frontend/presentation-tool*
3. Inside */presentation-tool* directory run ```npm install``` to install all the project dependencies in your computer

#### Configure the environment variables

Create the environment variables needed for the project to connect the interface with the API that is running on the Liquid Galaxy

1. Still on the */frontend/presentation-tool* directory, create a file with the name *.env*
2. Copy paste the text below on the file you have just created

```
    VUE_APP_LG_IP=put the liquid galaxy ip address here
    
    VUE_APP_LG_PORT=put the port that the api is running on
```
3. Substitute the text after the equal sign with the IP of the Liquid Galaxy master machine and with the port where the API is running (5000 if you used the suggested one on the backend)

#### Run the app

1. Run the app by running ```npm run serve --port 8080``` on the terminal inside */frontend/presentation-tool* directory

2. Your app will be running on ```localhost:8080```


### Running on the master machine

#### Pre requisites

No pre requisites are needed to be installed in this case, as the master machine already has [Nodejs](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/get-npm) installed due to the API installation.

#### Install

1. With a terminal openned, navigate to where you stored the project and them to *Presentation-Tool/frontend/presentation-tool*
2. Inside */presentation-tool* directory run ```npm install``` to install all the project dependencies in the master computer

#### Configure the environment variables

Create the environment variables needed for the project to connect the interface with the API that is running on the Liquid Galaxy

1. Still on the *Presentation-Tool/frontend/presentation-tool* directory, create a file with the name *.env*
2. Copy paste the text below on the file you have just created

```
    VUE_APP_LG_IP=put the liquid galaxy ip address here
    
    VUE_APP_LG_PORT=put the port that the api is running on
```
3. Substitute the text after the equal sign with the IP of the Liquid Galaxy master machine and with the port where the API is running (5000 if you used the suggested one on the backend)

#### Open port 8080

With the frontend server running on the master machine you will want to access it from another device (computer/tablet/cellphone). 

The server will be running on port 8080 and to be possible to access it from the outside you need to open a a TCP port for 8080.

How to open the 8080 port:

1. Using a terminal navigate to */etc*
2. Edit the the *iptables.conf* file 
3. On the line that contains **-A INPUT -p tcp -m multiport --dports 81,8111,8112 -j ACCEPT**
4. add the port **8080**
5. It will have to look like that for example **-A INPUT -p tcp -m multiport --dports 81,8111,8112,5000,8080 -j ACCEPT**
6. The order of the ports doesn't matter
7. **Save** the file and ```reboot``` the computer

#### Run the app

1. Run the app by running ```npm run serve --port 8080``` on the terminal inside *Presentation-Tool/frontend/presentation-tool* directory

2. Your app will be running on ```[masterIP]:8080``` and can be accessed by any computer connected in the same network

### Problems with the installation?

If having problems with the installation take a look at the full documentation on the [wiki](https://github.com/LiquidGalaxyLAB/Presentation-Tool/wiki) or write an issue in our [issue board](https://github.com/LiquidGalaxyLAB/Presentation-Tool/issues/new)

## Issues and contributing

Fill up issues, bugs or feature requests in [our issue tracker](https://github.com/LiquidGalaxyLAB/Presentation-Tool/issues/new).

Please try to be very descriptive and clear. 

If you want to contribute, make sure to take a look at the [full documentation](https://github.com/LiquidGalaxyLAB/Presentation-Tool/wiki) and open a [pull request](https://github.com/LiquidGalaxyLAB/Presentation-Tool/compare).







