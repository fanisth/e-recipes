const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userController = require('../api/users/controller');

// eslint-disable-next-line consistent-return
async function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await userController.getUserById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
}

module.exports = authenticateToken;
