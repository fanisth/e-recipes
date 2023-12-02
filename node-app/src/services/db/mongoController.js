/* eslint-disable no-console */
// const { MongoClient, Db } = require('mongodb');
const events = require('events');
const mongoose = require('mongoose');

const eventEmitter = new events.EventEmitter();

const config = require('../../config/config');
// const helperLog = require('../helpers/log');

let db;

// Connect to MongoDB using Mongoose
mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true });

const dbConnection = mongoose.connection;

// Event handler when the Mongoose connection is successfully established
dbConnection.on('connected', () => {
  // helperLog.log(`mongoController > Connection Established @ ${config.mongo}`);
  db = dbConnection.db;
  eventEmitter.emit('MongoClientConnected', db);
});

// Event handler for connection errors
dbConnection.on('error', (err) => {
  console.log(err);
});

// Event handler when the Mongoose connection is closed
dbConnection.on('disconnected', () => {
  // helperLog.log('mongoController > Connection Closed');
  // You might want to handle this event if needed
  // eventEmitter.emit('MongoClientClosed');
});

const getCollectionController = (name) => () => db.collection(name);

const connectPromise = new Promise((res) => {
  eventEmitter.on('MongoClientConnected', () => {
    res();
  });
});

const awaitConnection = () => connectPromise;

const mongoController = {
  awaitConnection,
  eventEmitter,
  getCollectionController,
  db: () => db,
};

module.exports = mongoController;
