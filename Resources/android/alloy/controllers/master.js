function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId0() {
        $.__views.mainWindow.removeEventListener("open", __alloyId0);
        if ($.__views.mainWindow.activity) $.__views.mainWindow.activity.onCreateOptionsMenu = function() {}; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "master";
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
    $.__views.mainWindow = Ti.UI.createWindow({
        id: "mainWindow",
        title: "豆瓣说 Titanium Demo"
    });
    $.__views.mainWindow && $.addTopLevelView($.__views.mainWindow);
    $.__views.mainWindow.addEventListener("open", __alloyId0);
    var __alloyId1 = {};
    var __alloyId4 = [];
    var __alloyId6 = {
        type: "Ti.UI.ImageView",
        bindId: "avatarView",
        properties: {
            left: "0dp",
            width: "50dp",
            height: "50dp",
            bindId: "avatarView"
        }
    };
    __alloyId4.push(__alloyId6);
    var __alloyId7 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId8 = [];
            var __alloyId10 = {
                type: "Ti.UI.Label",
                bindId: "textLabel",
                properties: {
                    left: "55dp",
                    textAlign: "left",
                    backgroundColor: "white",
                    bindId: "textLabel"
                }
            };
            __alloyId8.push(__alloyId10);
            return __alloyId8;
        }(),
        properties: {}
    };
    __alloyId4.push(__alloyId7);
    var __alloyId3 = {
        properties: {
            name: "shuoListItem"
        },
        childTemplates: __alloyId4
    };
    __alloyId1["shuoListItem"] = __alloyId3;
    var __alloyId12 = [];
    $.__views.__alloyId13 = {
        template: "shuoListItem",
        properties: {
            id: "__alloyId13"
        }
    };
    __alloyId12.push($.__views.__alloyId13);
    $.__views.shuoListSection = Ti.UI.createListSection({
        id: "shuoListSection"
    });
    $.__views.shuoListSection.items = __alloyId12;
    var __alloyId14 = [];
    __alloyId14.push($.__views.shuoListSection);
    $.__views.shuoListView = Ti.UI.createListView({
        sections: __alloyId14,
        templates: __alloyId1,
        id: "shuoListView",
        defaultItemTemplate: "shuoListItem"
    });
    $.__views.mainWindow.add($.__views.shuoListView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    !function() {
        $.mainWindow.addEventListener("focus", function() {
            var accessToken = Ti.App.Properties.getString("AccessToken");
            var expires = Ti.App.Properties.getInt("Expires");
            if (null == accessToken || expires <= Math.floor(Date.now() / 1e3)) {
                var doubanAuthNav = Alloy.createController("doubanAuth").getView();
                doubanAuthNav.open({
                    modal: true
                });
            } else {
                var doushuo = require("doushuo");
                doushuo.getUserShuoList(accessToken, {
                    onload: function(statuses) {
                        console.log(statuses);
                        var items = [];
                        for (var i in statuses) {
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
                    onerror: function() {}
                });
            }
        });
    }();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;