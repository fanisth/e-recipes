const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructions: { type: Array, required: true },
  ingredients: { type: Array, required: true },
  equipment: { type: Array, required: true },
  tags: { type: Array, required: true },
  categories: [{ type: mongoose.Schema.ObjectId, required: true }],
  user_id: { type: mongoose.Schema.ObjectId, required: true },
  photos_urls: { type: Array, required: false },
  video_url: { type: String, required: false },
  preperation_time: { type: Number, required: true },
  cooking_time: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  created_at: { type: Date, default: Date.now, required: true },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
