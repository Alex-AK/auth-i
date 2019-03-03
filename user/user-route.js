// package imports
const express = require('express');
const bcrypt = require('bcryptjs');

// router extensions
const router = express.Router();

// data imports
const users = require('../user/user-model');

// User Routes
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
      res.status(201).json({ message: 'Registration complete' });
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
        // add session
        req.session.user = user;
        res.status(200).json({
          message: `Welcome ${user.username}!, you have a cookie.`
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => console.log(err));
});

router.get('/logout', (req, res) => {
  console.log(req);
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.res(500).json({ message: 'Logout error occurred' });
      } else {
        res.json({ message: 'Logout successful' });
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
