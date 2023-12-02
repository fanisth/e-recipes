/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRepo = require('../users/repository');
const userController = require('../users/controller');
const config = require('../../config/config');
const logger = require('../../common/logger')();
const errors = require('./errors');

function generateToken(user) {
  return jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
}

async function login(body) {
  const fLogger = logger.child({ function: 'login' });
  try {
    const { username, password } = body;

    const user = await userController.getUserByUsername(username);
    if (!user) {
      return { error: errors.USER_FINDONE_BY_USERNAME };
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return { error: errors.USER_WRONG_PASSWORD };
    }

    const token = generateToken(user);
    return ({ data: token });
  } catch (error) {
    fLogger.warn('Unmapped error at user login', { error });
    return { error: errors.COULD_NOT_LOGIN_USER };
  }
}

async function register(body) {
  const fLogger = logger.child({ function: 'register' });
  try {
    const {
      username,
      email,
      phone,
    } = body;

    // Check for existing credentials
    const existingUsernames = await userRepo.getCountByCriteria({ username });
    if (existingUsernames) {
      return { error: errors.REGISTRATION_USERNAME_ALREADY_EXISTS };
    }
    const existingEmails = await userRepo.getCountByCriteria({ email });
    if (existingEmails) {
      return { error: errors.REGISTRATION_EMAIL_ALREADY_EXISTS };
    }
    const existingPhones = await userRepo.getCountByCriteria({ phone });
    if (existingPhones) {
      return { error: errors.REGISTRATION_MOBILE_ALREADY_EXISTS };
    }

    const newUser = await userController.createUser(body);
    if (!newUser) return { error: errors.COULD_NOT_REGISTER_USER };

    const token = generateToken(newUser);
    return ({ data: token });
  } catch (error) {
    fLogger.warn('Unmapped error at user login', { error });
    return { error: errors.COULD_NOT_REGISTER_USER };
  }
}

module.exports = { login, register, generateToken };
