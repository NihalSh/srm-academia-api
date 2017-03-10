"use strict";
const auth = require('basic-auth');
let request = require('request');
const querystring = require('querystring');

module.exports = function(req,res){
	let credentials = auth(req);
	if((credentials) && (credentials.name) && (credentials.name !== '') && (credentials.pass) && (credentials.pass !== '')){
		let options = require('./requests/login.js')(credentials.name, credentials.pass);
		let j = request.jar();
		options['jar'] = j;
		request(options, function(error, response, body){
			if(!error){
				let content = null;
				try {
					content = JSON.parse(body);
				} catch (exception) {
					req.log.error(exception);
					content = {};
					content.error = 'invalid json';
				}
				if("error" in content){
					req.log.info("login failed");
					res.sendStatus(400);
				}else{
					req.log.info("login successful");
					let token = null;
					for (let cookie of j.getCookies(options.url)) {
						if (cookie.hasOwnProperty('key')) {
							if (cookie.key === "clientauthtoken") {
								token = `${cookie.value}`;
							}
						}
					}
					if (token === null) {
						req.log.info("login failed");
						res.sendStatus(400);
					} else {
						res.send(querystring.escape(token));
					}
				}
			}else{
					req.log.info("login request failed");
					req.log.error(error);
					res.sendStatus(504);
			}
		}
	);
	}else{
		req.log.info("email and password undefined or empty");
		res.sendStatus(401);
	}
};
