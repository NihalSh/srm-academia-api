"use strict";
let cheerio = require('cheerio');

module.exports = function extractData(body) {
	"use strict";
	let $ = cheerio.load(body);
	if (!$('table').length) {
		return null;
	}
	//Get the Details
	let timetable = [['Day Order'], [], [], [], [], []];
	let regex = /(\d+:\d+)\s+-\s(\d+:\d+)/;
	$('table[align="center"]').find('tr:nth-of-type(1)').each( function (index, element) {
			$(element).find('td:nth-of-type(n + 2)').each( function (index, element) {
					let key = $(element).text();
					if (key.search(this.re) != -1) {
						timetable[0].push(key.match(this.re)[1] + " - " + key.match(this.re)[2]);
					} else {
						timetable[0].push($(element).text());						
					}
				}.bind({'re': regex})
			);
		}.bind({'re': regex})
	);
	let iter = 1;
	$('table[align="center"]').find('tr:nth-of-type(n + 4)').each( function (index, element) {
			timetable[iter].push(iter);
			$(element).find('td:nth-of-type(n + 2)').each( function (index, element) {
					timetable[iter].push($(element).text());
				}
			);
			iter++;
		}
	);
	return timetable;
};
