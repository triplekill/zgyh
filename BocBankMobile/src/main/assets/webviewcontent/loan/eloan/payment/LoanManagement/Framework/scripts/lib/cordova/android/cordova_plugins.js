cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    }
    ,{
         "file": "plugins/cordova-plugin-bocovsbridge/bocovsbridge.js",
          "id": "cordova-plugin-bocovsbridge.bocovsbridge",
          "runs": true
    }
    //,{
    //    "file": "plugins/cordova-plugin-device/www/device.js",
    //    "id": "cordova-plugin-device.device",
    //    "clobbers": [
    //        "device"
    //    ]
    //}
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0"
    ,"cordova-plugin-bocovsbridge": "1.0.0"
    //,"cordova-plugin-device": "1.0.2-dev"
}
// BOTTOM OF METADATA
});