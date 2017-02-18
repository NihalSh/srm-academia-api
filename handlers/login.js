"use strict";
let request = require('request');

module.exports = function(req,res){
	if(!req.body){
		res.sendStatus(404);
	}else{
		if((req.body.email) && (req.body.email !== '') && (req.body.password) && (req.body.password !== '')){
			let options = require('./requests/login.js')(req.body.email, req.body.password);
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
						req.session.jar = j.getCookieString(options.url);
						res.send('login successful');
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
	}
};
