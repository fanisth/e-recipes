const LOGIN = {
  USER_FINDONE_BY_USERNAME: {
    code: 'AUTHLOGIN001',
    status: 422,
    technicalDescription: 'Could not find user in DB using their username. Please try again later.',
    type: 1,
    userMessage: 'Το username σου δε βρέθηκε.',
  },
  USER_WRONG_PASSWORD: {
    code: 'AUTHLOGIN002',
    status: 422,
    technicalDescription: 'Wrong password. Please try again later.',
    type: 1,
    userMessage: 'Λάθος κωδικός πρόσβασης.',
  },
  COULD_NOT_LOGIN_USER: {
    code: 'AUTHLOGIN003',
    status: 500,
    technicalDescription: 'Could not login user to service. Please try again later.',
    type: 1,
    userMessage: 'Δεν ήταν δυνατή η σύνδεσή σας στην υπηρεσία. Παρακαλώ δοκιμάστε αργότερα.',
  },
};

const REGISTER = {
  COULD_NOT_REGISTER_USER: {
    code: 'AUTHREG001',
    status: 500,
    technicalDescription: 'Could not register user to service. Please try again later.',
    type: 1,
    userMessage: 'Δεν ήταν δυνατή η εγγραφή σας στην υπηρεσία. Παρακαλώ δοκιμάστε αργότερα.',
  },
  REGISTRATION_USERNAME_ALREADY_EXISTS: {
    code: 'USRINT001',
    status: 403,
    technicalDescription: 'User with this username is already registered with different mobile phone.',
    type: 1,
    userMessage: 'Ο χρήστης με αυτό το username είναι ήδη εγγεγραμμένος.',
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
  ...LOGIN,
  ...REGISTER,
});
