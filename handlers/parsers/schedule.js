let cheerio = require('cheerio');

module.exports = function parser(body) {
	"use strict"
	let $ = cheerio.load(body);
	
	//header extraction
	let schedule = [];
	let month = [];
	$('table[align="center"]').find('th').each(function(index, element){
			if((index+1)%5 !== 0){
				let content = {};
				content[$(element).text()] = [];
				month.push(content);
			}else{
				schedule.push(month);
				month = [];
			}
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
	return [schedule, legend];
};
