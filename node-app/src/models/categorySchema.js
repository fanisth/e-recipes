const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: {
    type: String,
    required: true,
    trim: true,
    enum: ['food', 'desserts'],
  },
  subcategories: [{ type: mongoose.Schema.ObjectId }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
