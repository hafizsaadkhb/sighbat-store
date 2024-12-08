const express = require('express');
const Review = require('../models/review');
const Product = require('../models/product'); // Assuming Product schema has a `ratings` field
const router = express.Router();

// Add a Review
router.post('/add', async (req, res) => {
  const { userId, productId, rating, comment } = req.body;
  try {
    // Check if the user already reviewed this product
    const existingReview = await Review.findOne({ userId, productId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product.' });
    }

    const review = new Review({
      userId,
      productId,
      rating,
      comment,
    });

    await review.save();

    // Optionally update product's average rating
    const reviews = await Review.find({ productId });
    const avgRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(productId, { ratings: avgRating });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Reviews for a Product
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate('userId', 'name'); // Assuming user schema has a `name` field
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a Review
router.put('/update/:reviewId', async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    // Update review fields
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();

    // Recalculate product's average rating
    const reviews = await Review.find({ productId: review.productId });
    const avgRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(review.productId, { ratings: avgRating });

    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a Review
router.delete('/delete/:reviewId', async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    await review.remove();

    // Recalculate product's average rating
    const reviews = await Review.find({ productId: review.productId });
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        : 0;
    await Product.findByIdAndUpdate(review.productId, { ratings: avgRating });

    res.status(200).json({ message: 'Review deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
