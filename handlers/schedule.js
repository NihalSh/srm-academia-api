"use strict";
let request = require('request');
const querystring = require('querystring');

let options = require('./requests/schedule.js');
let parser = require('./parsers/schedule.js');

module.exports = function(req, res){
	if(req.params.id){
		options.headers['Cookie'] = `clientauthtoken=${querystring.unescape(req.params.id)}`;
		request(options, function(error, response, body){
				if(!error){
					req.log.info("schedule request successful");
					let response = parser(body);
					if(response){
						req.log.info("authorized user");
						res.send(response);
					}else{
						req.log.info("unauthorized user");
						res.sendStatus(400);
					}
				}else{
					req.log.info("schedule request failed");
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
