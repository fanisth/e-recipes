const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  sum: { type: Number },
  counter: { type: Number },
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructions: [{ type: Object, required: true }],
  ingredients: [{ type: String, required: true }],
  equipment: [{ type: String, required: true }],
  tags: [{ type: String, required: true }],
  description: { type: String, required: true },
  categories: [{ type: mongoose.Schema.ObjectId, required: true }],
  user_id: { type: mongoose.Schema.ObjectId, required: true },
  photo_url: { type: Object, required: false },
  preperation_time: { type: Number, required: true },
  cooking_time: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  searchTerms: {
    title: { type: String, trim: true },
    categories: { type: String, trim: true },
    equipment: { type: String, trim: true },
    ingredients: { type: String, trim: true },
    tags: { type: String, trim: true },
  },
  rating: ratingSchema,
  created_at: { type: Date, default: Date.now, required: true },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
