const apiBase = "https://api.stackexchange.com/2.3/";
const apiKey = "Q1aQ*wLcqDZjc4sbAgqvYQ((";

function api(endpoint, params, minimal) {
	let url = apiBase + endpoint;
	if (!params) params = {};
	if (!minimal && !params.key) params.key = apiKey;
	if (!minimal && !params.site) params.site = "stackoverflow";
	let paramKeys = Object.keys(params);
	paramKeys = paramKeys.map(key => key + "=" + params[key]);
	url += (paramKeys.length ? "?" : "") + paramKeys.join("&");
	return fetch(url).then(res => res.text());
}

function verifyAccessToken(token) {
	return api("me", {
		"filter": "none",
		"access_token": token
	}).then(function (res) {
		return new Promise((resolve) => {
			resolve(res === "{}");
		});
	});
}