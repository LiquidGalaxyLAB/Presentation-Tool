# Presentation Tool - API

## About

The API idea is to propose the execution of different types of media at the same time using multiple processing with bash to show big chunks of data at the same time and alongside Google Earth and other applications. These media can be grouped in what we call a Presentation.

A Presentation is a set of configurations users can save on Liquid Galaxy to programatically open media in different positions, screens and time.

Each presentation contains its basic information (like name, description, audio and category) and its slides. Just like in a presentation tool, like PowerPoint or Libre Office, users can create slides. Each slide has a duration, an its order of execution, so users know when it's going to be executed and for how long. Inside the slides users can add different media (images, videos, audio and sync with Google Earth by using the fly to operation).

The API has a set of managing presentation functionalities, from execute and stop to read,create,edit,delete,import and export. 


## How to install

To properly install the API it is very important to follow all the steps and to make sure all the required software is properly installed before testing anything on the API. 

### Pre requisites

#### 1. Install a Liquid Galaxy

This project needs a Liquid Galaxy instance, make sure it's correctly installed before starting. Get the source code [here](https://github.com/LiquidGalaxyLAB/liquid-galaxy).

#### 2. Install MongoDB

**INSTALL ON MASTER ONLY**

All presentations configuration objects are stored in a MongoDB database. Download and install MongoDB Community by following the steps below of by checking out the official documentation [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).

* Import the public key used by the package management system

```
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

* Create a list file for MongoDB

```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

* Reload local package database

```
sudo apt update
```

* Install the MongoDB packages

```
sudo apt-get install -y mongodb-org
```

* Start MongoDB

```
sudo service mongod start
```

* Begin using mongo to check if installation went ok

```
mongo
```

#### 3. Install Nodejs and NPM

**INSTALL ON MASTER ONLY**

The API code was done using Nodejs, to have a running server download and install Nodejs by following the commands below or by checking out the official documentation [here](https://nodejs.org/en/)

* Install Node.js from apt

```
sudo apt install nodejs
```

* Update Node.js version

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

Use the step bellow to install NPM or check out the documentation [here](https://www.npmjs.com/get-npm).

* Install npm

```
sudo apt install npm
```

#### 4. Install Nodemon

**INSTALL ON MASTER ONLY**

To help with debugging and to see all logs while the API is running install [Nodemon](https://nodemon.io/).

* Run on the terminal

```
sudo npm install -g nodemon
```

#### 5. Install feh and mpv

**INSTALL ON ALL MACHINES**

You can install feh by running ```sudo apt install feh``` on the terminal or by following the steps on the official [documentation](https://feh.finalrewind.org/).


MPV can be installed by following the steps on the official [installation guide](https://mpv.io/installation/) or by using the commands below.

* Add PPA

```
sudo add-apt-repository ppa:mc3man/mpv-tests
```

* Update the package manager

```
sudo apt update
```

* Install the program

```
sudo apt install mpv
```


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

#### 7. Install FFPLAY

**INSTALL ON ALL MACHINES**

FFPLAY is used to play audio. Intall it by using the command below or by looking at the official documentation [here](https://ffmpeg.org/ffplay.html)

```
sudo apt install ffplay
```

#### 8. Install ffmpeg

**INSTALL ON ALL MACHINES**

ffmpeg is used to get information about the videos resolution. Install it using:

```
sudo apt install ffmpeg
```

#### 9. Install Image Magick

**INSTALL ON MASTER ONLY**

To install Image Magick you can refer to the official [documentation](https://imagemagick.org/index.php) or follow the guide below.

* Configure environment

```
sudo apt update 
sudo apt install build-essential
```

* Download source files (NOTE: if the version updates just change the numbers of the package for the version you download)

```
wget https://www.imagemagick.org/download/ImageMagick.tar.gz
tar xvzf ImageMagick.tar.gz
$ cd ImageMagick-7.0.8-26/
```

* Compile and configure

```
./configure
make
sudo make install
sudo ldconfig /usr/local/lib
```

* Verify if it was correctly installed

```
identify -version
```

Make sure to have already installed all libraries mentioned above or Image Magick won't execute properly

### Clone the repository

Clone the project repository on the master machine either by downloading or by running: ```git clone https://github.com/LiquidGalaxyLAB/Presentation-Tool.git``` on the terminal

### Install

1. Go to the *Presentation-Tool/backend* directory

2. Inside the */backend* folder open a terminal window and run ```npm install``` to install all project dependencies on the computer

### Configure environments variables

**IMPORTANT:** The environments variables are very important for the functionality of the API. If any changes were made in the computer, either renamed/moved directories or change of IP addresses and ports, make sure to ALWAYS update you .env file with the new configuration, as it won't be updated by its own.

1. Inside the *Presentation-Tool/backend* directory create a file called *.env*

2. Copy paste the text below into the file you have just created
```
PORT=5000
FILE_PATH=/home/lg/Presentation-Tool/backend
SLAVE_STORAGE=/home/lg/storage
HOME=/home/lg

```

3. If you have cloned the repository on a different location, update the **FILE_PATH** variable with the current project location

4. The **PORT** is where the API server will be running, if you want to change to a different port, feel free to do it

5. The **SLAVE_STORAGE** is the folder that will have to be created on each slave to store the presentations' media

6. The **HOME** var is the master home directory

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

### Configure the storage

All data used in the project are stored locally, including all the media used on the presentations. Because of that it is very mandatory to set up the all the storage place where the media will be located

1. Inside the *Presentation-Tool/backend* directory create a folde called **storage**. Don't change the name of this folder, it won't work if you use a different name

2. Go inside the *Presentation-Tool/backend/storage* directory and create a folder called **all**. Just like the one from above, don't change the name or it won't work

3. Now go on and enter on each slave and create a folder called **storage** in the */home/lg* directory. **NOTE**: this has to be the same directory you've chosen on the creation of the **SLAVE_STORAGE** variable

If any of these steps weren't properly followed you won't be able to store any media on the Liquid Galaxy

### Download and configure the demo

1. Download the zip file located [here](https://drive.google.com/file/d/1q_5ad3cIyLNBxceEPKZZ-Me6ku1qVn8g/view?usp=sharing) 

2. Copy the download file to the *Presentation-Tool/backend/utils* directory.

### Run the server

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

