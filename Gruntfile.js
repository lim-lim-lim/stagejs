module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        esversion:6
      }
    },
    concat:{
        options:{
            separatir:';'
        },
        all:{
            src:[
                    'src/index.js',
                    'src/event/*.js',
                    'src/geom/*.js',
                    'src/display/display.js',
                    'src/display/display-container.js',
                    'src/display/stage.js',
                    'src/display/graphics.js',
                    'src/display/shape.js'
                ],
            dest:'dist/stage.js'
        }
    },

    karma: {
        options: {
            files: [ 'dist/stage.js', 'test/spec/*.js' ],
            frameworks: ['jasmine'],
            browsers: ['Chrome'],
            port: 9876,
        },
        unit: {
            singleRun: true
        }
    },
    watch: {
        build:{
            files: ['src/**/*.js'],
            tasks: ['concat:all']
        },
        test:{
            files: ['test/spec/*.js'],
            tasks: ['karma:unit']
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', [ 'concat:all' ]);
  grunt.registerTask('build-w', [ 'watch:build' ]);
  grunt.registerTask('test', [ 'karma:unit' ]);
  grunt.registerTask('test-w', [ 'watch:test' ]);
};
