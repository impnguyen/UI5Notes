'use strict';
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dir: {
            src: 'WebContent',
            deployment: './',
            bower_components: 'bower_components'
        },

        connect: {
            options: {
                port: 8091,
                //base: '<%= dir.deployment %>',
                hostname: '*',
                keepalive: true,
            },
            src: {},
            dist: {}
        },

        openui5_connect: {
            options: {
                resources: [
                    '<%= dir.bower_components %>/openui5-sap.ui.core/resources',
                    '<%= dir.bower_components %>/openui5-sap.m/resources',
                    '<%= dir.bower_components %>/openui5-themelib_sap_belize/resources'
                ]
            },
            src: {
                options: {
                    appresources: '<%= dir.src %>'
                }
            }
        }

    });

    // tasks.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-openui5');

    // Default task(s).
    grunt.registerTask('deploy', ['openui5_connect']);

};