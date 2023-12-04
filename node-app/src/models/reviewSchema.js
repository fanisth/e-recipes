const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  recipeId: { type: mongoose.Schema.ObjectId, required: true },
  userId: { type: mongoose.Schema.ObjectId, required: true },
  rating: {
    type: String,
    required: true,
    trim: true,
    enum: ['Άριστο', 'Πολυ Καλό', 'Καλό', 'Μέτριο', 'Κακό'],
  },
  text: [{ type: String }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
