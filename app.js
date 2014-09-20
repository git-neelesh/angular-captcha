/*Special thanx https://github.com/mirhampt/node-recaptcha*/
/*Special thanx https://github.com/mllrsohn/angular-re-captcha*/

var Recaptcha = require('./recaptcha').Recaptcha;
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	users = {};
var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded());	
	server.listen(8080);

var PUBLIC_KEY = '',/*Public key*/
	PRIVATE_KEY = '';/*Private key*/


	console.log('Server running at http://127.0.0.1:8080/');

	app.post('/check', function(req, res){
	
	
		var data = {
				remoteip: req.connection.remoteAddress,
				challenge: req.body.challenge,
				response: req.body.response
			};
	
		var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY, data);
		recaptcha.verify(function(success, error_code) {
		if (success) {
			res.send('valid');
			/*Do something  here db manipulation, anything*/
		}
		else {
				res.send('Recaptcha response invalid valid.' + error_code);
			} 
		})
		
	});


app.get('/', function(req, res){
	res.sendfile(__dirname + '/example/example.html');
});
