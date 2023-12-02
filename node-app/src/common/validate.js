const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, coerceTypes: true, format: 'full' });
require('ajv-errors')(ajv);

function getValidationErrorResponseObject(validationErrors) {
  const userMessage = validationErrors.reduce((accumulator, error) => {
    const { message } = error;
    if (error.keyword === 'errorMessage') {
      const errorMessage = message;
      return accumulator ? `${accumulator}, ${errorMessage}` : errorMessage;
    }
    return accumulator;
  }, '');
  return {
    type: 1,
    code: 'AJVERR',
    status: 422,
    userMessage,
    technicalDescription: userMessage,
  };
}

/**
 * Validates an object using ajv
 * @param {Object} object the Object that we want to validate using ajv
 * @param {Object} schema the ajv schema we want to use for the validation
 * @param {Response} res the response object
 */
function validate(object, schema) {
  const validation = ajv.compile(schema);

  if (!validation(object)) {
    return getValidationErrorResponseObject(validation.errors);
  }
  return undefined;
}

module.exports = validate;
