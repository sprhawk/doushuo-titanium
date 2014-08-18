exports.queryParameters = function(url) {
	if(url) {
		var parts = url.split('?');
		if (parts.length >= 2) {
			parts = parts[1].split('&');
			if (parts.length > 0) {
				var param = {};
				for(var i in parts) {
					var part = parts[i];
					var pairs = part.split('=');
					param[decodeURIComponent(pairs[0])] = decodeURIComponent(pairs[1]);
				}
				return param;
			}
		}
	}
};
