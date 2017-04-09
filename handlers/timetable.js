"use strict";
let cheerio = require('cheerio');
let request = require('request');
const querystring = require('querystring');

let parserCourses = require('./parsers/course-confirmation.js');
let parserDetails = require('./parsers/details.js');
let parserTimetable = require('./parsers/timetable.js');

let details = null;
let courses = null;
let timetable = null;

module.exports = function(req, res){
	if(req.params.id){
		let promise = new Promise(function(resolve, reject){
				let options = require('./requests/course-confirmation-report.js');
				options.headers['Cookie'] = `clientauthtoken=${querystring.unescape(req.params.id)}`;
				request(options, function(error, response, body) {
						if(!error){
							req.log.info("course request successful");
							courses = parserCourses(body);
							details = parserDetails(body);
							if(details){
								req.log.info("authorized user");
								resolve(details);
							}else{
								let optionsSecondYear = require('./requests/course-confirmation-report-second-year.js');
								optionsSecondYear.headers['Cookie'] = `clientauthtoken=${querystring.unescape(req.params.id)}`;
								request(optionsSecondYear, function(error, response, body){
										if(!error){
											req.log.info("course request successful");
											courses = parserCourses(body);
											details = parserDetails(body);
											if(details){
												req.log.info("authorized user");
												resolve(details);
											}else{
												reject("unauthorized user");
											}
										}else{
											req.log.info("details request failed");
											reject(error);
										}
									}
								);
							}
						}else{
							req.log.info("course request failed");
							reject(error);
						}
					}
				);
			}
		);
		
		promise.then(
			function(details){
				let options = null;
				if (Array.isArray(details) && (details[0].length > 0) && (details[1].length > 0)) {
					let batch = null;
					let index = details[0].indexOf("Batch");
					if (index !== -1 ) {
						batch = details[1][index];
						if (batch.startsWith("1")){
							options = require('./requests/timetable-batch1.js');
						} else if (batch.startsWith("2")){
							options = require('./requests/timetable-batch2.js');
						} else {
							req.log.info("student batch determination failed");
							throw new Error("student batch determination failed");
						}
					} else {
						req.log.info("student batch determination failed");
						throw new Error("student batch determination failed");
					}

				} else {
					req.log.info("student batch determination failed");
					throw new Error("student batch determination failed");
				}

				return new Promise(function(resolve, reject){
						options.headers['Cookie'] = `clientauthtoken=${querystring.unescape(req.params.id)}`;
						request(options, function(error, response, body) {
								if(!error) {
									req.log.info("timetable request successful");
									timetable = parserTimetable(body);
									resolve(true);
								} else {
									req.log.info("timetable request failed");
									reject(error);
								}
							}
						);
					}
				);
			}
		).then(
			function(success){
				//generate map from slots to data
				const titleIndex = courses[0].indexOf('Course Title');
				const venueIndex = courses[0].indexOf('Venue');
				const slotIndex = courses[0].indexOf('Slot');
				let map = {};
				for (let i = 1; i < courses.length; i++){
					map[courses[i][slotIndex]] = toTitleCase(courses[i][titleIndex]) + ((courses[i][venueIndex])?(" - " + courses[i][venueIndex]):(""));
				}
				//to replace slots with actual data
				for (let i = 1; i < timetable.length; i++){
					for(let j = 0; j < timetable[i].length; j++){
						if (timetable[i][j] in map) {
							timetable[i][j] = map[timetable[i][j]];
						}
					}
				}
				res.send(timetable);
			}
		).catch(
			function(error){
				req.log.error(error);
				res.sendStatus(504);
			}
		);
	}else{
		req.log.info("token absent");
		res.sendStatus(404);
	}
};

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
