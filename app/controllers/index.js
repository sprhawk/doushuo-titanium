(function() {
	
	var rootWindow = null;
	if (OS_IOS) {
		rootWindow = $.nav;
	} else if (OS_ANDROID) {
		rootWindow = $.mainWindow;
	}
	
	rootWindow.open();
 
})();
