const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();
const session = require('express-session');

// data imports
const user = require('./user/user-model');

// router imports
const userRouter = require('./user/user-route');

// middleware imports

// Session Configuration
const sessionConfig = {
  name: 'sessioncookie',
  secret: 'this is a secret, sort of', // place this in .env
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false

  // store: {}
};

// Invoke Session
server.use(session(sessionConfig));

// server extensions
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

// apply server routes
server.use('/api', userRouter);

const port = 4000;

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
