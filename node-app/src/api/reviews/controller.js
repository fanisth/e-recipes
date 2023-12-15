/* eslint-disable no-underscore-dangle */
const repository = require('./repository');
const recipeRepo = require('../recipes/repository');
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

async function postReview(reviewBody, user, recipeId) {
  const fLogger = logger.child({ function: 'postReview' });
  try {
    // get recipe
    const recipe = await recipeRepo.getRecipeById(recipeId);
    if (!recipe) throw new Error();

    // create review
    const review = await repository.postRecipeReview({
      ...reviewBody,
      recipeId,
      userId: user._id,
      user: {
        name: user.name,
        lastname: user.surname,
      },
    });

    // update recipe rating
    if (!recipe.rating) {
      recipe.rating = {
        sum: 0,
        counter: 0,
      };
    }
    recipe.rating.sum += reviewBody.rating;
    recipe.rating.counter += 1;
    recipeRepo.updateRecipe(recipe);

    return review;
  } catch (error) {
    fLogger.warn('Unmapped error at user fetch', { error });
    return { error: errors.COULD_NOT_POST_REVIEW };
  }
}

module.exports = { getRecipeReviews, postReview };
