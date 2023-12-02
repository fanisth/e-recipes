const PHONE_REGEX = /^(\+?\d{1,2})?\d{10}$/;
const EMAIL_REGEX = /^[^@]+@[^@]+\.[^@]+$/;

module.exports = Object.freeze({
  LOGIN: {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 3 },
      password: { type: 'string', minLength: 6 },
    },
    required: [
      'username',
      'password',
    ],
    errorMessage: {
      properties: {
        username: 'Το username που εισάγετε δεν έχει την σωστή μορφή,',
        password: 'Ο Κωδικός που εισάγετε δεν έχει την σωστή μορφή,',
      },
      required: {
        username: 'Το πεδίο Όνομα Χρήστη είναι απαραίτητο για την είσοδο σας στην υπηρεσία.',
        password: 'Το πεδίο Κωδικός είναι απαραίτητο για την είσοδο σας στην υπηρεσία.',
      },
    },
  },
  REGISTER: {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 3 },
      email: { type: 'string', pattern: EMAIL_REGEX.source },
      name: { type: 'string', minLength: 3 },
      surname: { type: 'string', minLength: 3 },
      phone: { type: 'string', pattern: PHONE_REGEX.source },
      password: { type: 'string', minLength: 6 },
    },
    required: [
      'username',
      'email',
      'name',
      'surname',
      'phone',
      'password',
    ],
    errorMessage: {
      properties: {
        username: 'Το username που εισάγετε δεν έχει την σωστή μορφή,',
        email: 'Το email που εισάγετε δεν έχει την σωστή μορφή,',
        name: 'Το Όνομα που εισάγετε δεν έχει την σωστή μορφή,',
        surname: 'Το Επίθετο που εισάγετε δεν έχει την σωστή μορφή,',
        phone: 'Το Κινητό Τηλέφωνο που εισάγετε δεν έχει την σωστή μορφή,',
        password: 'Ο Κωδικός που εισάγετε δεν έχει την σωστή μορφή,',
      },
      required: {
        username: 'Το πεδίο Όνομα Χρήστη είναι απαραίτητο για την εγγραφή σας στην υπηρεσία.',
        email: 'Το πεδίο Email είναι απαραίτητο για την εγγραφή σας στην υπηρεσία.',
        name: 'Το πεδίο Oνομα είναι απαραίτητο για την εγγραφή σας στην υπηρεσία.',
        surname: 'Το πεδίο Eπώνυμο είναι απαραίτητο για την εγγραφή σας στην υπηρεσία.',
        phone: 'Το πεδίο Κινητό Τηλέφωνο είναι απαραίτητο για την εγγραφή σας στην υπηρεσία.',
        password: 'Το πεδίο Κωδικός είναι απαραίτητο για την εγγραφή σας στην υπηρεσία.',
      },
    },
  },
});
