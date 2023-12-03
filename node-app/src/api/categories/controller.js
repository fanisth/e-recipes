const repository = require('./repository');
const logger = require('../../common/logger')();
const errors = require('./errors');

async function getCategoryTree() {
  const fLogger = logger.child({ function: 'getCategoryTree' });
  try {
    const categoriesArray = await repository.getCategories();
    return ({ data: categoriesArray });
  } catch (error) {
    fLogger.warn('Unmapped error at user fetch', { error });
    return { error: errors.COULD_NOT_GET_CATEGORIES };
  }
}

module.exports = { getCategoryTree };
