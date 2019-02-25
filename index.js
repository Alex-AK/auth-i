const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

const port = 4000;

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
