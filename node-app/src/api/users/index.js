const express = require('express');
const views = require('./views');

const router = express.Router();
const auth = require('../../middlewares/authMiddleware');

router.get('/profile', auth.authenticateToken, views.userProfile);
router.put('/profile', auth.authenticateToken, views.update);

module.exports = router;
