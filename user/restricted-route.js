// package imports
const express = require('express');

// router extensions
const router = express.Router();

// data imports
const users = require('./user-model');

// Restricted Route
// incoming /api
router.get('/users', (req, res) => {
  users
    .get()
    .then(users => res.status(200).json({ users }))
    .catch(err => console.log(err));
});

module.exports = router;
