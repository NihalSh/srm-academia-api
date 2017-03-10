"use strict";
let request = require('request');
const querystring = require('querystring');

let options = require('./requests/logout.js');

module.exports = function(req,res){
	if(req.params.id){
		options.headers['Cookie'] = `clientauthtoken=${querystring.unescape(req.params.id)}`;
		request(options, function(error, response, body){
				if(!error){
					req.log.info("logout successful");
					res.sendStatus(200);
				}else{
					req.log.info("logout failed");
					req.log.error(error);
					res.sendStatus(504);
				}
			}
		);
	}else{
		req.log.info("token absent");
		res.sendStatus(404);	
	}
};
