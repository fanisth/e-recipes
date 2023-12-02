const bcrypt = require('bcrypt');
const mongoController = require('../../services/db/mongoController');

const collectionName = 'users';

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    username,
    password: hashedPassword,
  };

  const collection = mongoController.getCollectionController(collectionName)();
  const result = await collection.insertOne(user);

  return result.ops[0];
}

async function getUserByUsername(username) {
  const collection = mongoController.getCollectionController(collectionName)();
  const user = await collection.findOne({ username });
  return user;
}

module.exports = { createUser, getUserByUsername };
