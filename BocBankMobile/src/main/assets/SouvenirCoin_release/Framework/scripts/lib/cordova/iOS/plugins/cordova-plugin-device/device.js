/*! BUILD: 2016-12-19 */
cordova.define("cordova-plugin-device.device",function(a,b,c){function d(){this.available=!1,this.platform=null,this.version=null,this.uuid=null,this.cordova=null,this.model=null,this.manufacturer=null;var a=this;f.onCordovaReady.subscribe(function(){a.getInfo(function(b){var c=i.version;a.available=!0,a.platform=b.platform,a.version=b.version,a.uuid=b.uuid,a.cordova=c,a.model=b.model,a.manufacturer=b.manufacturer||"unknown",f.onCordovaInfoReady.fire()},function(b){a.available=!1,g.alert("[ERROR] Error initializing Cordova: "+b)})})}var e=a("cordova/argscheck"),f=a("cordova/channel"),g=a("cordova/utils"),h=a("cordova/exec"),i=a("cordova");f.createSticky("onCordovaInfoReady"),f.waitForInitialization("onCordovaInfoReady"),d.prototype.getInfo=function(a,b){e.checkArgs("fF","Device.getInfo",arguments),h(a,b,"Device","getDeviceInfo",[])},c.exports=new d});