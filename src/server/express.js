import express from 'express';
import path from 'path';
import webpack from 'webpack';

const server = express();
const config = require('../../config/webpack.dev');
const compiler = webpack(config);

const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
);

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

//enable devServer middleware
server.use(webpackDevMiddleware);

//enable hot reloading
server.use(webpackHotMiddleware);

const staticMiddleware = express.static('dist'); //uses the root of our web server ('webpack-4-setup')

//serve static content
server.use(staticMiddleware);

server.listen(5000, () => {
  console.log('Server is listening');
});
