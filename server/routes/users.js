// routes/users.js
const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const auth = require('../middleware/auth'); // ✅ Import the middleware

router.get('/:id', auth, getUserProfile); // ✅ Apply auth here

module.exports = router;
