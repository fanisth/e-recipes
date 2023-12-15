/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const Recipe = require('../../models/recipeSchema');

async function createRecipe(recipeRequest, userId, imagePath, thumbnailPath, fileId) {
  try {
    const recipe = new Recipe({
      ...recipeRequest,
      user_id: userId,
      photo_url: {
        imagePath,
        thumbnailPath,
        fileId,
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

async function getTopRatedRecipes() {
  // const collection = mongoController.getCollectionController(collectionName);
  try {
    const recipes = await Recipe.aggregate([
      {
        $addFields: {
          averageRating: { $divide: ['$rating.sum', '$rating.counter'] }
        }
      },
      {
        $sort: { averageRating: -1 } // Sort in descending order based on averageRating
      },
      {
        $limit: 3 // Limit the result to the top 3 documents
      }
    ]);
    return recipes;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function getLatestRecipes() {
  // const collection = mongoController.getCollectionController(collectionName);
  try {
    const recipes = await Recipe.find()
      .sort({ created_at: -1 }) // Sort in descending order based on created_at
      .limit(3); // Limit the result to the latest 3 documents;
    return recipes;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function getCategoryRecipes(categoryId) {
  // const collection = mongoController.getCollectionController(collectionName);
  try {
    const recipes = await Recipe.find({
      categories: categoryId
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

async function deleteRecipe(recipeId) {
  // const collection = mongoController.getCollectionController(collectionName);
  try {
    // eslint-disable-next-line no-underscore-dangle
    const result = await Recipe.deleteOne({ _id: recipeId });
    return result;
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
  deleteRecipe,
  getTopRatedRecipes,
  getLatestRecipes,
};
