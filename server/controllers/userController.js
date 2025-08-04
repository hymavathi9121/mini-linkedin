// Example: userController.js
const User = require('../models/User');
const Post = require('../models/Post');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load profile' });
  }
};
