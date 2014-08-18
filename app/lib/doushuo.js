var DoubanAPI = require("DoubanAPI");

exports.getUserShuoList = function(token, parameters, userid) {
	
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			var onload = parameters["onload"];
			if(onload) {
				var object = JSON.parse(this.responseText);
				onload(object);
			}
		},
		onerror: function(e) {
			console.log("error:" + e.error + "(" + this.responseText + ")");
			var onerror = parameters["onerror"];
			if(onerror) {
				onerror(e.error);
			}
		},
		timeout: 5000,
	});
	var url = "https://api.douban.com/shuo/v2/statuses/";
	if (userid) {
		url += "user_timeline/" + userid;
	}
	else {
		url += "home_timeline";
	}
	xhr.open("GET", url);
	
	// setRequestHeader has to be called just before send()
	xhr.setRequestHeader("Authorization", "Bearer " + token);
	xhr.send();
};
