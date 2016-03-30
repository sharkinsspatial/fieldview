module.exports = function(grunt) {
    var files = {'dist/main.js': ['src/*.js', 'src/**/*.js',
        '!src/**/*-test.js']};
    grunt.initConfig({
        watch: {
            react: {
                files: ['src/*.js', 'src/**/*.js'],
                tasks: ['dev']
            }
        },
        browserify: {
            options: {
                //Stage 0 necessary for ES7 property initializers for 'this'
                //autobinding on React ES6 classes.
                transform: [['babelify', {'stage': 0}]]
            },
            dev: {
                files: files,
                options: {
                    browserifyOptions: {
                        debug: true,
                        fullPaths: true
                    }
                }
            },
            dist: {
                files: files,
                options: {
                    browserifyOptions: {
                        debug: false
                    }
                }
            }
        },
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            dist: {
                NODE_ENV: 'production'
            }
        },
        mapbox: grunt.file.readJSON('/Users/Sharkins/Documents/Mapbox/FieldView.json'),
        replace: {
            dist: {
                options: {
                    patterns: [{ match: 'apiUrl', replacement:
                        'http://fieldviewapi.herokuapp.com/'},
                    { match: 'mapboxKey', replacement: '<%= mapbox.key %>'}],
                    usePrefix: false
                },
                files: [
                    {expand: true, flatten: true, src: ['dist/main.js'],
                        dest: 'dist/'}
                ]
            },
            dev: {
                options: {
                    patterns: [{match: 'apiUrl', replacement:
                        'http://localhost:3000/'},
                    { match: 'mapboxKey', replacement: '<%= mapbox.key %>'}],
                    usePrefix: false
                },
                files: [
                    {expand: true, flatten: true, src: ['dist/main.js'],
                        dest: 'dist/'}
                ]
            }
        },
        aws: grunt.file.readJSON('/Users/Sharkins/Documents/AWS/grunt-aws.json'),
        s3: {
            options: {
                accessKeyId: '<%= aws.key %>',
                secretAccessKey: '<%= aws.secret %>',
                bucket: 'fieldviewer',
                region: 'us-west-2',
                access: 'public-read',
                header: {
                    // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                    CacheControl: "max-age=630720000, public",
                    Expires: new Date(Date.now() + 63072000000).toISOString()
                },
                overwrite: true,
                cache: false
            },
            dist: {
                files: [
                {
                    src: 'index.html'
                },
                {
                    src: 'dist/**'
                },
                {
                    src: 'css/**'
                },
                {
                    src: 'node_modules/mapbox-gl/dist/mapbox-gl.css'
                },
                {
                    src: 'node_modules/babel-polyfill/dist/polyfill.min.js'
                },
                {
                    src: 'node_modules/mapbox-gl-compare/dist/mapbox-gl-compare.css'
                }
                ]
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/main.js': ['dist/main.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-aws');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dev', ['env:dev', 'browserify:dev', 'replace:dev']);
    grunt.registerTask('dist', ['env:dist', 'browserify:dist', 'replace:dist',
        'uglify:dist', 's3:dist', 'dev'])
};
