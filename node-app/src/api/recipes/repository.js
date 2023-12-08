/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const mongoose = require('mongoose');
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
    const recipe = await Recipe.findOne({ _id: id }).lean();
    return recipe;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function getCategoryRecipes(categoryId) {
  // const collection = mongoController.getCollectionController(collectionName);
  try {
    const recipes = await Recipe.find({
      categories: mongoose.Types.ObjectId(categoryId)
    });
    return recipes;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function getTagRecipes(tag) {
  // const collection = mongoController.getCollectionController(collectionName);
  try {
    const recipes = await Recipe.find({
      tags: tag
    });
    return recipes;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function getAllRecipes() {
  // const collection = mongoController.getCollectionController(collectionName);
  try {
    const recipes = await Recipe.find({});
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
    const recipes = await Recipe.find({ user_id: userId });
    return recipes;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function search(keyword) {
  try {
    const recipes = await Recipe.aggregate([
      {
        $search: {
          index: 'default',
          text: {
            query: keyword,
            path: {
              wildcard: '*'
            }
          }
        }
      }
    ]).exec();

    return recipes;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function searchSuggestions(keyword) {
  try {
    const recipes = await Recipe.aggregate([
      {
        $search: {
          index: 'autocomplete',
          compound: {
            must: [
              {
                compound: {
                  should: [
                    {
                      autocomplete: {
                        query: keyword,
                        path: 'searchTerms.title',
                        fuzzy: {
                          maxEdits: 1,
                          maxExpansions: 50,
                          prefixLength: 2,
                        },
                        score: {
                          boost: {
                            value: 2,
                          },
                        },
                      },
                    },
                  ],
                  minimumShouldMatch: 1,
                },
              },
            ],
          },
          highlight: {
            path: [
              'searchTerms.title',
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1
        }
      }
    ]).exec();

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
  search,
  searchSuggestions,
  getCategoryRecipes,
  getTagRecipes,
};
