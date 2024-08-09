const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
