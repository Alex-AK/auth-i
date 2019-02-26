module.exports = {
  authentication
};

function authentication(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).json({ message: 'Invalid credentials provided' });
  }
}
