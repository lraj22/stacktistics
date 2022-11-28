function attempt_auth() {
	const clientId = 24858;
	location.href = "https://stackoverflow.com/oauth/dialog?client_id=" + clientId + "&scope=private_info&redirect_uri=" + location.href;
}

let ls_access_token = localStorage.getItem("access_token");
let ls_expires_in = localStorage.getItem("expires");

if (ls_access_token && ls_expires_in) {
	verifyAccessToken(ls_access_token).then(function (valid) {
		if (valid) {
			localStorage.removeItem("error");
			location.href = "/";
		} else {
			localStorage.removeItem("access_token");
			localStorage.removeItem("expires");
			attempt_auth();
		}
	});
} else if (location.hash) {
	let params = new URL(location.origin + location.pathname + "?" + location.hash.slice(1)).searchParams;
	let access_token = params.get("access_token");
	let expires = params.get("expires");
	let error = params.get("error");
	let error_description = params.get("error_description");
	if (access_token && expires) {
		expires = Date.now() + parseInt(expires) * 1000;
		localStorage.removeItem("error");
		localStorage.setItem("access_token", access_token);
		localStorage.setItem("expires", expires);
		location.href = "/";
	} else if (error && error_description) {
		error = error.split("_").join(" ");
		error = error.charAt(0).toUpperCase() + error.slice(1);
		localStorage.setItem("error", error + ": " + error_description);
		localStorage.removeItem("access_token");
		localStorage.removeItem("expires");
		location.href = "/";
	} else {
		attempt_auth();
	}
} else {
	attempt_auth();
}