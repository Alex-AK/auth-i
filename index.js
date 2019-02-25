const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();
const bcrypt = require('bcryptjs');

const user = require('./data/helpers/001-user');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.post('/api/register', (req, res) => {
  const newUser = req.body;
  let { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 16);
  newUser.password = hash;

  if (!username || !password) {
    res.status(500).json({ message: 'Missing username or password.' });
  }

  user
    .add(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => console.log(err));
});

server.post('/api/login', (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(500).json({ message: 'Missing username or password.' });
  }

  user
    .getBy(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => console.log(err));
});

// get users if authorized
server.get('/api/users', (req, res) => {
  user
    .get()
    .then(users => res.status(200).json({ users }))
    .catch(err => console.log(err));
});

const port = 4000;

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
