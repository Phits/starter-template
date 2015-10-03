module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            serve: {
                src: 'serve',
                force: true
            },
            build: {
                src: 'build',
                force: true
            },
            sass: {
                src: ['build/css/styles.css','build/css/styles.css.map'],
                force: true
            },
        },
        sass: {
            serve: {
              files: [
                  {
                    expand: true,
                    cwd: 'static',
                    src: ['css/*.scss'],
                    dest: 'serve',
                    ext: '.css'
                  }
              ]
            },
             build: {
              files: [
                  {
                    expand: true,
                    cwd: 'static',
                    src: ['css/*.scss'],
                    dest: 'build',
                    ext: '.css'
                  }
              ]
            }
        },
        //Copy static files
        copy: {
            serve: {
                files: [
                    {
                        expand: true,
                        cwd: "static",
                        src: ['img/**', 'fonts/**', 'js/**', 'css/bootstrap.css'],
                        dest: 'serve'
                    }
                ]
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "static",
                        src: ['img/**', 'fonts/**','*.html', 'js/bootstrap.min.js'],
                        dest: 'build'
                    }
                ]
            },
            markup: {
                files: [
                    {
                        expand: true,
                        cwd: "static/includes",
                        src: ['**'],
                        dest: 'build'
                    }
                ]
            }
        },
        includes: {
            serve: {
                cwd: 'static',
                src: [ '*.html' ],
                dest: 'serve/',
                options: {
                    flatten: true
                }
            },
             build: {
                cwd: 'static',
                src: [ '*.html' ],
                dest: 'build/',
                options: {
                    flatten: true
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '192.168.0.8',
                livereload: 35731
            },
            livereload: {
                options: {
                    open: true,
                        base: [
                            'serve/'
                        ]
                }
            }
        },
        watch: {
            options: {
                livereload: 35731
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: ['static/**/*.*'],
                tasks: ['make']
            }
        },
        concat: {
            js: {
                src: [['static/js/jquery.history.js', 'static/js/main.js', 'js/ie10-viewport-bug-workaround.js']],  //*** change this to include all your js files
                dest: 'build/js/main.min.js'
            },
            css: {
                src: [['static/css/bootstrap.css', 'build/css/styles.css']], //*** change this to include all your css files
                dest: 'build/css/main.min.css'
            }
        },
        jshint: {
            beforeconcat: [['static/js/main.js']],
            afterconcat: ['build/js/main.min.js']
        },
        uglify: {
            options: {
                mangle: false
            },
            jsmin: {
                files: {
                    'build/js/main.min.js':  ['build/js/main.min.js']
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    'build/css/main.min.css': ['build/css/main.min.css']
                }
            }
        },
        'string-replace': {
            jsfiles: {
                files: {
                    'build/index.html': 'build/index.html'
                },
                options: {
                    replacements: [
                         {
                            pattern: '<script src="js/ie10-viewport-bug-workaround.js"></script>',
                            replacement: ''
                        },
                        {
                            pattern: '<script src="js/jquery.history.js"></script>',
                            replacement: ''
                        },
                        {
                            pattern: 'src="js/main.js"',
                            replacement: 'src="js/main.min.js"'
                        }
                    ]
                }
            },
            cssfiles: {
                files: {
                    'build/index.html': 'build/index.html'
                },
                options: {
                    replacements: [
                         {
                            pattern: '<link href="css/bootstrap.css" rel="stylesheet" media="screen">',
                            replacement: ''
                        },
                         {
                            pattern: 'href="css/main.css"',
                            replacement: 'href="css/main.min.css"'
                        }
                    ]
                }
            },
            sassfiles: {
                files: {
                    'serve/index.html': 'serve/index.html'
                },
                options: {
                    replacements: [
                         {
                            pattern: 'href="css/main.css"',
                            replacement: 'href="css/styles.css"'
                        }
                    ]
                }
            }
        }
    });



    // Load NpmTasks
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // REGISTER GRUNT TASKS
    // Default task(s).
    grunt.registerTask('default', ['serve']);

    grunt.registerTask('serve', ['clean:serve','sass:serve','copy:serve','includes:serve','jshint:beforeconcat','string-replace:sassfiles','connect','watch']);

    grunt.registerTask('build', ['clean:build','sass:build','copy:build','jshint:beforeconcat', 'concat:js','uglify:jsmin','concat:css','cssmin:compress','includes:build','string-replace:jsfiles','string-replace:cssfiles', 'clean:sass']);
};


























