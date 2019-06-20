const path = require('path');

module.exports = {
  entry: {
    //If included 'babel-polyfill' runs before 'main.js'
    //preferable to inlcude babel-preset
    //to prevent building a huge bundle with 'babel-polyfill'
    main: ['./src/main.js']
  },
  mode: 'development',
  output: {
    filename: '[name]-bunde.js', //Tells webpack to take the 'main' 'entry' prop name
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/' //Defines the path for static recources (for example the js file in 'index.html' src path)
  },
  devServer: {
    contentBase: 'dist', //Tells webpack to serve everything from 'dist' folder
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        //Loaders are passed in a reverse oreder, after the 'css-loader' is linted, the 'style-loader' handles
        //passing it into the style tag
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] //Tells webpack to do the linting and passes it to the 'style-loader'
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].html' } }, //Tells webpack the name of .html file
          { loader: 'extract-loader' }, //Tells webpack to make a separate file and passes it to the 'file-loader'
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
  }
};
