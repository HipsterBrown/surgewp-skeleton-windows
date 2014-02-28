'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'content/themes/surgewp-starter/assets/js/*.js',
        'content/themes/surgewp-starter/!assets/js/scripts.min.js'
      ]
    },
    sass: {
      dist: {
        files: {
          'content/themes/surgewp-starter/assets/css/main.min.css': [
            'content/themes/surgewp-starter/assets/sass/app.scss'
          ]
        },
        options: {
          style: 'compressed',
          // Sass source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourcemap: false,
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'content/themes/surgewp-starter/assets/js/scripts.min.js': [
            'content/themes/surgewp-starter/assets/js/plugins/bootstrap/transition.js',
            'content/themes/surgewp-starter/assets/js/plugins/bootstrap/alert.js',
            'content/themes/surgewp-starter/assets/js/plugins/bootstrap/button.js',
            'content/themes/surgewp-starter/assets/js/plugins/bootstrap/carousel.js',
            'content/themes/surgewp-starter/assets/js/plugins/bootstrap/collapse.js',
            'content/themes/surgewp-starter/assets/js/plugins/bootstrap/dropdown.js',
            'content/themes/surgewp-starter/assets/js/plugins/bootstrap/modal.js',
            'content/themes/surgewp-starter/assets/js/plugins/bootstrap/tooltip.js',
            'content/themes/surgewp-starter/assets/js/plugins/bootstrap/popover.js',
            'content/themes/surgewp-starter/assets/js/plugins/bootstrap/scrollspy.js',
            'content/themes/surgewp-starter/assets/js/plugins/bootstrap/tab.js',
            'content/themes/surgewp-starter/assets/js/plugins/bootstrap/affix.js',
            'content/themes/surgewp-starter/assets/js/plugins/*.js',
            'content/themes/surgewp-starter/assets/js/_*.js'
          ]
        },
        options: {
          // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
          // sourceMap: 'assets/js/scripts.min.js.map',
          // sourceMappingURL: '/app/themes/surgewp-starter/assets/js/scripts.min.js.map'
        }
      }
    },
    version: {
      options: {
        file: 'content/themes/surgewp-starter/lib/scripts.php',
        css: 'content/themes/surgewp-starter/assets/css/main.min.css',
        cssHandle: 'surgewp-starter_main',
        js: 'content/themes/surgewp-starter/assets/js/scripts.min.js',
        jsHandle: 'content/themes/surgewp-starter/surgewp-starter_scripts'
      }
    },
    watch: {
      sass: {
        files: [
          'content/themes/surgewp-starter/assets/sass/*.scss'
        ],
        tasks: ['sass', 'version']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify', 'version']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'content/themes/surgewp-starter/assets/css/main.min.css',
          'content/themes/surgewp-starter/assets/js/scripts.min.js',
          'content/themes/surgewp-starter/templates/*.php',
          'content/themes/surgewp-starter/*.php'
        ]
      }
    },
    clean: {
      dist: [
        'content/themes/surgewp-starter/assets/css/main.min.css',
        'content/themes/surgewp-starter/assets/js/scripts.min.js'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-wp-version');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'sass',
    'uglify',
    'version'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};
