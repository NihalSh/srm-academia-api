"use strict";
let request = require('request');
const querystring = require('querystring');

let options = require('./requests/schedule.js');
let parser = require('./parsers/schedule.js');

module.exports = function(req, res){
	if(req.params.id){
		req.log.info("authorized user");
		options.headers['Cookie'] = querystring.unescape(req.params.id);
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
