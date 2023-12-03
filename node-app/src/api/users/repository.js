/* eslint-disable no-underscore-dangle */
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

async function getUserById(id) {
  const user = await User.findOne({ _id: id }).lean();
  return user;
}

async function getUserByUsername(username) {
  const collection = mongoController.getCollectionController(collectionName)();
  const user = await collection.findOne({ username });
  return user;
}

async function getCountByCriteria(criteria) {
  const users = await User.find(criteria);
  return users.length;
}

async function saveUser(userRequest) {
  try {
    const user = await User.updateOne({ _id: userRequest._id }, { ...userRequest });
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getCountByCriteria,
  getUserById,
  saveUser,
};
