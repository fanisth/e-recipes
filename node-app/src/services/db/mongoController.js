/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const { MongoClient, Db } = require('mongodb');

const events = require('events');

const eventEmitter = new events.EventEmitter();

const mongoUrl = require('../../config/config').mongo;
// const helperLog = require("../helpers/log");

let _db;
let mongoClient;

MongoClient.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err, db) => {
  if (err) {
    // helperLog.log(mongoUrl + ": ", err);
    return process.exit(-1);
    // return helperLog.error(err);
  }

  // helperLog.log(`mongoController > Connection Established @ ${ mongoUrl }`);

  if (db instanceof MongoClient) {
    mongoClient = db;
    _db = db.db();
  }

  if (db instanceof Db) {
    _db = db;
    mongoClient = new MongoClient();
  }

  eventEmitter.emit('MongoClientConnected', _db);

  // _db.on('close', async () => {
  //     helperLog.log(`mongoController > Connection Closed @ ${ mongoUrl }`);
  //     eventEmitter.emit('MongoClientClosed');
  //     // return process.exit(-1);
  // });
});

const getCollectionController = (name) => (p, p1) => _db.collection(name);

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
  db: () => _db,
  mongoClient: () => mongoClient,

  // add your collection controllers
};

module.exports = mongoController;
