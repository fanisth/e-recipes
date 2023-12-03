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

    return ({ data: recipe.id });
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
    const recipe = await recipeRepository.createRecipe(body, user.id);
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
  // const { recipeId } = req.params;
  // console.log('controller');
  // const recipe = await recipeRepository.updateRecipe(req.body, req.user.id, recipeId);
  //
  // if (!recipe) return res.status(500).json({ error: 'An error occured' });
  // // not-owner user
  // if (recipe === 'Invalid user') return res.status(401).json({ error: 'Access denied' });
  //
  // return res.status(203).json({ message: 'Success' });
  const fLogger = logger.child({ function: 'updateRecipe' });
  try {
    const { recipeId } = params;
    const recipe = await recipeRepository.updateRecipe(body, user.id, recipeId);
    if (!recipe) {
      return { error: errors.RECIPE_UPDATE };
    }

    return ({ data: 'Success' });
  } catch (error) {
    fLogger.warn('Unmapped error at updateRecipe', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

module.exports = {
  getRecipe, createRecipe, getAllRecipes, updateRecipe,
};
