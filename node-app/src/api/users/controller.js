const repository = require('./repository');

async function createUser(userRequest) {
  const createdUser = await repository.createUser(userRequest);
  return createdUser;
}

async function getUserByUsername(username) {
  return repository.getUserByUsername(username);
}

module.exports = { createUser, getUserByUsername };
