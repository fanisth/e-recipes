const CATEGORIES = {
  COULD_NOT_GET_CATEGORIES: {
    code: 'CATGET001',
    status: 500,
    technicalDescription: 'Could not get category tree.',
    type: 1,
    userMessage: 'Κάτι πήγε λάθος. Παρακαλώ δοκιμάστε αργότερα.',
  },
};

module.exports = Object.freeze({
  ...CATEGORIES,
});
