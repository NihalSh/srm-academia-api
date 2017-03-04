"use strict";
let cheerio = require('cheerio');

module.exports = function extractData(body) {
	"use strict";
	let $ = cheerio.load(body);
	if (!$('table').length) {
		return null;
	}
	let subjects = [];
	let head = [];
	$('table[align="center"]').first().find('tr').first().find('td').each( function (index, element) {
			head.push($(element).text());
		}
	);
	subjects.push(head);
	$('table[align="center"]').first().find('tr:nth-child(n + 2)').each( function (index, element) {
			let subject = [];
			$(element).find('td').each( function (index, element) {
					subject.push($(element).text());
				}
			);
			subjects.push(subject);
		}
	);
	return subjects;
};
