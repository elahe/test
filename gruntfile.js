"use strict";
module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		path: {
			'raw': 'dev',
			'out': 'dist'
		},



		/*
		*** Styles ***
		*/
		sass:{
			options: {
				sourceMap : true,
				sourceComments: false,
				outputStyle: 'compressed'
			},
			files: {
				expand : true,
				cwd    : '<%= path.raw %>/sass/',
				src    : ['*.scss'],
				dest   : '<%= path.out %>/css/',
				ext    : '.css'
			}
		},

		autoprefixer:{
			options: {
				browsers: ['last 6 versions', 'ie 8']
			},
			target: {
				files: [{
					expand  : true,
					flatten : true,
					cwd     : '<%= path.out %>/css/',
					src     : '**/*.css',
					dest    : '<%= path.out %>/css/',
					ext     : '.css'
				}]
			}
		},



		/*
		*** HTML ***
		*/
		jade: {
			compile: {
				options: {
					pretty : false,
                    data: function(dest, src) {
                        console.log(dest, src);
                        return grunt.file.readJSON('dev/data/data.json');
                    }
				},
				files: [{
					expand : true,
					cwd    : '<%= path.raw %>/jade/',
					src    : '*.jade',
					dest   : './',
					ext    : '.html'
				}]
			}
		},
		prettify: {
			options: {
				indent: 4,
				indent_char: ' ',
				preserveBOM: true,
				condense: true,
				indent_inner_html: true,
				wrap_line_length: 130,
				preserve_newlines: true,
				brace_style: 'collapse',
				unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
			},
			all: {
				expand: true,
				cwd: './',
				ext: '.html',
				src: ['*.html'],
				dest: './'
			},
		},



		/*
		*** Scripts ***
		*/
		babel: {
			options: {
				sourceMap: true,
				presets: ['es2015']
			},
			dist: {
				// files: {
				// 	'<%= path.raw %>/js/app.js': ['<%= path.raw %>/js/babel/*.js']
				// }
				files: [{
					expand : true,
					cwd    : '<%= path.raw %>/js/babel/',
					src    : '*.js',
					dest   : '<%= path.raw %>/js/modules/',
					ext    : '.js'
				}],
			}
		},
		uglify: {
			scripts: {
				options: {
					sourceMap     : true,
					sourceMapName : '<%= path.out %>/js/sourcemap/main.map',
				},
				// files: {
				// 	'<%= path.out %>/js/main.js': ['<%= path.raw %>/js/*.js', '!<%= path.raw %>/js/jquery*.js']
				//
				// }
				files: [{
					expand : true,
					cwd    : '<%= path.raw %>/js/',
					src    : ['modules/*.js', '*.js'],
					dest   : '<%= path.out %>/js/',
					ext    : '.js'
				}]
			}
		},
		jshint: {
			options: {
				curly: true,
				"esnext": true,
				indent: 4,
				reporter: require('jshint-stylish')
			},
			src: ['<%= path.raw %>/js/babel/*.js']
		},


		/*
		*** Images ***
		*/
		imagemin:{
			minimize: {
				options: {
					optimizationLevel : 3,
					svgoPlugins       : [{ removeViewBox: false } , { removeEmptyAttrs: true }, { removeTitle: true }, { cleanupAttrs: true }],
				},
				files: [{
					expand : true,
					cwd    : '<%= path.raw %>/img/',
					src    : ['**/*.{png,jpg,gif,svg,jpeg}'],
					dest   : '<%= path.out %>/img/'
				}]
			}
		},



		/*
		*** Syncing Browser ***
		*/
		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'<%= path.out %>/css/*.css',
						'<%= path.out %>/js/*.css',
						'<%= path.out %>/img/*.{png,jpg,gif,svg}',
						'*.html'
					]
				},
				options: {
					server : './',
					notify : false,
					port   : 1092
				}
			}
		},



		/*
		*** Watch ***
		*/
		watch:{
			styles:{
				files: ['<%= path.raw %>/sass/**/*.scss'],
				tasks: ['sass', 'autoprefixer'],
			},
			scripts:{
				files: ['<%= path.raw %>/js/**/*.js'],
				tasks: ['babel', 'uglify', 'jshint']
			},
			contents:{
				files: [
					'<%= path.raw %>/data/**/*.json',
					'<%= path.raw %>/jade/**/*.jade'
				],
				tasks: ['jade', 'prettify']
			},
			// images:{
			// 	files: [
			// 		'<%= path.raw %>/img/**/*.{png,jpg,gif}',
			// 		'<%= path.raw %>/img/**/*.svg',
			//
			// 	],
			// 	tasks: ['imagemin']
			// },
			options: {
				spawn: false,
				livereload: true
			},
			livereload: {
				files: [
					'*.html',
					'<%= path.out %>/css/**/*.css',
					'<%= path.out %>/js/**/*.js'
				]
			},
		}
	});



	/*
	*** Load Grunt Packages ***
	*/
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-prettify');
	grunt.loadNpmTasks('grunt-babel');

	/*
	*** Register Grunt Tasks ***
	*/
	grunt.registerTask('default', [
		'sass',
		'autoprefixer',
		'jade',
		'prettify',
		'babel',
		'uglify',
		'jshint',
		'watch'
	]);

	grunt.registerTask('browser', ['browserSync']);
}
