/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const path = require('path');
const winston = require('winston');

const { format } = winston;

const PROJECT_ROOT = path.join(__dirname, '..');

/**
 * Parses and returns info about the call stack at the given index.
 */
function _getCallerFile(stackIndex) {
  const stacklist = new Error().stack.split('\n').slice(3);

  const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
  const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

  const s = stacklist[stackIndex] || stacklist[0];
  const sp = stackReg.exec(s) || stackReg2.exec(s);

  if (sp && sp.length === 5) {
    return path.relative(PROJECT_ROOT, sp[2]);
  }
}

/**
 * Omits non-needed values when logging errors
 */
function logErrors({ level, message, stack }) {
  return ({ level, message, stack });
}

/**
 * Replaces the data run on the logged object
 * @param {string} key The key of the object we want to log
 * @param {any} value The value of the object we want to log
 */
function replacer(key, value) {
  return value instanceof Error ? logErrors(value) : value;
}

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
    timestamp: true,
    silent: process.env.NODE_ENV === 'test',
  },
};

function createLogger() {
  const logger = winston.createLogger({
    format: format.combine(
      format.json({ replacer }),
    ),
    transports: [new winston.transports.Console(options.console)],
    exitOnError: false, // do not exit on handled exceptions
  });

  logger.stream = {
    write(message) {
      logger.info(message);
    },
  };

  return logger.child({ file: _getCallerFile() });
}

module.exports = createLogger;
