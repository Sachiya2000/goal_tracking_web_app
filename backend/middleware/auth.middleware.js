// backend/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the ID from the token payload and attach to the request
      // We exclude the password field from being attached
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move on to the next function (the controller)
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
