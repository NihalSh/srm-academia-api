"use strict";
const auth = require('basic-auth');
let request = require('request');
const querystring = require('querystring');

module.exports = function(req,res){
	let credentials = auth(req);

	console.log(auth(req));
	if((credentials.name) && (credentials.name !== '') && (credentials.pass) && (credentials.pass !== '')){
		let options = require('./requests/login.js')(credentials.name, credentials.pass);
		let j = request.jar();
		options['jar'] = j;
		request(options, function(error, response, body){
			if(!error){
				let content = JSON.parse(body);
				if("error" in content){
					req.log.info("login failed");
					res.send('login failed');
				}else{
					req.log.info("login successful");
					res.send(querystring.escape(j.getCookieString(options.url)));
				}
			}else{
					req.log.info("login request failed");
					req.log.error(error);
			}
		}
	);
	}else{
		req.log.info("email and password undefined or empty");
		res.send('login credentials not provided');
	}
};
