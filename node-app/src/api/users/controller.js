const repository = require('./repository');

async function createUser(username, password) {
  return repository.createUser(username, password);
}

async function getUserByUsername(username) {
  return repository.getUserByUsername(username);
}

module.exports = { createUser, getUserByUsername };
