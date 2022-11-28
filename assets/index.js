let ls_access_token = localStorage.getItem("access_token");

if (ls_access_token) {
	verifyAccessToken(ls_access_token).then(function (valid) {
		if (valid) {
			document.body.setAttribute("data-mode", "statview");
		} else {
			localStorage.removeItem("access_token");
			localStorage.removeItem("expires");
		}
	});
}