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
    var __alloyId0 = {};
    var __alloyId3 = [];
    var __alloyId5 = {
        type: "Ti.UI.ImageView",
        bindId: "avatarView",
        properties: {
            left: "0dp",
            width: "50dp",
            height: "50dp",
            bindId: "avatarView"
        }
    };
    __alloyId3.push(__alloyId5);
    var __alloyId6 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId7 = [];
            var __alloyId9 = {
                type: "Ti.UI.Label",
                bindId: "textLabel",
                properties: {
                    left: "55dp",
                    textAlign: "left",
                    backgroundColor: "white",
                    bindId: "textLabel"
                }
            };
            __alloyId7.push(__alloyId9);
            return __alloyId7;
        }(),
        properties: {}
    };
    __alloyId3.push(__alloyId6);
    var __alloyId2 = {
        properties: {
            name: "shuoListItem"
        },
        childTemplates: __alloyId3
    };
    __alloyId0["shuoListItem"] = __alloyId2;
    var __alloyId11 = [];
    $.__views.__alloyId12 = {
        template: "shuoListItem",
        properties: {
            id: "__alloyId12"
        }
    };
    __alloyId11.push($.__views.__alloyId12);
    $.__views.shuoListSection = Ti.UI.createListSection({
        id: "shuoListSection"
    });
    $.__views.shuoListSection.items = __alloyId11;
    var __alloyId13 = [];
    __alloyId13.push($.__views.shuoListSection);
    $.__views.shuoListView = Ti.UI.createListView({
        sections: __alloyId13,
        templates: __alloyId0,
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