/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dev: {
        files: {
          'public_html/style.css': 'source/style/corecss.scss',
          'public_html/editor.css': 'source/style/editor.scss'
        }
      },
      rel: {
        options: {
          sourcemap:'none',
          style: 'compressed'
        },
        files: {
          'release_html/style.css': 'source/style/corecss.scss'
        }
      },
      electron: {
        options: {
          sourcemap:'none',
          style: 'compressed'
        },
        files: {
          'desktop_release/electron/resources/app/style.css': 'source/style/corecss.scss'
        }
      },
      cordova: {
        options: {
          sourcemap:'none',
          style: 'compressed'
        },
        files: {
          'cordova/linx/www/style.css': 'source/style/corecss.scss'
        }
      },
      kong: {
        options: {
          sourcemap:'none',
          style: 'compressed'
        },
        files: {
          'kong/linx/style.css': 'source/style/corecss.scss'
        }
      }
    },
    watch: {
      css: {
        files: 'source/**/*.scss',
        tasks: ['sass:dev']
      },
      js: {
        files: ['source/**/*.js'],
        tasks: ['uglify:dev']
      },
      html: {
        files: ['source/**/*.html'],
        tasks: ['copy:htmldev']
      }
    },
    uglify: {
      dev: {
        options: {
          mangle: false,
          sourceMap: true,
          beautify: true
        },
        files: {
          'public_html/scripts.js': [
            'source/js/*.js'
          ]
        }
      },
      rel: {
        options: {
          mangle: false,
          sourceMap: false,
          compress: true,
          beautify: false
        },
        files: {
          'release_html/scripts.js': [
            'source/js/*.js'
          ]
        }
      },
      electron: {
        options: {
          mangle: false,
          sourceMap: false,
          compress: true,
          beautify: false
        },
        files: {
          'desktop_release/electron/resources/app/scripts.js': [
            'source/js/*.js'
          ]
        }
      },
      cordova: {
        options: {
          mangle: false,
          sourceMap: false,
          compress: true,
          beautify: true
        },
        files: {
          'cordova/linx/www/scripts.js': [
            'source/js/*.js'
          ]
        }
      },
      kong: {
        options: {
          mangle: false,
          sourceMap: false,
          compress: true,
          beautify: false
        },
        files: {
          'kong/linx/scripts.js': [
            'source/js/*.js',
            'source/kongregate/*.js'
          ]
        }
      }
    },
    copy: {
      htmldev: {
        files: [{
          expand: true,
          cwd: 'source/html',
          src: ['**'],
          dest: 'public_html/'
        },{
          expand: true,
          cwd: 'source/images',
          src: ['favicon.png'],
          dest: 'public_html/'
        },{
          expand: true,
          cwd: 'source/font',
          src: ['*'],
          dest: 'public_html/'
        }]
      },
      htmlrel: {
        files: [{
          expand: true,
          cwd: 'source/html',
          src: ['index.html'],
          dest: 'release_html/'
        },{
          expand: true,
          cwd: 'source/images',
          src: ['favicon.png'],
          dest: 'release_html/'
        },{
          expand: true,
          cwd: 'source/font',
          src: ['*'],
          dest: 'release_html/'
        }]
      },
      htmlelectron: {
        files: [{
          expand: true,
          cwd: 'source/html',
          src: ['index.html'],
          dest: 'desktop_release/electron/resources/app'
        },{
          expand: true,
          cwd: 'source/font',
          src: ['*'],
          dest: 'desktop_release/electron/resources/app'
        }]
      },
      supportelectron: {
        files: [{
          expand: true,
          cwd: 'source/electron_source',
          src: ['*.*'],
          dest: 'desktop_release/electron/resources/app'
        }]
      },
      htmlcordova: {
        files: [{
          expand: true,
          cwd: 'source/html',
          src: ['index.html'],
          dest: 'cordova/linx/www'
        },{
          expand: true,
          cwd: 'source/font',
          src: ['*'],
          dest: 'cordova/linx/www'
        }]
      },
      htmlkong: {
        files: [{
          expand: true,
          cwd: 'source/html',
          src: ['index.html'],
          dest: 'kong/linx'
        },{
          expand: true,
          cwd: 'source/font',
          src: ['*'],
          dest: 'kong/linx'
        }]
      }
    },
    compress: {
      makezip: {
        options: {
          archive: 'release.zip'
        },
        files: [{
            src: ['release_html/*'],
            dest: '/'
          } ]
      },
      kongzip: {
        options: {
          archive: 'kong/extra/kongextra.zip'
        },
        files: [{
            expand: true,
            cwd: 'kong/linx',
            src: ['*'],
            dest: '/'
          } ]
      }
    },
    open: {
      game: {
        path: 'http://localhost:8282',
        app: 'chrome'
      }
    },
    'http-server': {
      local: {
        root: 'public_html',
        host: '0.0.0.0',
        runInBackground: true
      },
      localhold: {
        root: 'public_html',
        port: 8282,
        host: '127.0.0.1',
        runInBackground: false
      }
    },
    exec: {
      electron: {
        cwd: "desktop_release/electron",
        cmd: "linx.exe"
      },
      cordovarel: {
        cwd: "cordova/linx",
        cmd: "cordova build --release"
      },
      cordovarun: {
        cwd: "cordova/linx",
        cmd: "cordova run --device"
      }
    },
    replace: {
      kong: {
        src: ['kong/linx/*.html'],
        overwrite: true,
        replacements: [{
          from: '<!--HEADERLOADTARGET-->',
          to: '<script src="https://cdn1.kongregate.com/javascripts/kongregate_api.js"></script>'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('develop', ['sass:dev', 'uglify:dev', 'copy:htmldev', 'http-server:local', 'open', 'watch']);
  grunt.registerTask('release', ['sass:rel', 'uglify:rel', 'copy:htmlrel','compress:makezip']);
  grunt.registerTask('electron', ['sass:electron', 'uglify:electron', 'copy:htmlelectron','copy:supportelectron','exec:electron']);
  grunt.registerTask('cordova-run', ['sass:cordova', 'uglify:cordova', 'copy:htmlcordova','exec:cordovarun']);
  grunt.registerTask('cordova-release', ['sass:cordova', 'uglify:cordova', 'copy:htmlcordova','exec:cordovarel']);
  grunt.registerTask('kongregate-release', ['sass:kong', 'uglify:kong', 'copy:htmlkong','replace:kong','compress:kongzip']);

};
