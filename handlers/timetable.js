"use strict";
let cheerio = require('cheerio');
let request = require('request');

let parserCourses = require('./parsers/course-confirmation.js');
let parserDetails = require('./parsers/details.js');
let parserTimetable = require('./parsers/timetable.js');

let details = null;
let courses = null;
let timetable = null;

module.exports = function(req, res){
	if(req.body && req.body.token){
		let promise = new Promise(function(resolve, reject){
				let options = require('./requests/course-confirmation-report.js');
				options.headers['Cookie'] = JSON.parse(req.body.token);
				request(options, function(error, response, body) {
						if(!error){
							req.log.info("course request successful");
							courses = parserCourses(body);
							details = parserDetails(body);
							resolve(details);
						}else{
							req.log.info("course request failed");
							req.log.error(error);
							reject(error);
						}
					}
				);
			}
		);
		
		promise.then(
			function(details){
				let options = null;
				if (details && (details["Batch"])) {
					req.log.info("student batch determined");
					if (["Batch"] === "1") {
						options = require('./requests/timetable-batch1.js');
					} else {
						options = require('./requests/timetable-batch2.js');
					}
				} else {
					req.log.info("student batch determination failed");
					return null;
				}

				return new Promise(function(resolve, reject){
						options.headers['Cookie'] = JSON.parse(req.body.token);
						request(options, function(error, response, body) {
								if(!error) {
									req.log.info("timetable request successful");
									timetable = parserTimetable(body);
									resolve(true);
								} else {
									req.log.info("timetable request failed");
									req.log.error(error);
									reject(error);
								}
							}
						);
					}
				);
			}
		).catch(
			function(error){
				res.send("course request failed");
			}
		).then(
			function(success){
				//generate map from slots to data
				let map = {};
				for (let i = 0; i < courses.length; i++){
					map[courses[i].Slot] = toTitleCase(courses[i]['Course Title']) + (('Venue' in courses[i])?(" - " + courses[i]['Venue']):(""));
				}
				//to replace slots with actual data
				let tableRender = [];
				for (let i = 1; i < timetable.length; i++){
					let dayorder = [];
					for(let j = 0; j < timetable[i].length; j++){
						if (timetable[i][j] in map) {
							timetable[i][j] = map[timetable[i][j]];
						}
						let val = {};
						val[timetable[0][j]] = timetable[i][j];
						dayorder.push(val);
					}
					tableRender.push(dayorder);
				}
				res.send({head: timetable[0], body: tableRender});
			}
		).catch(
			function(error){
				req.log.error(error);
				res.send("timetable request failed");
			}
		);
	}else{
		req.log.info("unauthorized user");
		res.sendStatus(404);
	}
};

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
