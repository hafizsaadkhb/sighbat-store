const express = require('express');
const Message = require('../models/message');
const router = express.Router();

// Send Message
router.post('/send', async (req, res) => {
  const { senderId, recipientId, content } = req.body;
  try {
    const message = new Message({ senderId, recipientId, content });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Messages
router.get('/:userId', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ senderId: req.params.userId }, { recipientId: req.params.userId }],
    }).sort({ timestamp: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
