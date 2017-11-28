const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		popup: './scripts/popup.js',
		background: './scripts/background.js'
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].min.js'
	},
	watch: true,
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