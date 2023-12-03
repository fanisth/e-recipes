const repository = require('./repository');
const logger = require('../../common/logger')();
const errors = require('./errors');

async function createUser(userRequest) {
  const createdUser = await repository.createUser(userRequest);
  return createdUser;
}

async function updateUser(userRequest, userId) {
  const fLogger = logger.child({ function: 'register' });
  try {
    const {
      email,
      phone,
    } = userRequest;

    // Check for existing credentials
    const existingEmails = await repository.getCountByCriteria({
      email,
      _id: { $ne: userId },
    });
    if (existingEmails) {
      return { error: errors.REGISTRATION_EMAIL_ALREADY_EXISTS };
    }
    const existingPhones = await repository.getCountByCriteria({
      phone,
      _id: { $ne: userId },
    });
    if (existingPhones) {
      return { error: errors.REGISTRATION_MOBILE_ALREADY_EXISTS };
    }

    const userInDB = await repository.getUserById(userId);
    const updatedUser = { ...userInDB, ...userRequest };

    const savedUser = await repository.saveUser(updatedUser);

    return ({ data: savedUser });
  } catch (error) {
    fLogger.warn('Unmapped error at user login', { error });
    return { error: errors.COULD_NOT_UPDATE_USER };
  }
}

async function getUserByUsername(username) {
  return repository.getUserByUsername(username);
}

async function getUserById(id) {
  const fLogger = logger.child({ function: 'getUserById' });
  try {
    const userInDB = await repository.getUserById(id);
    return ({
      data: {
        username: userInDB.username,
        name: userInDB.name,
        surname: userInDB.surname,
        email: userInDB.email,
        phone: userInDB.phone,
      },
    });
  } catch (error) {
    fLogger.warn('Unmapped error at user fetch', { error });
    return { error: errors.COULD_NOT_UPDATE_USER };
  }
}

module.exports = {
  createUser,
  updateUser,
  getUserByUsername,
  getUserById,
};
