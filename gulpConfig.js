var fs = require("fs");
module.exports = {
	jade: {
		src: ['./src/**/*.jade','!./src/bower_components/**'],
		dst: './src/'
	},

	less: {
		src: ['./src/less/**/*.less','!./src/less/**/_*.less'],
		dst: './www/css/'
	},

	autoprefixer: {
		options: {browsers: ['last 3 version','ie >= 9']}
	}
}
