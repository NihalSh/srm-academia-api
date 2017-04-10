"use strict"
const request = require('request-promise-native')
const querystring = require('querystring')

let options = require('./requests/attendance.js')
let parser = require('./parsers/attendance.js')

module.exports = function(req, res){
	if(req.params.id){
		options.headers['Cookie'] = `clientauthtoken=${querystring.unescape(req.params.id)}`
		request(options)
			.then( body => {
				req.log.info("attendance request successful")
				let response = parser(body)
				if(response){
					req.log.info("authorized user")
					res.send(response)
				}else{
					req.log.info("unauthorized user")
					res.sendStatus(400)
				}				
			})
			.catch(err => {
				req.log.info("attendance request failed")
				req.log.error(error)
				res.send(504)
			})
	}else{
		req.log.info("token absent")
		res.sendStatus(404)
	}
}