"use strict";
let request = require('request');
const querystring = require('querystring');

let options = require('./requests/attendance.js');
let parser = require('./parsers/exam.js');

module.exports = function(req, res){
	if(req.params.id){
		options.headers['Cookie'] = `clientauthtoken=${querystring.unescape(req.params.id)}`;
		request(options, function(error, response, body){
				if(!error){
					req.log.info("exam request successful");
					let response = parser(body);
					if(response){
						req.log.info("authorized user");
						res.send(response);
					}else{
						req.log.info("unauthorized user");
						res.sendStatus(400);
					}
				}else{
					req.log.info("attendance request failed");
					req.log.error(error);
					res.send(504);
				}
			}
		);
	}else{
		req.log.info("token absent");
		res.sendStatus(404);
	}
};
