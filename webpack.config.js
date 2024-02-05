const path = require('path');

module.exports = {
	mode: 'production',
	//mode: 'development',
	entry: './src/index.js',
	devtool: false,
	//devtool: 'inline-source-map',
	performance: {
		maxEntrypointSize: 1024000,
		maxAssetSize: 1024000
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'auxl.js',
	},
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },


};