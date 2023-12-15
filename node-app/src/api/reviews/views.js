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
    fLogger.info('should fetch review for recipe id', { recipeId });
    const data = await controller.getRecipeReviews(recipeId);
    fLogger.info('fetched review for recipe id', { data });

    res.status(200).json({
      payload: {
        data,
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
    const data = await controller.postReview(req.body, req.user, recipeId);

    res.status(200).json({
      payload: {
        data,
      },
    });
  } catch (error) {
    fLogger.warn('could not get user', { error });
    return ErrorHandler.send(req, res, errors.COULD_NOT_POST_REVIEWS);
  }
}

module.exports = { getRecipeReviews, postRecipeReview };
