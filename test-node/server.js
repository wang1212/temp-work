'use strict';

const express = require('express'),
	body_parser   = require('body-parser'),
	session       = require('express-session');

const chalk = require('chalk');

// App
const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
/* app.use(session({
	secret: 'suntoon-design',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 1000 * 60 * 20 }
})); */


// route
app.use('/', require('./routes/index'));
app.use('/App', require('./routes/td'));


require('./db/index').connect_db().then(db_client => {
	app.listen(8080, () => console.log(chalk.blue('App listening on port 3000!')));
}).catch(err => {
	console.error(chalk.red(err.stack));
});