(function() {
	var DoubanAPI = require("DoubanAPI");
	var url = "https://www.douban.com/service/auth2/auth";
	$.doubanAuthWebView.addEventListener("beforeload", function(e) {
		if(0 == e.url.indexOf(DoubanAPI.redirectUri)) {
			this.stopLoading();
			var urllib = require("url");
			var param = urllib.queryParameters(e.url);
			var code = param["code"];
			var xhr = Ti.Network.createHTTPClient({
				onload: function(e) {
					console.log(this.responseText);
					var param = JSON.parse(this.responseText);
					var token = param["access_token"];
					if (token) {
						Ti.App.Properties.setString("AccessToken", param["access_token"]);
						Ti.App.Properties.setString("RefreshToken", param["refresh_token"]);
						Ti.App.Properties.setString("UserId", param["douban_user_id"]);
						var expires = param["expires_in"];
						expires = Math.floor(Date.now()/1000 + expires);
						Ti.App.Properties.setInt("Expires", expires);
						console.log("get token:" + param["access_token"]);				
						$.doubanAuthNav.close();
					}
					else {
						
					}
				},
				onerror: function(e) {
					console.log("error:" + e.error + "(" + this.responseText + ")");
				}
			});
			xhr.open("POST", "https://www.douban.com/service/auth2/token");
			xhr.send({
				client_id : DoubanAPI.apikey,
				client_secret : DoubanAPI.secret,
				redirect_uri : DoubanAPI.redirectUri,
				grant_type : "authorization_code",
				code : code
			});
		}
	});
	$.doubanAuthWebView.setUrl(url + "?client_id=" + DoubanAPI.apikey
							 + "&redirect_uri=" + DoubanAPI.redirectUri
							 + "&response_type=code"
							 + "&scope=shuo_basic_r,shuo_basic_w,douban_basic_common");
							 })();

