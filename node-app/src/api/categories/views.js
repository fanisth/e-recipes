/* eslint-disable consistent-return */
const logger = require('../../common/logger')();

const ErrorHandler = require('../errorHandler');
const controller = require('./controller');

const errors = require('./errors');

async function getCategories(req, res) {
  const fLogger = logger.child({ function: 'userProfile' });
  try {
    const data = await controller.getCategoryTree();

    res.status(200).json({
      payload: {
        ...data,
      },
    });
  } catch (error) {
    fLogger.warn('could not get user', { error });
    return ErrorHandler.send(req, res, errors.COULD_NOT_UPDATE_USER);
  }
}

module.exports = { getCategories };
