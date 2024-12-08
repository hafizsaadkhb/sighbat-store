const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(req.body)
    console.log(user)
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
