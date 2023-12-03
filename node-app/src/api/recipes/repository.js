/* eslint-disable no-console */
const Recipe = require('../../models/recipeSchema');

async function createRecipe(recipeRequest, userId) {
  try {
    const recipe = new Recipe({
      ...recipeRequest,
      user_id: userId,
    });

    const createdRecipe = await recipe.save();
    return createdRecipe;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getRecipeById(id) {
  // const collection = mongoController.getCollectionController(collectionName);
  try {
    const recipe = Recipe.findOne({ _id: id });
    return recipe;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function getAllRecipes() {
  // const collection = mongoController.getCollectionController(collectionName);
  try {
    const recipes = Recipe.find({});
    return recipes;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function updateRecipe(recipeRequest, userId, recipeId) {
  // const collection = mongoController.getCollectionController(collectionName);
  try {
    const recipe = await Recipe.findOne({ _id: recipeId });
    console.log(recipe);
    console.log(recipeRequest);

    if (!recipe) return null;
    if (recipe.user_id.toString() !== userId) return 'Invalid user';

    /* eslint-disable prefer-object-spread */
    // Update the document using `updateOne()`
    await recipe.updateOne(recipeRequest);
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  createRecipe, getRecipeById, getAllRecipes, updateRecipe,
};
