const express = require('express');

const router = express.Router();
const views = require('./views');

router.post('/register', views.register);
router.post('/login', views.login);

module.exports = router;
