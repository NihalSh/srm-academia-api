"use strict";
let login = require('./handlers/login.js');
let schedule = require('./handlers/schedule.js');
let attendance = require('./handlers/attendance.js');
let courses = require('./handlers/courses.js');
let details = require('./handlers/details.js');
let timetable = require('./handlers/timetable.js');

module.exports = function(app){
	app.get('/', login.get);
	app.post('/', login.post);
	app.get('/academic-schedule', schedule);
	app.get('/attendance', attendance);
	app.get('/courses', courses);
	app.get('/details', details);
	app.get('/timetable', timetable);
};
