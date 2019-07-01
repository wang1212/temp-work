'use strict';

const MongoClient = require('mongodb').MongoClient;

const db_url = 'mongodb://127.0.0.1:27017',
	db_client = new MongoClient(db_url, {
		useNewUrlParser: true,
		poolSize: 10,
	});


module.exports = db_client;