(function() {
	
	var rootWindow = null;
	if (OS_IOS) {
		rootWindow = $.nav;
	} else if (OS_ANDROID) {
		rootWindow = $.master.getView();
	}
	
	rootWindow.open();
 
})();
