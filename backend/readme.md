# Presentation Tool - API

## About

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae vestibulum diam. Aliquam porta elit eu ex volutpat, at interdum sapien tristique. Donec sit amet tellus lacus. Morbi aliquet elit quis orci ornare commodo. Duis magna ex, dignissim non mollis sed, auctor eget dui. In urna nibh, convallis quis risus a, semper imperdiet ipsum. In maximus imperdiet velit at aliquet. Nam eget euismod metus.

## How to install

To properly install the API it is very important to follow all the steps and to make sure all the required software is properly installed before testing anything on the API. 

### Pre requisites

#### 1. Install a Liquid Galaxy

This project needs a Liquid Galaxy instance, make sure it's correctly installed before starting. Get the source code [here](https://github.com/LiquidGalaxyLAB/liquid-galaxy).

#### 2. Install MongoDB

**INSTALL ON MASTER ONLY**

All presentations configuration objects are stored in a MongoDB database. Download and install MongoDB Community from [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).

#### 3. Install Nodejs and NPM

**INSTALL ON MASTER ONLY**

The API code was done using Nodejs, to have a running server download and install [Nodejs](https://nodejs.org/en/)

NPM can be found [here](https://www.npmjs.com/get-npm).

#### 4. Install Nodemon

**INSTALL ON MASTER ONLY**

To help with debugging and to see all logs while the API is running install [Nodemon](https://www.npmjs.com/get-npm).

#### 5. Install feh and mpv

**INSTALL ON ALL MACHINES**

You can install feh by running ```sudo apt install feh``` on the terminal or by following the steps on the official [documentation](https://feh.finalrewind.org/).

MPV can be installed by following the steps on the official [installation guide](https://mpv.io/installation/).

#### 6. Install image formats libraries

**INSTALL ON ALL MACHINES**

Use the commands above to install a few required libraries to work with feh and image magick

```
sudo apt install libx11-dev
sudo apt install libjpeg-dev
sudo apt install libtiff-dev
sudo apt install libexif-dev
sudo apt install libxext-dev

```

#### 7. Install Image Magick

**INSTALL ON MASTER ONLY**

To install Image Magick you can refer to the official [documentation](https://imagemagick.org/index.php) or follow this [guide](https://www.tecmint.com/install-imagemagick-on-debian-ubuntu/)

Make sure to have already installed all libraries mentioned above or Image Magick won't execute properly

### Clone the repository

Clone the project repository on the master machine either by downloading or by running: ```git clone https://github.com/LiquidGalaxyLAB/Presentation-Tool.git``` on the terminal

### Install

1. Go to the *Presentation-Tool/backend* directory
2. Inside the */backend* folder open a terminal window and run ```npm install``` to install all project dependencies on the computer

### Configure environments variables

1. Inside the *Presentation-Tool/backend* directory create a file called *.env*
2. Copy paste the text below into the file you have just created
```
PORT=5000
FILE_PATH=/home/lg/Presentation-Tool/backend
SLAVE_STORAGE=/home/lg/storage

```
3. If you have cloned the repository on a different location, update the **FILE_PATH** variable with the current project location
4. The **PORT** is where the API server will be running, if you want to change to a different port, feel free to do it
5. The **SLAVE_STORAGE** is the folder that will have to be created on each slave to store the presentations' media

### Open port 5000

We have to open port 5000 on the master machine so the API can be able to connect with other computers in the network

How to open a TCP port for 5000:

1. Using a terminal navigate to */etc*
2. Edit the the *iptables.conf* file 
3. On the line that contains **-A INPUT -p tcp -m multiport --dports 81,8111,8112 -j ACCEPT**
4. add the port **5000**
5. It will have to look like that for example **-A INPUT -p tcp -m multiport --dports 81,8111,8112,5000 -j ACCEPT**
6. The order of the ports doesn't matter
7. **Save** the file and ```reboot``` the computer

#### Configure the storage

All data used in the project are stored locally, including all the media used on the presentations. Because of that it is very mandatory to set up the all the storage place where the media will be located

1. Inside the *Presentation-Tool/backend* directory create a folde called **storage**. Don't change the name of this folder, it won't work if you use a different name
2. Go inside the *Presentation-Tool/backend/storage* directory and create a folder called **all**. Just like the one from above, don't change the name or it won't work
3. Now go on and enter on each slave and create a folder called **storage** in the */home/lg* directory. **NOTE**: this has to be the same directory you've chosen on the creation of the **SLAVE_STORAGE** variable

If any of these steps weren't properly followed you won't be able to store any media on the Liquid Galaxy

#### Run the server

To run the serve navigate to *Presentation-Tool/backend/* and run *nodemon server.js*. If everything went well you will see logs telling you have the API running on the port you chose (or 5000 if you went with the default) and that it is connected with the database.

Your API will be running on ```[masterip]:[port]```. 

### Problems with the installation?

If having problems with the installation take a look at the full documentation on the [wiki](https://github.com/LiquidGalaxyLAB/Presentation-Tool/wiki) or write an issue in our [issue board](https://github.com/LiquidGalaxyLAB/Presentation-Tool/issues/new)

## Using the API

You can request the API endpoints with softwares like [Postman](https://www.postman.com/), or any other application that can make HTTP requests. 

To have a more friendly and dynamic tool to manage the API, install our [user interface](../frontend/presentation-tool/README.md)

To know more about the API functionalities and how to use it without the user interface check the full documentation in our [wiki](https://github.com/LiquidGalaxyLAB/Presentation-Tool/wiki)

### Endpoints

CREATE  [POST]
> /presentation/create

UPLOAD  [POST]
> /storage/upload

DELETE  [DELETE]
> /presentation/delete/:id

GETALL  [GET]
> /presentation/getall

UPDATE  [PATCH]
> /presentation/update

EXECUTE [GET]
> /presentation/execute/:id

STOP    [GET]
> /presentation/stop

CLEAN_STORAGE   [GET]
> /storage/clean

IMPORT  [POST]
> /share/import

EXPORT  [GET]
> /share/export/:id

## Issues and contributing

Fill up issues, bugs or feature requests in [our issue tracker](https://github.com/LiquidGalaxyLAB/Presentation-Tool/issues/new).

Please try to be very descriptive and clear. 

If you want to contribute, make sure to take a look at the [full documentation](https://github.com/LiquidGalaxyLAB/Presentation-Tool/wiki) and open a [pull request](https://github.com/LiquidGalaxyLAB/Presentation-Tool/compare).

