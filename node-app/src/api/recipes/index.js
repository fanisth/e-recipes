const router = require('express').Router();
const auth = require('../../middlewares/authMiddleware');
const uploader = require('../../middlewares/uploadMiddleware');
const views = require('./views');

router.get('/my-recipes', auth.authenticateToken, views.getUserRecipes);
router.get('/top-rated', views.getTopRatedRecipes);
router.get('/latest', views.getLatestRecipes);
router.get('/categories/:categoryId', views.getCategoryRecipes);
router.get('/tags', views.getTagRecipes);
router.get('/search', views.search);
router.get('/search-suggestions', views.searchSuggestions);
router.get('/:recipeId', views.getRecipe);
router.post('/', auth.authenticateToken, uploader, views.createRecipe);
router.get('/', views.getAllRecipes);
router.put('/:recipeId', auth.authenticateToken, uploader, views.updateRecipe);
router.delete('/:recipeId', auth.authenticateToken, views.deleteRecipe);

module.exports = router;
