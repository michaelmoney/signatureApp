module.exports = function(grunt) {



    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //uglify: {
        //    build: {
        //        src: ["js/*.js", "js/lib/*.js"],
        //        dest: 'build/js/all.min.js'
        //    }
        //},
        //cssmin: {
        //    target: {
        //        files: [{
        //            expand: true,
        //            cwd: 'css',
        //            src: ['styles.css', '!*.min.css'],
        //            dest: 'build/css/',
        //            ext: '.min.css'
        //        }]
        //    }
        //},
        //concat_css: {
        //    options: {
        //        // Task-specific options go here.
        //    },
        //    all: {
        //        src: ["css/*.css"],
        //        dest: "build/css/all.css"
        //    }
        //},
        //pngmin: {
        //    compile: {
        //        options: {
        //            concurrency: 8,             // specify how many exucutables get spawned in parallel
        //            colors: 128,                // reduce colors to 128
        //            ext: '.png',                // use .png as extension for the optimized files
        //            quality: '55-70',           // output quality should be between 65 and 80 like jpeg quality
        //            speed: 10,                  // pngquant should be as fast as possible
        //            iebug: true                 // optimize image for use in Internet Explorer 6
        //        },
        //        files: [
        //            {
        //                src: 'img/*.png',
        //                dest: 'build/img'
        //            }
        //        ]
        //    }
        //},
        //imagemin: {
        //
        //    dynamic: {
        //        options: {
        //            optimizationLevel: 7,
        //            svgoPlugins: [{ removeViewBox: false }],
        //            progressive: true,
        //            use: [mozjpeg()]
        //        },
        //        files: [{
        //            expand: true,                  // Enable dynamic expansion
        //            cwd: 'img/',                   // Src matches are relative to this path
        //            src: ['*/*.jpg', '*.jpg'],   // Actual patterns to match
        //            dest: 'build/img/'                  // Destination path prefix
        //        }]
        //    }
        //},
        jslint: { // configure the task
            client: {
                src: [
                    'js/*.js'
                ],
                directives: {
                    browser: true,
                    predef: [
                        'jQuery'
                    ]
                },
                options: {
                    junit: 'out/client-junit.xml',
                    errorsOnly: true
                }
            }
        }
        //copy: {
        //    main: {
        //        files: [
        //            // includes files within path
        //            // includes files within path and its sub-directories
        //            {expand: true, src: ['fonts/**'], dest: 'build/'},
        //            {expand: true, src: ['portfolio/**'], dest: 'build/'},
        //            {expand: true, src: ['send/**'], dest: 'build/'},
        //            {expand: true, src: ['index.html'], dest: 'build/'},
        //            {expand: true, src: ['img/icons/**'], dest: 'build/'},
        //            {expand: true, src: ['files/*'], dest: 'build/'},
        //            {expand: true, src: ['css/*.css'], dest: 'build/'},
        //        ]
        //    }
        //},
        //processhtml: {
        //    build: {
        //        files: {
        //            'build/index.html': ['index.html']
        //        }
        //    }
        //}
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify'); // minimize and concat multiple JS files
    grunt.loadNpmTasks('grunt-contrib-cssmin'); // minimize CSS files
    grunt.loadNpmTasks('grunt-concat-css'); // concat multiple CSS files
    grunt.loadNpmTasks('grunt-contrib-imagemin'); // compress images
    grunt.loadNpmTasks('grunt-jslint'); // check JS syntax
    grunt.loadNpmTasks('grunt-contrib-copy'); // copy files between folders
    grunt.loadNpmTasks('grunt-processhtml'); //change paths in HTML files to support minimized files with different names
    grunt.loadNpmTasks('grunt-pngmin'); //compress png files

    // Main build task

    grunt.registerTask('default', ['jslint']);

};

