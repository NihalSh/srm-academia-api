"use strict";
let request = require('request');

let options = require('./requests/attendance.js');
let parser = require('./parsers/attendance.js');

module.exports = function(req, res){
	if(req.params.id){
		req.log.info("authorized user");
		options.headers['Cookie'] = JSON.parse(decodeURIComponent(req.params.id));
		request(options, function(error, response, body){
				if(!error){
					req.log.info("attendance request successful");
					res.send(parser(body));
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
