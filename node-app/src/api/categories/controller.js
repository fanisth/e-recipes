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

async function getCategoryNames(idsArray) {
  const fLogger = logger.child({ function: 'getCategoryTree' });
  try {
    const categoriesArray = await repository.getCategoriesByCriteria({ _id: { $in: idsArray } });
    const categoriesNames = await categoriesArray.map((category) => category.name);
    return categoriesNames;
  } catch (error) {
    fLogger.warn('Unmapped error at user fetch', { error });
    return { error: errors.COULD_NOT_GET_CATEGORIES };
  }
}

module.exports = { getCategoryTree, getCategoryNames };
