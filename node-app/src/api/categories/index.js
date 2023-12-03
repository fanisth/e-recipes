const express = require('express');
const views = require('./views');

const router = express.Router();

router.get('/', views.getCategories);

module.exports = router;
