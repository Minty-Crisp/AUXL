const path = require('path');

module.exports = {
	mode: 'production',
	//mode: 'development',
	entry: './src/index.js',
	devtool: false,
	//devtool: 'inline-source-map',
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'auxl.js',
	},
};