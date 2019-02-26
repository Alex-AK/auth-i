const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const users = require('../user/user-model');
const { authentication } = require('../auth/authentication');

// incoming /api

router.post('/register', (req, res) => {
  const newUser = req.body;
  let { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 16);
  newUser.password = hash;

  if (!username || !password) {
    res.status(500).json({ message: 'Missing username or password.' });
  }

  users
    .add(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => console.log(err));
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(500).json({ message: 'Missing username or password.' });
  }

  users
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
router.get('/api/users', authentication, (req, res) => {
  users
    .get()
    .then(users => res.status(200).json({ users }))
    .catch(err => console.log(err));
});

module.exports = router;
