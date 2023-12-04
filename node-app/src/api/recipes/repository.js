/* eslint-disable no-console */
const Recipe = require('../../models/recipeSchema');

async function createRecipe(recipeRequest, userId, imagePath, thumbnailPath) {
  try {
    const recipe = new Recipe({
      ...recipeRequest,
      user_id: userId,
      photo_url: {
        imagePath,
        thumbnailPath,
      },
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
    const recipe = Recipe.findOne({ _id: id }).lean();
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

async function updateRecipe(updatedRecipe) {
  // const collection = mongoController.getCollectionController(collectionName);
  try {
    // eslint-disable-next-line no-underscore-dangle
    const recipe = await Recipe.updateOne({ _id: updatedRecipe._id }, { ...updatedRecipe });
    return recipe;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function getUserRecipes(userId) {
  // const collection = mongoController.getCollectionController(collectionName);
  try {
    const recipes = Recipe.find({ user_id: userId });
    return recipes;
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  createRecipe,
  getRecipeById,
  getAllRecipes,
  updateRecipe,
  getUserRecipes,
};
