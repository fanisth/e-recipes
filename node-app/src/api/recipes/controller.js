/* eslint-disable no-underscore-dangle,camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
const ImageKit = require('imagekit');
const recipeRepository = require('./repository');
const logger = require('../../common/logger')();
const errors = require('./errors');
const searchUtils = require('./searchUtils');

const imagekit = new ImageKit({
  publicKey: 'public_qgv+8znrGNc3MUtvl2/qPPc9VOk=',
  privateKey: 'private_cc0WxP94NgJULOttjJbifRBKf38=',
  urlEndpoint: 'https://ik.imagekit.io/jhzf44xh6',
});

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

async function getTopRatedRecipes() {
  const fLogger = logger.child({ function: 'getTopRatedRecipes' });
  try {
    const recipes = await recipeRepository.getTopRatedRecipes();
    if (!recipes) {
      return { error: errors.RECIPES_FINDALL };
    }

    return ({ data: recipes });
  } catch (error) {
    fLogger.warn('Unmapped error at getTopRatedRecipes', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

async function getLatestRecipes() {
  const fLogger = logger.child({ function: 'getLatestRecipes' });
  try {
    const recipes = await recipeRepository.getLatestRecipes();
    if (!recipes) {
      return { error: errors.RECIPES_FINDALL };
    }

    return ({ data: recipes });
  } catch (error) {
    fLogger.warn('Unmapped error at getLatestRecipes', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

async function getCategoryRecipes(categoryId) {
  const fLogger = logger.child({ function: 'getCategoryRecipes' });
  try {
    const recipes = await recipeRepository.getCategoryRecipes(categoryId);
    if (!recipes) {
      return { error: errors.RECIPES_FINDALL };
    }

    return ({ data: recipes });
  } catch (error) {
    fLogger.warn('Unmapped error at getCategoryRecipes', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

async function getTagRecipes(tag) {
  const fLogger = logger.child({ function: 'getTagRecipes' });
  try {
    const recipes = await recipeRepository.getTagRecipes(tag);
    if (!recipes) {
      return { error: errors.RECIPES_FINDALL };
    }

    return ({ data: recipes });
  } catch (error) {
    fLogger.warn('Unmapped error at getTagRecipes', { error });
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

async function createRecipe(body, user, imagePath, thumbnailPath, fileId) {
  const fLogger = logger.child({ function: 'createRecipe' });
  try {
    // eslint-disable-next-line no-underscore-dangle
    const searchTerms = await searchUtils.getSearchTerms(body);
    const recipe = await recipeRepository.createRecipe({
      ...body,
      searchTerms,
    }, user._id, imagePath, thumbnailPath, fileId);
    if (!recipe) {
      return { error: errors.RECIPE_CREATE };
    }

    return ({ data: recipe.id });
  } catch (error) {
    fLogger.warn('Unmapped error at createRecipe', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

async function updateRecipe(body, params, user, imagePath, thumbnailPath, fileId) {
  const fLogger = logger.child({ function: 'updateRecipe' });
  try {
    const { recipeId } = params;
    const recipeInDB = await recipeRepository.getRecipeById(recipeId);

    if (!recipeInDB) return { error: errors.RECIPE_FINDONE_BY_ID };
    // eslint-disable-next-line max-len
    if (recipeInDB.user_id.toString() !== user._id.toString()) return { error: errors.RECIPE_UNAUT_USER };

    // delete images
    if (recipeInDB?.photo_url?.imagePath && imagePath && fileId) {
      await imagekit.deleteFile(recipeInDB.photo_url.fileId);
    }

    const photo_url = (imagePath && fileId) ? {
      imagePath,
      thumbnailPath,
      fileId,
    } : recipeInDB?.photo_url;
    const updatedRecipe = { ...recipeInDB, ...body, photo_url };
    // updatedRecipe.searchTerms = await searchUtils.getSearchTerms(updateRecipe);
    const savedRecipe = await recipeRepository.updateRecipe(updatedRecipe);

    if (!savedRecipe) return { error: errors.RECIPE_UPDATE };

    return ({ data: 'Success' });
  } catch (error) {
    fLogger.warn('Unmapped error at updateRecipe', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

async function deleteRecipe(params, user) {
  const fLogger = logger.child({ function: 'deleteRecipe' });
  try {
    const { recipeId } = params;
    const recipeInDB = await recipeRepository.getRecipeById(recipeId);

    if (!recipeInDB) return { error: errors.RECIPE_FINDONE_BY_ID };
    // eslint-disable-next-line max-len
    if (recipeInDB.user_id.toString() !== user._id.toString()) return { error: errors.RECIPE_UNAUT_USER };

    // delete images
    if (recipeInDB?.photo_url?.imagePath) {
      await imagekit.deleteFile(recipeInDB.photo_url.fileId);
    }

    const result = await recipeRepository.deleteRecipe(recipeId);

    if (!result || result?.deletedCount !== 1) return { error: errors.RECIPE_DELETE };

    return ({ data: 'Success' });
  } catch (error) {
    fLogger.warn('Unmapped error at deleteRecipe', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

async function getUserRecipes(userId) {
  const fLogger = logger.child({ function: 'getUserRecipes' });
  try {
    const recipes = await recipeRepository.getUserRecipes(userId);
    if (!recipes) {
      return { error: errors.RECIPES_FINDALL };
    }

    return ({ data: recipes });
  } catch (error) {
    fLogger.warn('Unmapped error at getUserRecipes', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

async function search(keyword) {
  const fLogger = logger.child({ function: 'getAllRecipes' });
  try {
    const normalizedKeyword = searchUtils.getTerm(keyword);
    const recipes = await recipeRepository.search(normalizedKeyword);
    if (!recipes) {
      return { error: errors.RECIPES_FINDALL };
    }

    return ({ data: recipes });
  } catch (error) {
    fLogger.warn('Unmapped error at search', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

async function searchSuggestions(keyword) {
  const fLogger = logger.child({ function: 'getAllRecipes' });
  try {
    const normalizedKeyword = searchUtils.getTerm(keyword);
    const recipes = await recipeRepository.searchSuggestions(normalizedKeyword);
    if (!recipes) {
      return { error: errors.RECIPES_FINDALL };
    }

    return ({ data: recipes });
  } catch (error) {
    fLogger.warn('Unmapped error at search', { error });
    return { error: errors.GENERAL_RECIPE_ERROR };
  }
}

module.exports = {
  getRecipe,
  createRecipe,
  getAllRecipes,
  updateRecipe,
  getUserRecipes,
  search,
  searchSuggestions,
  getCategoryRecipes,
  getTagRecipes,
  deleteRecipe,
  getTopRatedRecipes,
  getLatestRecipes,
};
