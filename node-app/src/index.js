/* eslint-disable no-console */
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('./services/db/mongoController');
const config = require('./config/config');

// Connect to MongoDB
(async () => {
  try {
    await mongo.awaitConnection();
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    // Routes
    // eslint-disable-next-line global-require
    app.use('/api/auth', require('./api/auth'));
    // eslint-disable-next-line global-require
    app.use('/api/users', require('./api/users'));
    // eslint-disable-next-line global-require
    app.use('/api/recipes', require('./api/recipes'));
    app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}`));
  } catch (e) {
    console.error(`${e}`);
  }
})();
