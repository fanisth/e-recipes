const UPDATE = {
  COULD_NOT_UPDATE_USER: {
    code: 'USERUPDT001',
    status: 500,
    technicalDescription: 'Could not register user to service. Please try again later.',
    type: 1,
    userMessage: 'Δεν ήταν δυνατή η εγγραφή σας στην υπηρεσία. Παρακαλώ δοκιμάστε αργότερα.',
  },
  REGISTRATION_MOBILE_ALREADY_EXISTS: {
    code: 'USRINT002',
    status: 403,
    technicalDescription: 'User with this mobile phone is already registered',
    type: 1,
    userMessage: 'Είσαι ήδη εγγεγραμμένος με αυτό το κινητό.',
  },
  REGISTRATION_EMAIL_ALREADY_EXISTS: {
    code: 'USRINT003',
    status: 409,
    technicalDescription: 'User with this email is already registered',
    type: 1,
    userMessage: 'Η διεύθυνση email που εισαγάγατε έχει καταχωρηθεί ήδη σε κάποιο χρήστη.',
  },
};

module.exports = Object.freeze({
  ...UPDATE,
});
