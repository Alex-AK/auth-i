const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

const users = require('./user/user-model');
const { authentication } = require('./auth/authentication');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

// get users if authorized
server.get('/api/users', authentication, (req, res) => {
  users
    .get()
    .then(users => res.status(200).json({ users }))
    .catch(err => console.log(err));
});

const port = 4000;

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
