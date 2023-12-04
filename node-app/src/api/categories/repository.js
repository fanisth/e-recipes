/* eslint-disable no-console */
const Category = require('../../models/categorySchema');

async function getCategories() {
  try {
    const allCategories = await Category.find({}).lean();
    return allCategories;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getCategoriesByCriteria(criteria) {
  try {
    const allCategories = await Category.find(criteria).lean();
    return allCategories;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { getCategories, getCategoriesByCriteria };
