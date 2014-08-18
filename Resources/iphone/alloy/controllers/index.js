function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.master = Alloy.createController("master", {
        id: "master"
    });
    $.__views.nav = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.master.getViewEx({
            recurse: true
        }),
        id: "nav"
    });
    $.__views.nav && $.addTopLevelView($.__views.nav);
    exports.destroy = function() {};
    _.extend($, $.__views);
    !function() {
        var rootWindow = null;
        rootWindow = $.nav;
        rootWindow.open();
    }();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;