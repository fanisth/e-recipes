/* eslint-disable no-useless-escape */
const categoryController = require('../categories/controller');

const stopWords = ['το', 'τον', 'τη', 'την', 'τα', 'με', 'κ.γ.', 'κ.σ.', 'γρ', 'γρ.', 'γραμ.', 'γραμμάρια', 'φλ.', 'φλ', 'σκελ.', 'σκελ', 'kg', 'ματσ.', 'καθενα', 'ενα', 'δυο', 'του', 'της'];
const specialCharacters = /[\/()]/g;

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

function removeStopWords(text) {
  const withoutNumbers = text.replace(/\d+/g, '');
  const withoutSpecialChars = withoutNumbers.replace(specialCharacters, '');
  let wordsArray = withoutSpecialChars.split(/\s+/);
  wordsArray = wordsArray.filter((word) => !stopWords.includes(word));
  const resultString = wordsArray.join(' ');
  return resultString;
}

function getTerm(term) {
  const normalized = normalizeGreek(term);
  const lowered = normalized.toLowerCase();
  const cleared = removeStopWords(lowered);
  return cleared;
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
  removeStopWords,
};
