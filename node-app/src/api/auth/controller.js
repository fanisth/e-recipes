/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = require('../users/controller');
const config = require('../../config/config');

function generateToken(user) {
  return jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
}

async function login(req, res) {
  const { username, password } = req.body;

  const user = await userController.getUserByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = generateToken(user);
  return res.json({ token });
}

async function register(req, res) {
  const { username, password } = req.body;

  const existingUser = await userController.getUserByUsername(username);

  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const newUser = await userController.createUser(username, password);
  const token = generateToken(newUser);
  return res.json({ token });
}

module.exports = { login, register, generateToken };
