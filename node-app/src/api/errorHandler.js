/* eslint-disable prefer-object-spread */
const moment = require('moment-timezone');
const logger = require('../common/logger')();

async function send(req, res, _error, extraParams = undefined) {
  logger.info('Returning Error', { error: _error, extraParams });
  const timestamp = moment().unix();
  const error = Object.assign({}, _error, { params: extraParams, timestamp });
  return res.status(_error.status).json({ error });
}

module.exports = { send };
