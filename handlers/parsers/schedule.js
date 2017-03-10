"use strict";
let cheerio = require('cheerio');

module.exports = function parser(body) {
	"use strict";
	let $ = cheerio.load(body);
	if (!$('table').length) {
		return null;
	}	
	//header extraction
	let header = [];
	$('table[align="center"]').find('th').each(function(index, element){
			if(index < 4){
				header.push($(element).text());
			}
		}
	);

	let regex = /([A-Za-z]+)\s+'([0-9]+)/;
	let MONTHS = {'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11};
	let months = [];
	let years = [];
	let content = [];
	$('table[align="center"]').find('th:nth-of-type(5n + 3)').each(function(index, element){
				let test = $(element).text();
				if (test.search(regex) != -1) {
					let mat = test.match(regex)
					years.push(parseInt("20" + mat[2]));
					months.push(MONTHS[mat[1]]);
					//content.push([]);
				}
		}
	);
	let DO = null;
	let event = null;
	let y = null;
	regex = /[0-9]/;
	content.push(["Date", "Event", "Day Order"]);
	$('table[align="center"]').find('tr:nth-of-type(n + 1)').each(function(outer, element){
			$(element).find('td:nth-of-type(5n + 1)').each(function(inner, element){
					if($(element).text()){
						if($(element).next().next().text()){
							event = $(element).next().next().text()
						}else{
							event = null
						}
						
						let test = $(element).next().next().next().text();
						if (test.search(regex) != -1) {
							DO = parseInt(test);
						}else{
							DO = null
						}
						content.push([(new Date(years[inner], months[inner], parseInt($(element).text()))).toDateString(), event, DO]);
					}
				}
			);
		}
	);
	
	//legend extraction process
	let legend = {};
	let key = null;
	$('table[align="left"]').find('td').each(function(index, element){
			if(index%2 === 0){
				key = $(element).text().slice(0, -1);
			}else{
				if(key){
					legend[key] = $(element).text();
					key = null;
				}
			}
		}
	);
	content.unshift(legend);
	return content;
};
