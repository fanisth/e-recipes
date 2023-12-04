/* eslint-disable no-console */
const Rating = require('../../models/reviewSchema');

async function getRecipeReviews(recipeId) {
  try {
    const reviews = await Rating.find({ recipeId }).lean();
    return reviews;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { getRecipeReviews };
