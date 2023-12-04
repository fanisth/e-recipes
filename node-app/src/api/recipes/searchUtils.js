const categoryController = require('../categories/controller');

function normalizeGreek(text) {
  const revisedText = text.replace(/Ά|Α|ά/g, 'α')
    .replace(/Έ|Ε|έ/g, 'ε')
    .replace(/Ή|Η|ή/g, 'η')
    .replace(/Ί|Ϊ|Ι|ί|ΐ|ϊ/g, 'ι')
    .replace(/Ό|Ο|ό/g, 'ο')
    .replace(/Ύ|Ϋ|Υ|ύ|ΰ|ϋ/g, 'υ')
    .replace(/Ώ|Ω|ώ/g, 'ω')
    .replace(/Σ|ς/g, 'σ');
  return revisedText;
}

function getTerm(term) {
  const normalized = normalizeGreek(term);
  return normalized.toLowerCase();
}

async function getSearchTerms(recipe) {
  const categoriesNames = await categoryController.getCategoryNames(recipe.categories);

  const title = getTerm(recipe.title);
  const categories = getTerm(categoriesNames.join(' '));
  const equipment = getTerm(recipe.equipment.join(' '));
  const ingredients = getTerm(recipe.ingredients.join(' '));
  const tags = getTerm(recipe.tags.join(' '));

  return {
    title,
    categories,
    equipment,
    ingredients,
    tags,
  };
}

module.exports = {
  getTerm,
  getSearchTerms,
};
