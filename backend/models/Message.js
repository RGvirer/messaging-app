const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  user: { type: String, required: true, maxlength: 50 },
  avatar: { type: String },
  text: { type: String, required: true, maxlength: 1000 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);