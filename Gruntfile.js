module.exports = function(grunt) {
	var defaultTasks = ['concat'/*, 'uglify'*/]; // used for watch as well

	var files = [ 'src/UserScriptHeader.js', 'src/Header.js',
				'src/Loader.js', 'src/Schedular.js', 
				'src/EnhancedChat.js', 'src/Main.js', 'src/Footer.js' ];

	grunt.initConfig({
		concat: {
			all: {
				src: files,
				dest: 'pmd-roleplay-extended-chat.user.js',
			}
		},

		/*uglify: {
			all: {
				files: {
					'pmd-roleplay-extended-chat.min.user.js': ['pmd-roleplay-extended-chat.user.js']
				}
			}
		},*/

		watch: {
			all: {
				files: files,
				tasks: defaultTasks,
				options: {
					debounceDelay: 250
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', defaultTasks);
};