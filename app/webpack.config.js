const webpack = require('webpack');
var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		popup: './scripts/popup.js',
		background: './scripts/background.js'
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].min.js'
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
	},
	plugins: [
	new webpack.optimize.UglifyJsPlugin({
		parallel: false,
		compress: { warnings: false },
		output: { comments: false }
	})
	]
}