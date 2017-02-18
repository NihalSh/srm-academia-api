"use strict";
let cheerio = require('cheerio');

module.exports = function extractData(body) {
	"use strict";
	let $ = cheerio.load(body);

	let key = "";
	let regex = /([A-Za-z]+[\s]*[A-Za-z]+):/;
	let details = {};
	$('table[align="left"]').find('tr').each( function (index, element) {
			$(element).find('td').each( function (index, element) {
					if ($(element).find('strong').length) {
						if (this.key.search(this.re) != -1) {
							this.details[this.key.match(this.re)[1]] = $(element).text();
						}
						this.key = "";
					} else {
						this.key += $(element).text();
					}
				}.bind({'key': key, 're': regex, 'details': details})
			);
		}.bind({'key': key, 're': regex, 'details': details})
	);
	return details;
};
