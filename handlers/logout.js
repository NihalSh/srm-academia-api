"use strict";
let request = require('request');

let options = require('./requests/logout.js');

module.exports = function(req,res){
	if(req.session.jar){
		req.session.jar = null;
		options.headers['Cookie'] = req.session.jar;
		request(options, function(error, response, body){
				if(!error){
					req.log.info("logout successful");
					res.send('logout successful');
				}else{
					req.log.info("logout failed");
					req.log.error(error);
					res.send('logout failed');
				}
			}
		);
	}else{
		req.log.info("unauthorized user");
		res.sendStatus(404);	
	}
};
