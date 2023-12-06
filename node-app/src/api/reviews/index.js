const express = require('express');
const auth = require('../../middlewares/authMiddleware');
const views = require('./views');

const router = express.Router();

router.get('/:recipeId', views.getRecipeReviews);
router.post('/:recipeId', auth.authenticateToken, views.postRecipeReview);

module.exports = router;
