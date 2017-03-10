"use strict";
let request = require('request');
const querystring = require('querystring');

let options = require('./requests/attendance.js');
let parser = require('./parsers/attendance.js');

module.exports = function(req, res){
	if(req.params.id){
		req.log.info("authorized user");
		options.headers['Cookie'] = `clientauthtoken=${querystring.unescape(req.params.id)}`;
		request(options, function(error, response, body){
				if(!error){
					req.log.info("attendance request successful");
					let response = parser(body);
					if(response){
						res.send(response);
					}else{
						res.sendStatus(401);
					}
				}else{
					req.log.info("attendance request failed");
					req.log.error(error);
					res.send("Error fetching attendance!");
				}
			}
		);
	}else{
		req.log.info("unauthorized user");
		res.sendStatus(404);
	}
};
