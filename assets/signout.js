let ls_access_token = localStorage.getItem("access_token");

if (ls_access_token) {
	api("access-tokens/" + ls_access_token + "/invalidate", {
	}, true).then(function (res) {
		localStorage.removeItem("access_token");
		localStorage.removeItem("expires");
		location.href = "/";
	});
} else {
	location.href = "/";
}