var DoubanAPI = require("DoubanAPI");

exports.getUserShuoList = function(token, parameters, userid) {
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var onload = parameters["onload"];
            if (onload) {
                var object = JSON.parse(this.responseText);
                onload(object);
            }
        },
        onerror: function(e) {
            console.log("error:" + e.error + "(" + this.responseText + ")");
            var onerror = parameters["onerror"];
            onerror && onerror(e.error);
        },
        timeout: 5e3
    });
    var url = "https://api.douban.com/shuo/v2/statuses/";
    url += userid ? "user_timeline/" + userid : "home_timeline";
    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.send();
};