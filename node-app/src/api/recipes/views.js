/* eslint-disable */
const validate = require('../../common/validate');
const logger = require('../../common/logger')();

const ErrorHandler = require('../errorHandler');
const controller = require('./controller');

const validations = require('./validation');
const errors = require('./errors');

async function getRecipe(req, res) {
  const fLogger = logger.child({ function: 'getRecipe' });
  try {
    const { params } = req;
    fLogger.info('Going to get a recipe', { params });

    const { data, error } = await controller.getRecipe(params);
    if (error) {
      return ErrorHandler.send(req, res, error);
    }

    const response = {
      payload: {
        recipe: data,
      },
    };
    fLogger.info({ response });
    res.status(200).json(response);
  } catch (error) {
    fLogger.warn('could not get recipe', { error });
    return ErrorHandler.send(req, res, errors.GENERAL_RECIPE_ERROR);
  }
}

async function getAllRecipes(req, res) {
  const fLogger = logger.child({ function: 'getAllRecipes' });
  try {
    fLogger.info('Going to get all recipes');
    const { data, error } = await controller.getAllRecipes();
    if (error) {
      return ErrorHandler.send(req, res, error);
    }

    res.status(200).json({
      payload: {
        recipes: data,
      },
    });
  } catch (error) {
    fLogger.warn('could not get all recipes', { error });
    return ErrorHandler.send(req, res, errors.GENERAL_RECIPE_ERROR);
  }
}

async function createRecipe(req, res) {
  const fLogger = logger.child({ function: 'createRecipe' });
  try {
    const { body, user } = req;
    fLogger.info('Going to create a recipe', { body, user });

    const validationError = validate(body, validations.RECIPE);
    if (validationError) {
      return ErrorHandler.send(req, res, validationError);
    }

    const { data, error } = await controller.createRecipe(body, user);
    if (error) {
      return ErrorHandler.send(req, res, error);
    }

    const response = {
      payload: {
        id: data,
      },
    };
    fLogger.info({ response });
    res.status(201).json(response);
  } catch (error) {
    fLogger.warn('could not create recipe', { error });
    return ErrorHandler.send(req, res, errors.GENERAL_RECIPE_ERROR);
  }
}

async function updateRecipe(req, res) {
  const fLogger = logger.child({ function: 'register' });
  try {
    const validationError = validate(req.body, validations.RECIPE);
    if (validationError) {
      return ErrorHandler.send(req, res, validationError);
    }

    const { body, params, user } = req;
    fLogger.info('Going to update recipe', { body, params, user });
    const { data, error } = await controller.updateRecipe(body, params, user);
    if (error) {
      return ErrorHandler.send(req, res, error);
    }

    res.status(204).json({
      payload: {
        msg: data,
      },
    });
  } catch (error) {
    fLogger.warn('could not update recipe', { error });
    return ErrorHandler.send(req, res, errors.GENERAL_RECIPE_ERROR);
  }
}

async function getUserRecipes(req, res) {
  const fLogger = logger.child({ function: 'getUserRecipes' });
  try {
    const userId = req.user._id;
    fLogger.info('Going to get user recipes', { userId });
    const { data, error } = await controller.getUserRecipes(userId);
    if (error) {
      return ErrorHandler.send(req, res, error);
    }

    res.status(200).json({
      payload: {
        recipes: data,
      },
    });
  } catch (error) {
    fLogger.warn('could not get getUserRecipes recipes', { error });
    return ErrorHandler.send(req, res, errors.GENERAL_RECIPE_ERROR);
  }
}

module.exports = {
  getRecipe,
  getAllRecipes,
  createRecipe,
  updateRecipe,
  getUserRecipes,
};
