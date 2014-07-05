'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var spacify = function (str) {  
    return str.substring(0, 1).toUpperCase() +
           str.substring(1).replace(/-.?/g,function(a){return a.substring(1).toUpperCase();})
		   .replace(/([a-z])?([A-Z])/g, "$1 $2");
}

var BowerPackageGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Bower Package generator!'));

    var prompts = [{
      name: 'bowerTitle',
      message: 'What is your package\'s title?',
	  default: spacify(this.appname)
    },
	{
	  name: 'bowerDesc',
	  message: 'What is your package description?'
	},
	{
	  name: 'bowerVersion',
	  message: 'Package\'s version?',
	  default: '0.0.1'	  
	}];

    this.prompt(prompts, function (props) {
      this.bowerTitle = props.bowerTitle;
	  console.log(this.bowerTitle);
      //done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('demo');
    //this.mkdir('app/templates');

    this.copy('_package.json', 'demo/package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = BowerPackageGenerator;
