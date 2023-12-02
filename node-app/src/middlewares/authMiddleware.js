const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userRepo = require('../api/users/repository');

// eslint-disable-next-line consistent-return
async function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  try {
    const tokenVal = token.split(' ')[1];
    const decoded = jwt.verify(tokenVal, config.jwtSecret);
    req.user = await userRepo.getUserById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
}

module.exports = { authenticateToken };
