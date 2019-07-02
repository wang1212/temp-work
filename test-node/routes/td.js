/*! TD router */

'use strict';

const assert = require('assert'),
	chalk    = require('chalk'),
	_        = require('lodash'),
	ObjectId = require('mongodb').ObjectId;

const express = require('express'),
	router  = express.Router(),
	session = require('express-session');

const db_util = require('../db/index'),
	user_model   = require('../models/user'),
	design_model = require('../models/design');

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
		const db = db_util.db_client.db('app');
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
		const db = db_util.db_client.db('app');
		let users = [req.session.user];

		if (req.session.user.auth == 'admin') {
			users = await db.collection('user').find({ active: true }).toArray();
		}

		res.json({ code: SUCCESSFUL_CODE, data: users });

	} catch (err) {
		console.error(chalk.red(err.message));
		return res.status(500).send(`Error: ${err.message}`);
	}

});


router.post('/users', async (req, res) => {

	const params = req.body;

	try {
		const db = db_util.db_client.db('app');

		if (req.session.user.auth === 'admin') {
			let r;
			// find
			r = await db.collection('user').find({ username: params.username }).toArray();

			// exist
			if (r.length) {
				res.json({ code: FAIL_CODE, msg: '失败，用户名已被占用！' });
			} else {
				// CREATE
				r = await db.collection('user').insertOne({
					...user_model,
					...params,
					active: true,
				});

				if (r.insertedCount === 1) {
					res.json({ code: SUCCESSFUL_CODE, msg: '添加用户成功！' });
				} else {
					res.json({ code: FAIL_CODE, msg: '添加用户失败！' });
				}
			}

		} else {
			res.json({ code: FAIL_CODE, msg: '没有权限！' });
		}

	} catch (err) {
		console.error(chalk.red(err.message));
		return res.status(500).send(`Error: ${err.message}`);
	}

});


router.delete('/users', async (req, res) => {

	const params = req.query;

	try {
		const db = db_util.db_client.db('app');

		if (req.session.user.auth === 'admin') {
			// DELETE
			const r = await db.collection('user').deleteMany({ _id: { $in: params.id.map(id => ObjectId(id)) } });

			if (r.deletedCount === params.id.length) {
				res.json({ code: SUCCESSFUL_CODE, msg: '删除成功！' });
			} else {
				res.json({ code: FAIL_CODE, msg: '删除失败！' });
			}
		} else {
			res.json({ code: FAIL_CODE, msg: '没有权限！' });
		}

	} catch (err) {
		console.error(chalk.red(err.message));
		return res.status(500).send(`Error: ${err.message}`);
	}

});


router.get('/designs', async (req, res) => {

	try {
		const db = db_util.db_client.db('app');
		let designs;

		if (req.session.user.auth === 'admin') {
			designs = await db.collection('design').find({}).toArray();
		} else {
			designs = await db.collection('design').find({ upload_user_id: req.session.user._id }).toArray();
		}

		res.json({ code: SUCCESSFUL_CODE, data: designs });

	} catch (err) {
		console.error(chalk.red(err.message));
		return res.status(500).send(`Error: ${err.message}`);
	}

});


router.post('/designs/:uid', async (req, res) => {

	const uid = req.params.uid;
	const params = req.body;

	try {
		const db = db_util.db_client.db('app');
		let r;
		// find
		r = await db.collection('design').find({ uid }).toArray();

		// exist
		if (r.length) {
			// UPDATE
			r = await db.collection('design').updateOne({ uid }, {
				$set: {
					...params,
					update_time: Date.now()
				}
			});

			if (r.modifiedCount === 1) {
				res.json({ code: SUCCESSFUL_CODE, msg: '同步成功！' });
			} else {
				res.json({ code: FAIL_CODE, msg: '同步失败！' });
			}

		} else {
			// CREATE
			r = await db.collection('design').insertOne({
				...design_model,
				...params,
				upload_user_id: req.session.user._id,
				create_time: Date.now(),
				update_time: Date.now()
			});

			if (r.insertedCount === 1) {
				res.json({ code: SUCCESSFUL_CODE, msg: '上传成功！' });
			} else {
				res.json({ code: FAIL_CODE, msg: '上传失败！' });
			}
		}

	} catch (err) {
		console.error(chalk.red(err.message));
		return res.status(500).send(`Error: ${err.message}`);
	}

});


router.delete('/designs', async (req, res) => {

	const params = req.query;

	try {
		const db = db_util.db_client.db('app');

		// DELETE
		const r = await db.collection('design').deleteMany({ uid: { $in: params.uid }, upload_user_id: req.session.user._id });

		if (r.deletedCount === params.uid.length) {
			res.json({ code: SUCCESSFUL_CODE, msg: '删除成功！' });
		} else {
			res.json({ code: FAIL_CODE, msg: '删除失败！' });
		}

	} catch (err) {
		console.error(chalk.red(err.message));
		return res.status(500).send(`Error: ${err.message}`);
	}

});


router.get('*', (req, res) => {
	res.redirect(`${req.baseUrl}/`);
});


module.exports = router;
