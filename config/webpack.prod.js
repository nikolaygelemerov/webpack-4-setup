const path = require('path');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    //If included 'babel-polyfill' runs before 'main.js'
    //preferable to inlcude babel-preset
    //to prevent building a huge bundle with 'babel-polyfill'
    main: ['./src/main.js']
  },
  mode: 'production',
  output: {
    filename: '[name]-bunde.js', //Tells webpack to take the 'main' 'entry' prop name
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/' //Defines the path for static recources (for example the js file in 'index.html' src path)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader' }], //Tels webpack to parse js files with babel
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        //Loaders are passed in a reverse oreder, after the 'css-loader' is linted, the 'style-loader' handles
        //passing it into the style tag
        use: [
          { loader: MiniCSSExtractPlugin.loader }, //Tells webpack to use the extract plugin(to generate separate css file) instead of style-loader
          { loader: 'css-loader' } //Tells webpack to do the linting and passes it to the 'style-loader'
        ]
      },
      {
        test: /\.(html|ejs)$/,
        use: [
          //This work is now done by HTMLWebpackPlugin
          // { loader: 'file-loader', options: { name: '[name].html' } }, //Tells webpack the name of .html file
          // { loader: 'extract-loader' }, //Tells webpack to make a separate file and passes it to the 'file-loader'
          { loader: 'html-loader', options: { attrs: ['img:src'] } } //Tells webpack to do the linting and passes it to the 'extract-loader'
        ]
      },
      {
        test: /\.(jpeg|jpg|gif|png)$/,
        use: [
          { loader: 'file-loader', options: { name: 'images/[name].[ext]' } } //Tells webpack to parse the files with the extentions above (from current directory of index.html searches for folder images)
        ]
      }
    ]
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new MiniCSSExtractPlugin({ filename: '[name]-[contenthash].css' }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.ejs'),
      inject: true,
      title: 'Franklin'
    }) //Tells webpack to parse specific html file
  ],

  //https://github.com/webpack-contrib/css-loader/issues/447
  node: {
    fs: 'empty'
  }
};
