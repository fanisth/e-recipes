const router = require('express').Router();
const auth = require('../../middlewares/authMiddleware');
const views = require('./views');

router.get('/:recipeId', views.getRecipe);
router.post('/', auth.authenticateToken, views.createRecipe);
router.get('/', views.getAllRecipes);
router.put('/:recipeId', auth.authenticateToken, views.updateRecipe);

module.exports = router;
