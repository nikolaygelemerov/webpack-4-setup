import express from 'express';
import path from 'path';

const server = express();

const PORT = process.env.PORT || 8080;

const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  const webpack = require('webpack');
  const config = require(path.join(__dirname, '../../config/webpack.dev'));
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
}

const staticMiddleware = express.static('dist'); //uses the root of our web server ('webpack-4-setup')

//serve static content
server.use(staticMiddleware);

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
