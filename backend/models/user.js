// models/user.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 60 },
  username: { type: String },
  name: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;