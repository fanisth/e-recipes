const REVIEWS = {
  COULD_NOT_GET_REVIEWS: {
    code: 'RATGET001',
    status: 500,
    technicalDescription: 'Could not get reviews.',
    type: 1,
    userMessage: 'Κάτι πήγε λάθος. Παρακαλώ δοκιμάστε αργότερα.',
  },
};

module.exports = Object.freeze({
  ...REVIEWS,
});
