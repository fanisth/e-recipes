const REVIEWS = {
  COULD_NOT_GET_REVIEWS: {
    code: 'RATGET001',
    status: 500,
    technicalDescription: 'Could not get reviews.',
    type: 1,
    userMessage: 'Κάτι πήγε λάθος. Παρακαλώ δοκιμάστε αργότερα.',
  },
  COULD_NOT_POST_REVIEW: {
    code: 'RATGET002',
    status: 500,
    technicalDescription: 'Could not post review.',
    type: 1,
    userMessage: 'Κάτι πήγε λάθος. Παρακαλώ δοκιμάστε αργότερα.',
  },
  COULD_NOT_FIND_RECIPE: {
    code: 'RATGET003',
    status: 500,
    technicalDescription: 'Could not find recipe.',
    type: 1,
    userMessage: 'Κάτι πήγε λάθος. Παρακαλώ δοκιμάστε αργότερα.',
  },
};

module.exports = Object.freeze({
  ...REVIEWS,
});
