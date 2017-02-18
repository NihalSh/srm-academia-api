"use strict";
let cheerio = require('cheerio');

module.exports = function parser(body) {
	"use strict";
	let $ = cheerio.load(body);
	
	//header extraction
	let schedule = [];
	let header = [];
	let month = [];
	$('table[align="center"]').find('th').each(function(index, element){
			if((index+1)%5 !== 0){
				month.push($(element).text());
			}else{
				header.push(month);
				month = [];
			}
		}
	);
	
	for(let i = 0; i < header.length; i++){
		schedule.push([]);
		for(let j = 0, content = {}; j < header[i].length; j++, content = {}){
			content[header[i][j]] = [];
			schedule[i].push(content);
		}
	}

	$('table[align="center"]').find('tr:nth-of-type(n + 1)').each(function(outer, element){
			$(element).find('td').each(function(inner, element){
					if((inner+1)%5 !== 0){
						if(((inner+1)%5 === 1) && !($(element).text())){
							//date empty
						}else{
							schedule[ Math.floor(inner/5) ][ inner%5 ][ header [Math.floor(inner/5)] [inner%5] ].push($(element).text());
						}
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
	return [schedule, legend];
};
