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

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);

const staticMiddleware = express.static('dist'); //uses the root of our web server ('webpack-4-setup')

server.use(staticMiddleware);

server.listen(5000, () => {
  console.log('Server is listening');
});
