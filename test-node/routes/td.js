'use strict';

const express = require('express'),
	router    = express.Router(),
	db_client = require('../db/index'),
	session   = require('express-session');

const assert = require('assert'),
	chalk = require('chalk'),
	_     = require('lodash');

const SUCCESSFUL_CODE = '200',
	FAIL_CODE = '403',
	NO_FILTER = ['/is-signed', '/sign-in', '/sign-out'];


router.use(session({
	secret: 'suntoon-design',
	resave: true,
	saveUninitialized: true,
	cookie: { path: '/', maxAge: 1000 * 60 * 20 }
}));


// filter
router.use((req, res, next) => {

	if (NO_FILTER.includes(req.path)) {
		next();
	} else {

		try {

			if (req.session.user) {
				next();
			} else {
				res.status(403).json({ code: FAIL_CODE, msg: '未登录!' });
			}

		} catch (err) {
			console.error(chalk.red(err.message));
			res.status(500).send(`Error: ${err.message}`);
		}

	}

});


router.get('/', (req, res) => {
	res.send(`<h1>TD App!</h1>`)
});


router.get('/is-signed', (req, res) => {

	try {

		if (req.session.user) {
			res.json({ code: SUCCESSFUL_CODE, data: req.session.user });
		} else {
			res.status(403).json({ code: FAIL_CODE, msg: '未登录!' });
		}

	} catch (err) {
		console.error(chalk.red(err.message));
		res.status(500).send(`Error: ${err.message}`);
	}

});


router.post('/sign-in', async (req, res) => {

	const params = req.body;

	try {
		await db_client.connect();
		console.log(chalk.blue("Connected successfully to mongoDB server."));

		const db = db_client.db('app');

		const docs = await db.collection('user').find({ username: params.username }).toArray();

		if (docs.length) {
			const _user = docs[0];

			if (String(_user.password) === params.password) {
				// save user data
				req.session.user = _user;

				res.json({ code: SUCCESSFUL_CODE, msg: '登录成功！', data: _user });
			} else {
				res.json({ code: FAIL_CODE, msg: '密码错误！' });
			}

		} else {
			res.json({ code: FAIL_CODE, msg: '用户不存在！' });
		}

	} catch (err) {
		console.error(chalk.red(err.message));
		res.status(500).send(`Error: ${err.message}`);
	}

	//db_client.close();

});


router.get('/sign-out', (req, res) => {

	req.session.destroy(err => {
		if (err) {
			console.error(chalk.red(err.message));
			return res.status(500).send(`Error: ${err.message}`);
		}

		res.json({ code: SUCCESSFUL_CODE, msg: '登出成功！' });
	});

});


router.get('/users', async (req, res) => {

	try {
		await db_client.connect();
		console.log(chalk.blue("Connected successfully to mongoDB server."));

		const db = db_client.db('app');

		const users = await db.collection('user').find({}).toArray();

		res.json({ code: SUCCESSFUL_CODE, data: users });

	} catch (err) {
		console.error(chalk.red(err.message));
		return res.status(500).send(`Error: ${err.message}`);
	}

	//db_client.close();

});


router.get('/designs', async (req, res) => {

	try {
		await db_client.connect();
		console.log(chalk.blue("Connected successfully to mongoDB server."));

		const db = db_client.db('app');

		const designs = await db.collection('design').find({}).toArray();

		res.json({ code: SUCCESSFUL_CODE, data: designs });

	} catch (err) {
		console.error(chalk.red(err.message));
		return res.status(500).send(`Error: ${err.message}`);
	}

	//db_client.close();
});


router.post('/designs', async (req, res) => {

	try {
		await db_client.connect();
		console.log(chalk.blue("Connected successfully to mongoDB server."));

		const db = db_client.db('app');

		const r = await db.collection('design').insertOne({});

		if (r.insertedCount === 1) {
			res.json({ code: SUCCESSFUL_CODE, msg: '上传成功！' });
		} else {
			res.json({ code: FAIL_CODE, msg: '上传失败！' });
		}

	} catch (err) {
		console.error(chalk.red(err.message));
		return res.status(500).send(`Error: ${err.message}`);
	}

	//db_client.close();
});


router.get('*', (req, res) => {
	res.redirect(`${req.baseUrl}/`);
});


module.exports = router;
