const jwt = require("express-jwt");

// Check if token is created using correct secret key
exports.authenticated = jwt({ secret: process.env.SECRET_KEY });

// Check if id from token match the api user_id param
exports.authorized = (req, res, next) => {
  if (req.user.id != req.params.user_id) {
    return res.status(401).json({ message: "You are not authenticated." });
  }
  next();
};