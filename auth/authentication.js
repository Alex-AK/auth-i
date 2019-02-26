const user = require('../user/user-model');
const bcrypt = require('bcryptjs');
const session = require('express-session');

module.exports = {
  authentication
};

function authentication(req, res, next) {
  // replace this function with a session verrification

  // req.session.user = user ??

  if (session) {
    next();
  } else {
    res.status(400).json({ message: 'Invalid credentials provided' });
  }

  let { username, password } = req.headers; // compare token to token when available

  if (username && password) {
    user
      .getBy(username)
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(err =>
        res.status(500).json({ message: 'Unexpected error, please try again.' })
      );
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
}
