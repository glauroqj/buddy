const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		popup: './scripts/popup.js',
		background: './scripts/background.js',
		components: [
		'./scripts/components/score-component.js'
		]
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
		],
	},
	plugins: [		
	new webpack.optimize.UglifyJsPlugin({		
		parallel: true,
		mangle: false,	
		compress: { warnings: false },		
		output: { comments: false }		
	}),
	new HtmlWebpackPlugin({
		filename: 'popup.html',
		template: './pages/popup.html',
		minify: {
			collapseWhitespace: true,
			removeComments: true,
			removeRedundantAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		}
	})	
	]
};