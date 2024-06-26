module.exports = Object.freeze({
  RECIPE: {
    type: 'object',
    properties: {
      title: { type: 'string', minLength: 3 },
      description: { type: 'string', minLength: 15 },
      instructions: { type: 'array', items: { type: 'object' } },
      ingredients: { type: 'array', items: { type: 'string' } },
      equipment: { type: 'array', items: { type: 'string' } },
      tags: { type: 'array', items: { type: 'string' } },
      categories: { type: 'array', items: { type: 'string' } },
      preperation_time: { type: 'number' },
      cooking_time: { type: 'number' },
      difficulty: { enum: ['easy', 'medium', 'hard'] },
    },
    required: [
      'title',
      'instructions',
      'ingredients',
      'equipment',
      'tags',
      'description',
      'categories',
      'preperation_time',
      'cooking_time',
      'difficulty',
    ],
    errorMessage: {
      properties: {
        title: 'Ο τίτλος που εισάγετε δεν έχει την σωστή μορφή,',
        instructions: 'Οι οδηγίες που εισάγετε δεν έχει την σωστή μορφή,',
        ingredients: 'Τα υλικά που εισάγετε δεν έχει την σωστή μορφή,',
        equipment: 'Ο εξοπλισμός που εισάγετε δεν έχει την σωστή μορφή,',
        tags: 'Οι λέξεις κλειδιά που εισάγετε δεν έχει την σωστή μορφή,',
        description: 'Η περιγραφή που εισάγετε δεν έχει την σωστή μορφή,',
        categories: 'Οι κατηγορίες που εισάγετε δεν έχει την σωστή μορφή,',
        preperation_time: 'Ο χρόνος προετοιμασίας που εισάγετε δεν έχει την σωστή μορφή,',
        cooking_time: 'Ο χρόνος μαγειρέματος που εισάγετε δεν έχει την σωστή μορφή,',
        difficulty: 'Η δυσκολία που εισάγετε δεν έχει την σωστή μορφή,',
      },
      required: {
        title: 'Το πεδίο Tίτλος είναι απαραίτητο για την δημιουργία της συνταγής.',
        instructions: 'Το πεδίο Oδηγίες είναι απαραίτητο για την δημιουργία της συνταγής.',
        ingredients: 'Το πεδίο Yλικά είναι απαραίτητο για την δημιουργία της συνταγής.',
        tags: 'Το πεδίο Λέξεις Κλειδιά είναι απαραίτητο για την δημιουργία της συνταγής.',
        description: 'Το πεδίο Περιγραφή είναι απαραίτητο για την δημιουργία της συνταγής.',
        categories: 'Το πεδίο Κατηγορίες είναι απαραίτητο για την δημιουργία της συνταγής.',
        preperation_time: 'Το πεδίο Χρόνος Προετοιμασίας είναι απαραίτητο για την δημιουργία της συνταγής.',
        cooking_time: 'Το πεδίο Χρόνος Μαγειρέματος είναι απαραίτητο για την δημιουργία της συνταγής.',
        difficulty: 'Το πεδίο Δυσκολία είναι απαραίτητο για την δημιουργία της συνταγής.',
      },
    },
  },
});
