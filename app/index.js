'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var spacify = function(str) {
    return str.substring(0, 1).toUpperCase() +
        str.substring(1).replace(/-.?/g, function(a) {
            return a.substring(1).toUpperCase();
        })
        .replace(/([a-z])?([A-Z])/g, "$1 $2");
}

var BowerPackageGenerator = yeoman.generators.Base.extend({
    init: function() {
        this.pkg = require('../package.json');

        this.on('end', function() {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the marvelous Bower Package generator!'));

        var prompts = [{
            name: 'bowerTitle',
            message: 'What is your package\'s title?',
            default: this.config.get('context') ? this.config.get('context')['bower_title'] : spacify(this.appname)
        }, {
            name: 'bowerDesc',
            message: 'What is your package description?',
            default: this.config.get('context') ? this.config.get('context')['bower_desc'] : ''
        }, {
            name: 'bowerVersion',
            message: 'Package\'s version?',
            default: this.config.get('context') ? this.config.get('context')['bower_version'] : '0.0.1'
        }, {
            name: 'bowerURL',
            message: 'Please enter your git reposotory url. \ncreate a git repo - has it required by any bower component \n(for exmaple - https://github.com/yuvalsaraf/real-gallery)',
            default: this.config.get('context') ? this.config.get('context')['bower_url'] : ''
        }, {
            name: 'fullName',
            message: 'What\'s your name? (for example - Yuval Saraf)',
            default: this.config.get('context') ? this.config.get('context')['full_name'] : ''
        }];

        this.prompt(prompts, function(props) {
            this.bowerTitle = props.bowerTitle;
            this.bowerName = this.bowerTitle.toLowerCase().replace(/\ /g, '-');
            this.bowerDesc = props.bowerDesc;
            this.bowerVersion = props.bowerVersion;
            this.bowerURL = props.bowerURL;
            this.fullName = props.fullName;

            done();
        }.bind(this));
    },
    app: function() {
        this.copy('_package.json', 'package.json');
        this.copy('_.bowerrc', '.bowerrc');
        this.mkdir('app');
        this.mkdir('app/js');
        this.mkdir('app/css');
        this.mkdir('app/img');
        this.copy('_sprites.gif', 'app/img/sprites.gif');
        this.copy('_js.js', 'app/js/' + this.bowerName + '.js');
        this.copy('_css.css', 'app/css/' + this.bowerName + '.css');
        this.copy('_Gruntfile.js', 'Gruntfile.js');
        this.copy('_.gitignore', '.gitignore');
    },
    copyMainFiles: function() {

        var urlSeperator = '://';
        var bowerBaseURL = this.bowerURL.substring(this.bowerURL.indexOf(urlSeperator) + urlSeperator.length);

        var context = {
            bower_name: this.bowerName,
            bower_title: this.bowerTitle,
            bower_desc: this.bowerDesc,
            bower_version: this.bowerVersion,
            bower_url: this.bowerURL,
            bower_repo: 'git://' + bowerBaseURL + '.git',
            bower_bugs: this.bowerURL + '/issues',
            full_name: this.fullName
        };
        this.config.set('context', context);
        this.config.save();

        this.template("_index.html", "app/index.html", context);
        this.template("_bower.json", "bower.json", context);
        this.template("_component.json", "component.json", context);
        this.template("_README.md", "README.md", context);

        // Print a message post install
        this.on('end', function() {
            this.log(chalk.bold.yellow('Be sure to visit ') + chalk.bold.red('https://github.com/yuvalsaraf/generator-bower-package.git') + chalk.bold.yellow('\nand read all about the generator!'));
            chalk.bold.red('https://github.com/yuvalsaraf/generator-bower-package.git')
        });

    }
});

module.exports = BowerPackageGenerator;
