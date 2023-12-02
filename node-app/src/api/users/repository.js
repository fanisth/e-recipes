/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const User = require('../../models/userSchema');
const mongoController = require('../../services/db/mongoController');

const collectionName = 'users';

async function createUser(userRequest) {
  try {
    const hashedPassword = await bcrypt.hash(userRequest.password, 10);

    const user = new User({
      ...userRequest,
      password: hashedPassword,
    });

    const createdUser = await user.save();
    return createdUser;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getUserByUsername(username) {
  const collection = mongoController.getCollectionController(collectionName)();
  const user = await collection.findOne({ username });
  return user;
}

module.exports = { createUser, getUserByUsername };
