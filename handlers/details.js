"use strict";
let request = require('request');
const querystring = require('querystring');

let options = require('./requests/course-confirmation-report.js');
let parser = require('./parsers/details.js');

module.exports = function(req, res){
	if(req.params.id){
		req.log.info("authorized user");
		options.headers['Cookie'] = querystring.unescape(req.params.id);
		request(options, function(error, response, body){
				if(!error){
					req.log.info("details request successful");
					console.log(body);
					let response = parser(body);
					if(response){
						res.send(response);
					}else{
						res.sendStatus(401);
					}
				}else{
					req.log.info("details request failed");
					req.log.error(error);
					res.send("Error fetching details!");
				}
			}
		);
	}else{
		req.log.info("unauthorized user");
		res.sendStatus(404);
	}
};
