var path = require('path');
var ManifestPlugin = require('pwa-manifest-webpack-plugin');

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
            { loader: 'style-loader' },
            { 
              loader: 'css-loader', 
              options: { 
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64:5]',
              }
            }
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
  plugins: [
    new ManifestPlugin({
      name: "Camera DEMO H5",
      short_name: "Camera H5",
        icon: {
          src: path.resolve('src/images/icons/icon-512x512.png'),
          sizes: [512, 192]
      },
      start_url: "index.html",
      display: "standalone",
      background_color: "#3E4EB8",
      theme_color: "#2F3BA2"
    })
  ],
    // module end
  resolve: {
    extensions: ['.js', '.es6', '.jsx'],
  },
  devServer:{
    //host:"0.0.0.0",
    open: true,
    inline: true,
    https: false,
    contentBase: 'dist/',    
    disableHostCheck: true    
  }
};

module.exports = devConfiguration;
