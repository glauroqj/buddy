const webpack = require('webpack');

module.exports = {
	entry: {
		filename: './scripts/popup.js'
	},
	output: {
		filename: './dist/popup.min.js'
	},
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: 'babel-loader',
			query: {
				presets: [
				['es2015', {modules:false}]
				]
			}
		}
		]
	}
}