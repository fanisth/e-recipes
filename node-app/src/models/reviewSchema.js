const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  recipeId: { type: mongoose.Schema.ObjectId, required: true },
  userId: { type: mongoose.Schema.ObjectId, required: true },
  user: {
    name: { type: String },
    lastname: { type: String },
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  text: { type: String },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
