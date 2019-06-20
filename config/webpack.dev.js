const path = require('path');

module.exports = {
  entry: {
    main: ['./src/main.js']
  },
  mode: 'development',
  output: {
    filename: '[name]-bunde.js', //takes the entry main key
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/' //defines the path for static recources (for example the js file in index html src path)
  },
  devServer: {
    contentBase: 'dist', //everything will be served from dist folder
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        //these loaders are passed in a reverse oreder, after the css loader is linted, the style-loader handles
        //passing it into the style tag
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].html' } }, //tells webpack the name of .html file
          { loader: 'extract-loader' }, //tells webpack to make a separate file and passes it to the file-loader
          { loader: 'html-loader', options: { attrs: ['img:src'] } } //does the linting and passes it to the extract-loader
        ]
      },
      {
        test: /\.(jpeg|jpg|gif|png)$/,
        use: [
          { loader: 'file-loader', options: { name: 'images/[name].[ext]' } }
        ]
      }
    ]
  }
};
