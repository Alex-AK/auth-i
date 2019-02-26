const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

// data imports
const user = require('./user/user-model');

// router imports
const userRouter = require('./user/user-route');

// middleware imports
const { authentication } = require('./auth/authentication');

// server extensions
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

// apply server routes
server.use('/api', userRouter);

// get users if authorized
server.get('/api/users', authentication, (req, res) => {
  user
    .get()
    .then(users => res.status(200).json({ users }))
    .catch(err => console.log(err));
});

const port = 4000;

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
