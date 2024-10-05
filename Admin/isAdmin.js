 const User=require('../User/userSchema')




// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  const userId = req.user.id; // Assuming the user ID is set after authentication
  const user = await User.findById(userId);

  if (user && user.role === 'admin') {
    next(); // If the user is an admin, proceed
  } else {
    return res.status(403).json({ message: 'Access denied, admin only.' });
  }
};

module.exports = { isAdmin };