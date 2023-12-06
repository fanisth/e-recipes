/* eslint-disable no-console */
const Review = require('../../models/reviewSchema');

async function getRecipeReviews(recipeId) {
  try {
    const reviews = await Review.find({ recipeId }).lean();
    return reviews;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function postRecipeReview(review) {
  try {
    const reviews = await Review.create(review);
    return reviews;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { getRecipeReviews, postRecipeReview };
