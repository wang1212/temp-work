'use strict';

const express = require('express'),
	body_parser   = require('body-parser'),
	session       = require('express-session'),
	MongoClient   = require('mongodb').MongoClient;

const assert = require('assert'),
	chalk = require('chalk'),
	_     = require('lodash');

// App
const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(session({
	secret: 'suntoon-design',
	resave: false,
	saveUninitialized: true,
	cookie: { path: '/', maxAge: 1000 * 60 * 20 }
}));

// Connection URL
const db_url = 'mongodb://localhost:27017',
	db_client = new MongoClient(db_url, {
		useNewUrlParser: true
	});


// route
app.get('/', async (req, res) => {

	res.send(`
		<h1>Hello World!</h1>
	`);

});


app.get('/is-signed', (req, res) => {

	try {

		if (req.session.user) {
			res.json({ data: req.session.user });
		} else {
			res.status(403).json({ msg: '未登录!' });
		}

	} catch (err) {
		console.log(chalk.red(err.message));
		res.status(500).send(`Error: ${err.message}`);
	}

});


app.get('/sign-in', async (req, res) => {

	const params = req.query;

	try {
		await db_client.connect();
		console.log(chalk.blue("Connected successfully to mongoDB server."));

		const db = db_client.db('app');

		const docs = await db.collection('user').find({ username: params.username }).toArray();

		console.log(docs);

		if (docs.length) {
			const _user = docs[0];

			if (String(_user.password) === params.password) {
				// save user data
				req.session.user = _user;

				res.json({ msg: '登录成功！' });
			} else {
				res.status(403).json({ msg: '密码错误！' });
			}

		} else {
			res.status(403).json({ msg: '用户不存在！' });
		}

	} catch (err) {
		console.log(chalk.red(err.message));
		res.status(500).send(`Error: ${err.message}`);
	}

	db_client.close();

});


app.get('/sign-out', (req, res) => {

	req.session.destroy(err => {
		if (err) {
			console.log(chalk.red(err.message));
			return res.status(500).send(`Error: ${err.message}`);
		}

		res.json({ msg: '登出成功！' });
	});

});

app.listen(3000, () => console.log(chalk.blue('App listening on port 3000!')))