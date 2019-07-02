/*! db util */

'use strict';

const chalk = require('chalk');

const MongoClient = require('mongodb').MongoClient;

const db_url = 'mongodb://127.0.0.1:27017';

let db_client = null;


function connect_db () {
	return new Promise((resolve, reject) => {
		MongoClient.connect(db_url, {
			useNewUrlParser: true,
			poolSize: 10,
		}, (err, client) => {
			if (err) {
				throw err;
			}
			console.log(chalk.blue('Connected successfully to mongoDB server.'));

			module.exports.db_client = client;
			resolve(client);
		});
	});
}


module.exports = {
	connect_db,
	db_client,
};