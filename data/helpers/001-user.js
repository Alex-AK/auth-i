const db = require('../dbConfig');

module.exports = {
  add,
  get,
  getBy
};

function get() {
  return db('user');
}

function getBy(username) {
  return db('user as u')
    .where({ username })
    .first();
}

function add(newUser) {
  return db('user')
    .insert(newUser)
    .then(ids => getBy(ids[0]));
}
