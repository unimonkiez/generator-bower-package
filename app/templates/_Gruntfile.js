'use strict';

module.exports = function(grunt) {
    // Add require for connect-modewrite
    var modRewrite = require('connect-modrewrite');

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        bowerApp: {
            // configurable app path
            app: require('./bower.json').appPath || 'app',
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['js/{,*/}*.js'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['css/{,*/}*.css'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= bowerApp.app %>/{,*/}*.html',
                    'img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: 'http://localhost:<%= connect.options.port %>/<%= bowerApp.app %>'
                }
            }

        },
        // Automatically inject Bower components into the app
        bowerInstall: {
            app: {
                src: ['<%= bowerApp.app %>/index.html'],
                ignorePath: '<%= bowerApp.app %>/'
            }
        },
        // Upload bower component
        shell: {
            bowerRegister: {
                command: 'bower register ' + require('./bower.json').name + ' ' + require('./bower.json').repository.url
            }
        }
    });
    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-bower-install');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-shell');

    // Register new tasks
    grunt.registerTask('serve', ['bowerInstall', 'connect', 'watch']);
    grunt.registerTask('publish', ['shell:bowerRegister']);
}
