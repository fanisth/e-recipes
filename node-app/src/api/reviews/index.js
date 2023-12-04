const express = require('express');
const views = require('./views');

const router = express.Router();

router.get('/:recipeId', views.getRecipeReviews);

module.exports = router;
