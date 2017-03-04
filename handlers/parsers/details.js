"use strict";
let cheerio = require('cheerio');

module.exports = function extractData(body) {
	"use strict";
	let $ = cheerio.load(body);
	if (!$('table').length) {
		return null;
	}
	let key = "";
	let regex = /([A-Za-z]+[\s]*[A-Za-z]+):/;
	let head = [];
	let content = [];
	$('table[align="left"]').find('tr').each( function (index, element) {
			$(element).find('td').each( function (index, element) {
					if ($(element).find('strong').length) {
						if (key.search(regex) != -1) {
							head.push(key.match(regex)[1]);
							content.push($(element).text());
						}
						key = "";
					} else {
						key += $(element).text();
					}
				}
			);
		}
	);
	return [head, content];
};
