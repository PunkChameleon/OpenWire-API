module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        jslint : {
            client : {
                src : [
                    '*.js',
                    'lib/*.js',
                    'lib/**/*.js',
                    'Gruntfile.js'
                ],
                directives : {
                    browser : true,
                    node : true,
                    nomen : true,
                    sloppy : true,
                    unparam : true,
                    predef : ['require', 'define']
                }
            }
        },
        watch : {
            files : [
                'lib/*.js',
                'lib/**/*.js',
                'Gruntfile.js'
            ],
            tasks : ['jslint']
        }
    });

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jslint']);
};
