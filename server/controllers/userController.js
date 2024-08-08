exports.getUserById = async (req, res) => {
    try {
      const userId = req.params.id; // Get the user ID from the request parameters
      const user = await User.findById(userId).select('-password'); // Find the user by ID, excluding the password field
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  