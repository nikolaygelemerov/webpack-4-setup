import express from 'express';
import path from 'path';

const server = express();

const staticMiddleware = express.static('dist'); //uses the root of our web server ('webpack-4-setup')

server.use(staticMiddleware);

server.listen(5000, () => {
  console.log('Server is listening');
});
