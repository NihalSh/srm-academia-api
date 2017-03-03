"use strict";
let attendance = require('./handlers/attendance.js');
let courses = require('./handlers/courses.js');
let details = require('./handlers/details.js');
let login = require('./handlers/login.js');
let logout = require('./handlers/logout.js');
let schedule = require('./handlers/schedule.js');
let timetable = require('./handlers/timetable.js');

module.exports = function(app){
	app.get('/', login);
	app.get('/academic-schedule/:id', schedule);
	app.get('/attendance/:id', attendance);
	app.get('/courses/:id', courses);
	app.get('/details/:id', details);
	app.get('/logout/:id', logout);
	app.get('/timetable/:id', timetable);
};
