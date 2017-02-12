module.exports = function (viewLinkName) {
	return {
		url: 'https://academia.srmuniv.ac.in/liveViewHeader.do',
		method: "POST",
		headers: {
			'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36',
			'Origin': 'https://academia.srmuniv.ac.in'
		},
		form: {
			"sharedBy": "srm_university",
			"appLinkName": "academia-academic-services",
			"viewLinkName": viewLinkName,
			"urlParams": '{}',
			'isPageLoad': 'true'
		}
	};
};
