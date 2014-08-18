(function() {
// event must be listened before window opened.	
	$.mainWindow.addEventListener("focus", function(e) {
		var accessToken = Ti.App.Properties.getString("AccessToken");
		var expires = Ti.App.Properties.getInt("Expires");
		if (accessToken == null || expires <= Math.floor(Date.now() / 1000)) {
			var doubanAuthNav = Alloy.createController("doubanAuth").getView();
			doubanAuthNav.open({
				modal : true
			});
		} else {
			var doushuo = require("doushuo");
			doushuo.getUserShuoList(accessToken, {
				onload : function(statuses) {
					console.log(statuses);
					var items = [];
					for(var i in statuses) {
						var status = statuses[i];
						items.push({
							template: "shuoListItem",
							textLabel: {
								text: status.title
							},
							avatarView: {
								image: status.user.small_avatar
							}
						});
					}
					console.log(items.length);
					$.shuoListSection.setItems(items);
				},
				onerror : function(error) {

				}
			});
		}
	});
})();
