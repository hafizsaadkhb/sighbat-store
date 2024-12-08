const express = require('express');
const Order = require('../models/order');
const router = express.Router();

// Create a New Order
router.post('/create', async (req, res) => {
  const { userId, items, totalAmount } = req.body;
  try {
    const order = new Order({
      userId,
      items,
      totalAmount,
      status: 'Pending', // Default status
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Order History for a User
router.get('/history/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('items.productId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Order Status (e.g., for delivery tracking)
router.put('/update-status/:orderId', async (req, res) => {
  const { status, deliveryDate } = req.body;
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (status) order.status = status;
    if (deliveryDate) order.deliveryDate = deliveryDate;

    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
