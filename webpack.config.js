var path = require('path');

var devConfiguration = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
        {
          test: /\.jsx?$/,
          exclude: /(bower_components|node_modules)/,
          loader: ["babel-loader"], //["react-hot-loader", "babel-loader"]
        },
        {
          test: /\.css$/,
          exclude: /(bower_components|node_modules)/,
          use:[
            { loader: 'style-loader' }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: { name: 'assets/[name].[ext]' }
            }
          ]          
        },
      ],
  },
  plugins: [],
    // module end
  resolve: {
    extensions: ['.js', '.es6', '.jsx'],
  },
  devServer:{
    open: true,
    inline: true,
    https: false,
    contentBase: 'dist/',    
    disableHostCheck: true    
  }
};

module.exports = devConfiguration;
