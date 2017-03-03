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
	app.post('/', (req, res) =>
		{
			res.sendStatus(405);
		}
	);
	app.get('/academic-schedule/:id', schedule);
	app.post('/academic-schedule/:id', (req, res) =>
		{
			res.sendStatus(405);
		}
	);
	app.get('/attendance/:id', attendance);
	app.post('/attendance/:id', (req, res) =>
		{
			res.sendStatus(405);
		}
	);
	app.get('/courses/:id', courses);
	app.post('/courses/:id', (req, res) =>
		{
			res.sendStatus(405);
		}
	);
	app.get('/details/:id', details);
	app.post('/details/:id', (req, res) =>
		{
			res.sendStatus(405);
		}
	);
	app.get('/logout/:id', logout);
	app.post('/details/:id', (req, res) =>
		{
			res.sendStatus(405);
		}
	);
	app.get('/timetable/:id', timetable);
	app.post('/details/:id', (req, res) =>
		{
			res.sendStatus(405);
		}
	);
};
