"use strict";
let cheerio = require('cheerio');

module.exports = function parser(body) {
	"use strict";
	let $ = cheerio.load(body);
	if (!$('table').length) {
		return null;
	}
	//Get Subject Details
	let subjects = [];
	let head = [];
	$('table[border="1"]').first().find('tr').first().find('td').each( function (index, element) {
			head.push($(element).text());
		}
	);
	subjects.push(head);
	let subject = []
	$('table[border="1"]').first().find('tr:nth-child(n + 2)').each( function (index, element) {
			let subject = []
			$(element).find('td').each( function (index, element) {
					subject.push($(element).text());
				}
			);
			subjects.push(subject);
		}
	);
	
	//Get Test Results
	/*
	let regexTest = /([A-Za-z\s\d]+)\/([\d.]+)[a-zA-Z&\s]+([\d.]+)/;
		//Iterates over subjects
	$('table[align="center"]').last().find('tbody').first().children().filter('tr:nth-child(n + 2)').each( function (index, element) {
			//the function executes only once
			$(element).children().filter('td:nth-child(3)').each( function (index, element) {
					if ($(element).find('td').length) {
						let testscores = [];
						//iterates over exams
						$(element).find('td').each( function (index, element) {
								let test = $(element).text();
								if (test.search(regexTest) != -1) {
									let mat = test.match(regexTest)
									let obj = {};
									obj[mat[1]] = {};
									obj[mat[1]]['max'] = mat[2];
									obj[mat[1]]['total'] = mat[3];
									testscores.push(obj);
								}
							}
						);
						let subject;
						let searchkey = $(element).parent().parent().children('tr:nth-child(1)').find('td:nth-child(1)').text();
						let insertkey = $(element).parent().parent().children('tr:nth-child(1)').find('td:nth-child(3)').text();
						for ( subject in subjects) {
							if (subjects[subject][searchkey] === $(element).parent().children().filter('td:nth-child(1)').text()) {
								subjects[subject][insertkey] = testscores;
							}
						}
					}
				}
			);
		}
	);
	*/
	return subjects;
};
