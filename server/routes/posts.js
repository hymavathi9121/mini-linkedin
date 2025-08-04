const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// GET all posts (with user info)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email') // Populate author field with user info
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET posts by specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new post (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const newPost = new Post({
      content: req.body.content,
      author: req.user.id, // Correct field
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
