/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const logger = require('../../common/logger')();

const ErrorHandler = require('../errorHandler');
const controller = require('./controller');

const errors = require('./errors');

async function getRecipeReviews(req, res) {
  const fLogger = logger.child({ function: 'getRecipeReviews' });
  try {
    const { recipeId } = req.params;
    const data = await controller.getRecipeReviews(recipeId);

    res.status(200).json({
      payload: {
        ...data,
      },
    });
  } catch (error) {
    fLogger.warn('could not get reviews', { error });
    return ErrorHandler.send(req, res, errors.COULD_NOT_GET_REVIEWS);
  }
}

async function postRecipeReview(req, res) {
  const fLogger = logger.child({ function: 'postRecipeReview' });
  try {
    const { recipeId } = req.params;
    const data = await controller.postReview(req.body, req.user._id, recipeId);

    res.status(200).json({
      payload: {
        ...data,
      },
    });
  } catch (error) {
    fLogger.warn('could not get user', { error });
    return ErrorHandler.send(req, res, errors.COULD_NOT_POST_REVIEWS);
  }
}

module.exports = { getRecipeReviews, postRecipeReview };
