const PHONE_REGEX = /^(\+?\d{1,2})?\d{10}$/;
const EMAIL_REGEX = /^[^@]+@[^@]+\.[^@]+$/;

module.exports = Object.freeze({
  UPDATE: {
    type: 'object',
    properties: {
      email: { type: 'string', pattern: EMAIL_REGEX.source },
      name: { type: 'string', minLength: 3 },
      surname: { type: 'string', minLength: 3 },
      phone: { type: 'string', pattern: PHONE_REGEX.source },
    },
    required: [
      'email',
      'name',
      'surname',
      'phone',
    ],
    errorMessage: {
      properties: {
        email: 'Το email που εισάγετε δεν έχει την σωστή μορφή,',
        name: 'Το Όνομα που εισάγετε δεν έχει την σωστή μορφή,',
        surname: 'Το Επίθετο που εισάγετε δεν έχει την σωστή μορφή,',
        phone: 'Το Κινητό Τηλέφωνο που εισάγετε δεν έχει την σωστή μορφή,',
      },
      required: {
        email: 'Το πεδίο Email είναι απαραίτητο για την εγγραφή σας στην υπηρεσία.',
        name: 'Το πεδίο Oνομα είναι απαραίτητο για την εγγραφή σας στην υπηρεσία.',
        surname: 'Το πεδίο Eπώνυμο είναι απαραίτητο για την εγγραφή σας στην υπηρεσία.',
        phone: 'Το πεδίο Κινητό Τηλέφωνο είναι απαραίτητο για την εγγραφή σας στην υπηρεσία.',
      },
    },
  },
});
