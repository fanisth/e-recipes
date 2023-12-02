/* eslint-disable consistent-return */
const validate = require('../../common/validate');
const logger = require('../../common/logger')();

const ErrorHandler = require('../errorHandler');
const controller = require('./controller');

const validations = require('./validation');
const errors = require('./errors');

async function login(req, res) {
  const fLogger = logger.child({ function: 'login' });
  try {
    const { body } = req;
    fLogger.info({ body });

    const validationError = validate(body, validations.LOGIN);
    if (validationError) {
      return ErrorHandler.send(req, res, validationError);
    }

    const { data, error } = await controller.login(body);
    if (error) {
      return ErrorHandler.send(req, res, error);
    }

    const response = {
      payload: {
        token: data,
      },
      extraInfo: {},
    };
    fLogger.info({ response });
    res.status(200).json(response);
  } catch (error) {
    fLogger.warn('could not register user', { error });
    return ErrorHandler.send(req, res, errors.COULD_NOT_LOGIN_USER);
  }
}

async function register(req, res) {
  const fLogger = logger.child({ function: 'register' });
  try {
    const validationError = validate(req.body, validations.REGISTER);
    if (validationError) {
      return ErrorHandler.send(req, res, validationError);
    }

    fLogger.info('Going to register user', { body: req.body });
    const { data, error } = await controller.register(req.body);
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
    return ErrorHandler.send(req, res, errors.COULD_NOT_REGISTER_USER);
  }
}

module.exports = {
  login,
  register,
};
