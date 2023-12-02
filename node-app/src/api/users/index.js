const express = require('express');
const views = require('./views');

const router = express.Router();
const auth = require('../../middlewares/authMiddleware');

router.get('/profile', auth.authenticateToken, (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req);
  res.send();
});
router.put('/profile', auth.authenticateToken, views.update);

module.exports = router;
