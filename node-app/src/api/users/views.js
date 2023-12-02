/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const validate = require('../../common/validate');
const logger = require('../../common/logger')();

const ErrorHandler = require('../errorHandler');
const controller = require('./controller');

const validations = require('./validation');
const errors = require('./errors');

async function update(req, res) {
  const fLogger = logger.child({ function: 'update user' });
  try {
    const validationError = validate(req.body, validations.UPDATE);
    if (validationError) {
      return ErrorHandler.send(req, res, validationError);
    }

    fLogger.info('Going to update user', { body: req.body });
    const { data, error } = await controller.updateUser(req.body, req.user._id.toString());
    if (error) {
      return ErrorHandler.send(req, res, error);
    }

    res.status(200).json({
      payload: {
        token: data,
      },
    });
  } catch (error) {
    fLogger.warn('could not register user', { error });
    return ErrorHandler.send(req, res, errors.COULD_NOT_UPDATE_USER);
  }
}

module.exports = {
  update,
};
