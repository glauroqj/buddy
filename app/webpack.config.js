const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: {
		filename: './scripts/popup.js',
		filename: './scripts/background.js'
	},
	output: {
		filename: './dist/popup.min.js',
		filename: './dist/background.min.js'
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