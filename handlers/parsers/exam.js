"use strict"
let cheerio = require('cheerio')

module.exports = function parser(body) {
	"use strict"
	let $ = cheerio.load(body)
	if (!$('table').length) {
		return null
	}
	//Get Test Results
	let table = []
	$('table[align="center"]').last().find('tbody').first().children().filter('tr:nth-child(1)').each( function (index, element) {
			let header = []
			$(element).find('td').each( function (index, element) {
					header.push($(element).text().trim())
				}
			)
			table.push(header)
		}
	)
	let regexTest = /([A-Za-z\s\d]+)\/([\d.]+)[a-zA-Z&\s]+([\d.]+)/
		//Iterates over subjects
	$('table[align="center"]').last().find('tbody').first().children().filter('tr:nth-child(n + 2)').each( function (index, element) {
			//the function executes only once
			let test = []
			$(element).children().filter('td:nth-child(n + 1)').each( function (index, element) {
					if (index < 2) {
						test.push($(element).text().trim())
					} else if (index === 2) {
						if ($(element).find('td').length) {
							let testscores = [];
							//iterates over exams
							$(element).find('td').each( function (index, element) {
									let test = $($(element).html().replace("<br>", "&nbsp;")).text();
									if (test.search(regexTest) != -1) {
										let mat = test.match(regexTest)
										testscores.push(`${mat[1]}: ${mat[3]}/${mat[2]}`)
									}
								}
							)
							test.push(testscores)
						}
					}
				}
			)
			table.push(test)
		}
	)

	return table
}
