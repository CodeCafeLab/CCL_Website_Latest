// Disabled authentication middleware - all requests now pass through
module.exports = async (req, res, next) => {
  // Skip authentication check and allow all requests
  req.user = { id: 1, email: "antima142005@gmail.com" }; // Set default admin user
  next();
};
