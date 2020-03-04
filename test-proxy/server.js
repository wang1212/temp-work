
const app = require('express')(),
	request = require('request');


app.get('/*', (req, res) => {



	request
		.get(req/* 'http://kh.google.com' + req.url */)
		.on('response', response => {
			//console.log(response)
		})

});


app.listen(3000, () => console.log('app run port 3000 ...'))