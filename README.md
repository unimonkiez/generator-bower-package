# Yeoman Bower component project development generator!

## Description
This is a simple generator for creating your first (and more) bower components!
Generates demos files and default cofogurations for developing a bower component.
Also contains a simple and fast grunt server for developing.

## Setup
* **Setup Git**
  First, setup your git on your favorite git website.
* **Instll the generator**
  Install 'bower package'
  ```shell
  npm install -g bower package
  ```
* **Create a folder for developing**
  Create a folder for developing with your component name
* **Run the generator**
  Run the generator
  ```shell
  yo bower package
  ```

## Usage

* **Server**  
  After installing, you can run the server by running the command
  ```shell
  grunt serve
  ```
  The project will open in your default browser, including grunt watcher for refreshing the site and files' changes.
* **Add to bower**  
  You can also publish your bower component by typing
  ```shell
  grunt publish
  ```
  The component is now live for anyone to download!

## Requirements

### Mandatory requirements
* nodeJS
* Yeoman
* grunt
* bower

By Yuval Saraf