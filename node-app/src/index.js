/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api/auth', require('./api/auth'));
app.use('/api/users', require('./api/users'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
