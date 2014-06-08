'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'js/libs/modernizr-2.6.2-respond-1.1.0.min.js',
                    'js/script.js',
                    'js/plugins.js'
                ],
                dest: 'js/build/production.js',
            },
        },
        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}','!build/**/*.{png,jpg,gif}'],
                    dest: 'images/build/',
                }],
                options: {
                    //cache: false
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat:dist', 'uglify'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['sass/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                }
            },
            images: {
                files: ['images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    trace: true,
                    sourcemap: true
                },
                files: {
                    'css/production.min.css': 'sass/style.scss'
                }
            }
        },
        compass: {                  // Task
          dist: {                   // Target
            options: {              // Target options
              sassDir: 'sass',
              cssDir: 'css',
              environment: 'production',
              config: 'config.rb'
            }
          },
          dev: {                    // Another target
            options: {
              sassDir: 'sass',
              cssDir: 'css',
              config: 'config.rb'
            }
          }
        },
        jshint: {
            all: ['Gruntfile.js', 'js/*.js', 'test/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'compass']);
};