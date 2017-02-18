"use strict";
let cheerio = require('cheerio');

module.exports = function extractData(body) {
	"use strict";
	let $ = cheerio.load(body);

	let subjects = [];
	let properties = {};
	$('table[align="center"]').first().find('tr').first().find('td').each( function (index, element) {
			properties[index] = $(element).text();
		}
	);
	$('table[align="center"]').first().find('tr:nth-child(n + 2)').each( function (index, element) {
			let subject = {};
			$(element).find('td').each( function (index, element) {
					subject[properties[index]] = $(element).text();
				}
			);
			subjects.push(subject);
		}
	);
	return subjects;
};
