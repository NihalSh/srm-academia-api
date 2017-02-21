"use strict";
let request = require('request');

let options = require('./requests/schedule.js');
let parser = require('./parsers/schedule.js');

module.exports = function(req, res){
	if(req.params.id){
		req.log.info("authorized user");
		options.headers['Cookie'] = JSON.parse(decodeURIComponent(req.params.id));
		request(options, function(error, response, body){
				if(!error){
					req.log.info("schedule request successful");
					res.send(parser(body));
				}else{
					req.log.info("schedule request failed");
					req.log.error(error);
					res.send("Error fetching schedule!");
				}
			}
		);
	}else{
		req.log.info("unauthorized user");
		res.sendStatus(404);
	}
};
