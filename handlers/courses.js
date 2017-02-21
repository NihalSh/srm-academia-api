"use strict";
let request = require('request');
const querystring = require('querystring');

let options = require('./requests/course-confirmation-report.js');
let parser = require('./parsers/course-confirmation.js');

module.exports = function(req, res){
	if(req.params.id){
		req.log.info("authorized user");
		options.headers['Cookie'] = querystring.unescape(req.params.id);
		request(options, function(error, response, body){
				if(!error){
					req.log.info("course request successful");
					res.send(parser(body));
				}else{
					req.log.info("course request failed");
					req.log.error(error);
					res.send("Error fetching report!");
				}
			}
		);
	}else{
		req.log.info("unauthorized user");
		res.sendStatus(404);
	}
};
