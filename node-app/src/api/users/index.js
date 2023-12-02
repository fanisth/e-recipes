const express = require('express');

const router = express.Router();
const auth = require('../../middlewares/authMiddleware');

router.get('/me', auth.authenticateToken, (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req);
  res.send();
});

module.exports = router;
