const repository = require('./repository');
const logger = require('../../common/logger')();
const errors = require('./errors');

async function getRecipeReviews(recipeId) {
  const fLogger = logger.child({ function: 'getRecipeReviews' });
  try {
    const reviews = await repository.getRecipeReviews(recipeId);
    return reviews;
  } catch (error) {
    fLogger.warn('Unmapped error at user fetch', { error });
    return { error: errors.COULD_NOT_GET_REVIEWS };
  }
}

module.exports = { getRecipeReviews };
