module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            serve: {
                src: 'serve',
                force: true
            },
            dist: {
                src: 'dist',
                force: true
            },
            sass: {
                src: ['dist/css/styles.css','dist/css/styles.css.map'],
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
             dist: {
              files: [
                  {
                    expand: true,
                    cwd: 'static',
                    src: ['css/*.scss'],
                    dest: 'dist',
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
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "static",
                        src: ['img/**', 'fonts/**','*.html', 'js/bootstrap.min.js'],
                        dest: 'dist'
                    }
                ]
            },
            markup: {
                files: [
                    {
                        expand: true,
                        cwd: "static/includes",
                        src: ['**'],
                        dest: 'dist'
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
             dist: {
                cwd: 'static',
                src: [ '*.html' ],
                dest: 'dist/',
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
                dest: 'dist/js/main.min.js'
            },
            css: {
                src: [['static/css/bootstrap.css', 'dist/css/styles.css']], //*** change this to include all your css files
                dest: 'dist/css/main.min.css'
            }
        },
        jshint: {
            beforeconcat: [['static/js/main.js']],
            afterconcat: ['dist/js/main.min.js']
        },
        uglify: {
            options: {
                mangle: false
            },
            jsmin: {
                files: {
                    'dist/js/main.min.js':  ['dist/js/main.min.js']
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    'dist/css/main.min.css': ['dist/css/main.min.css']
                }
            }
        },
        'string-replace': {
            jsfiles: {
                files: {
                    'dist/index.html': 'dist/index.html'
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
                    'dist/index.html': 'dist/index.html'
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

    grunt.registerTask('make', ['clean:serve','sass:serve', 'copy:serve','includes:serve','string-replace:sassfiles']);
    grunt.registerTask('serve', ['clean:serve','sass:serve','copy:serve','includes:serve','jshint:beforeconcat','string-replace:sassfiles','connect','watch']);

    grunt.registerTask('dist', ['clean:dist','sass:dist','copy:dist','jshint:beforeconcat', 'concat:js','uglify:jsmin','concat:css','cssmin:compress','includes:dist','string-replace:jsfiles','string-replace:cssfiles', 'clean:sass']);
};


























