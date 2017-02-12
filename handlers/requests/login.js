module.exports = function(email, password){
	return {
		url: 'https://academia.srmuniv.ac.in/accounts/signin.ac',
		method: "POST",
		form: {
			  username: email,
			  password: password,
			  client_portal: "true",
			  portal: "10002227248",
			  servicename: "ZohoCreator",
			  serviceurl: "https://academia.srmuniv.ac.in/",
			  is_ajax: "true",
			  grant_type: "password"
		},
		headers: {
			  'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36',
			  'Origin': 'https://academia.srmuniv.ac.in'
		}
	}
}
