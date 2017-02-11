"use strict";

let bodyParser = require('body-parser');
let bunyan = require('bunyan');
let express = require('express');
let handlebars = require('express-handlebars');
let http = require('http');

let app = express();

app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');

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

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
			extended: true
		}
	)
);

require('./routes.js')(app);

app.use(function(req, res){
		res.status(404);
		res.send('404');
	}
);
app.use(function(err, req, res, next){
		console.log(err);
		res.send('500');
	}
);

http.createServer(app).listen(app.get('port'), function(){
		console.log("App listening on port " + app.get('port'));
	}
);
