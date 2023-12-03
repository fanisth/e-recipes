const RECIPE = {
  RECIPE_FINDONE_BY_ID: {
    code: 'RECIPE001',
    status: 422,
    technicalDescription: 'Could not find recipe in DB using its id. Please try again later.',
    type: 1,
    userMessage: 'Η συνταγή δε βρέθηκε.',
  },
  RECIPES_FINDALL: {
    code: 'RECIPE002',
    status: 422,
    technicalDescription: 'Could not find recipes in DB. Please try again later.',
    type: 1,
    userMessage: 'Δεν βρέθηκαν συνταγές.',
  },
  RECIPE_CREATE: {
    code: 'RECIPE003',
    status: 422,
    technicalDescription: 'Could not create recipe. Please try again later.',
    type: 1,
    userMessage: 'Η συνταγή δεν μπόρεσε να αποθηκευθεί.',
  },
  RECIPE_UPDATE: {
    code: 'RECIPE004',
    status: 422,
    technicalDescription: 'Could not update recipe. Please try again later.',
    type: 1,
    userMessage: 'Η συνταγή δεν μπόρεσε να αποθηκευθεί.',
  },
  RECIPE_UNAUT_USER: {
    code: 'RECIPE005',
    status: 401,
    technicalDescription: 'Unauthorized user. Please try again later.',
    type: 1,
    userMessage: 'Δεν έχετε δικαίωμα να επεξεργαστείτε την συνταγή.',
  },
  GENERAL_RECIPE_ERROR: {
    code: 'RECIPE006',
    status: 500,
    technicalDescription: 'Could not access recipes. Please try again later.',
    type: 1,
    userMessage: 'Δεν ήταν δυνατή η πρόσβαση στην υπηρεσία. Παρακαλώ δοκιμάστε αργότερα.',
  },
};

module.exports = Object.freeze({
  ...RECIPE,
});
