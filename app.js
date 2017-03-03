"use strict";

let bunyan = require('bunyan');
let express = require('express');
let http = require('http');

let app = express();

app.set('port', process.env.PORT || 60000);

switch(app.get('env')){
	case 'development':
		app.use(require('express-bunyan-logger')({
			name: 'logger',
			streams: [{
				level: 'trace',
				stream: process.stdout
				}]
			}));
		break;
	case 'production':
		app.use(require('express-bunyan-logger')());
		/*add file rotation*/
		break;
}

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

require('./routes.js')(app);

app.use(function(req, res){
		res.sendStatus(404);
	}
);
app.use(function(err, req, res, next){
		req.log.error(err);
		res.sendStatus(500);
	}
);

http.createServer(app).listen(app.get('port'), function(){
		console.log("App listening on port " + app.get('port'));
	}
);
