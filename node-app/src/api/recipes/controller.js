/* eslint-disable no-underscore-dangle */
const recipeRepository = require('./repository');
const logger = require('../../common/logger')();
const errors = require('./errors');

async function getRecipe(params) {
  const fLogger = logger.child({ function: 'getRecipe' });
  try {
    const { recipeId } = params;

    const recipe = await recipeRepository.getRecipeById(recipeId);
    if (!recipe) {
      return { error: errors.RECIPE_FINDONE_BY_ID };
    }

    return ({ data: recipe });
  } catch (error) {
    fLogger.warn('Unmapped error at getRecipe', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

async function getAllRecipes() {
  const fLogger = logger.child({ function: 'getAllRecipes' });
  try {
    const recipes = await recipeRepository.getAllRecipes();
    if (!recipes) {
      return { error: errors.RECIPES_FINDALL };
    }

    return ({ data: recipes });
  } catch (error) {
    fLogger.warn('Unmapped error at getAllRecipes', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

async function createRecipe(body, user) {
  const fLogger = logger.child({ function: 'createRecipe' });
  try {
    // eslint-disable-next-line no-underscore-dangle
    const recipe = await recipeRepository.createRecipe(body, user._id);
    if (!recipe) {
      return { error: errors.RECIPE_CREATE };
    }

    return ({ data: recipe.id });
  } catch (error) {
    fLogger.warn('Unmapped error at createRecipe', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

async function updateRecipe(body, params, user) {
  const fLogger = logger.child({ function: 'updateRecipe' });
  try {
    const { recipeId } = params;
    const recipeInDB = await recipeRepository.getRecipeById(recipeId);

    if (!recipeInDB) return { error: errors.RECIPE_FINDONE_BY_ID };
    // eslint-disable-next-line max-len
    if (recipeInDB.user_id.toString() !== user._id.toString()) return { error: errors.RECIPE_UNAUT_USER };

    const updatedRecipe = { ...recipeInDB, ...body };
    const savedRecipe = await recipeRepository.updateRecipe(updatedRecipe);

    if (!savedRecipe) return { error: errors.RECIPE_UPDATE };

    return ({ data: 'Success' });
  } catch (error) {
    fLogger.warn('Unmapped error at updateRecipe', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

module.exports = {
  getRecipe, createRecipe, getAllRecipes, updateRecipe,
};
