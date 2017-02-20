"use strict";
let attendance = require('./handlers/attendance.js');
let courses = require('./handlers/courses.js');
let details = require('./handlers/details.js');
let login = require('./handlers/login.js');
let logout = require('./handlers/logout.js');
let schedule = require('./handlers/schedule.js');
let timetable = require('./handlers/timetable.js');

module.exports = function(app){
	app.post('/', login);
	app.post('/academic-schedule', schedule);
	app.post('/attendance', attendance);
	app.post('/courses', courses);
	app.post('/details', details);
	app.post('/logout', logout);
	app.post('/timetable', timetable);
};
