const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authenticateJWT = require('../middleware/auth');

// This module exports a function that accepts the socket.io instance so that
// we can emit events when a message is saved.
module.exports = (io) => {
  // GET /messages
  router.get('/', async (req, res) => {
    try {
      const messages = await Message.find()
        .sort({ createdAt: -1 })
        .limit(50);
      res.json(messages);
    } catch (err) {
      console.error('Error fetching messages:', err);
      res.status(500).json({ error: 'Failed to load messages' });
    }
  });

  // POST /messages
  // req.user is populated by the JWT authentication middleware;
  // fall back to body.user if for some reason the token is absent.
  router.post('/', authenticateJWT, async (req, res) => {
    const { user: bodyUser, text } = req.body;
    const sender = req.user && req.user.name ? req.user.name : bodyUser;

    if (!sender || !text || !text.trim()) {
      return res.status(400).json({ error: 'Invalid message' });
    }
    if (text.length > 1000) {
      return res.status(400).json({ error: 'Message too long' });
    }

    try {
      const avatar = req.user && req.user.avatar ? req.user.avatar : undefined;
      const msg = new Message({ user: sender, avatar, text: text.trim() });
      const saved = await msg.save();
      // broadcast to all connected clients
      io.emit('new_message', saved);
      res.status(201).json(saved);
    } catch (err) {
      console.error('Error saving message:', err);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

  return router;
};