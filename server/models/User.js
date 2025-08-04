// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  bio: String,
  profilePic: String, // <-- Add this field
});

module.exports = mongoose.model('User', userSchema);
