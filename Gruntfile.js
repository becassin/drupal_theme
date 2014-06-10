

module.exports = function(grunt) {
    'use strict';
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
                tasks: ['compass:dev'],
                options: {
                    spawn: false,
                }
            },
            images: {
                files: ['images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        },
        compass: {                  // Task
          dev: {                    // Another target
            options: {              // Target options
              environment: 'development',
              noLineComments: true,
              sourcemap: true,
              cssDir: 'css/compiled',
              sassDir: 'sass',
              imagesDir: 'images',
              javascriptsDir: 'js',
              outputStyle: 'expanded',
              relativeAssets: true
            }
          },
          dist: {
            options: {              // Target options
              environment: 'production',
              noLineComments: true,
              sourcemap: false,
              cssDir: 'css/compiled',
              sassDir: 'sass',
              imagesDir: 'images',
              javascriptsDir: 'js',
              outputStyle: 'compressed',
              relativeAssets: true,
              force: true
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'compass']);
};