/*! BUILD: 2016-12-19 */
define("cordova_android",function(){!function(){var PLATFORM_VERSION_BUILD_LABEL="4.0.2",require,define;!function(){function a(a){var b=a.factory,c=function(b){var c=b;return"."===b.charAt(0)&&(c=a.id.slice(0,a.id.lastIndexOf(e))+e+b.slice(2)),require(c)};return a.exports={},delete a.factory,b(c,a.exports,a),a.exports}var b={},c=[],d={},e=".";require=function(e){if(!b[e])throw"module "+e+" not found";if(e in d){var f=c.slice(d[e]).join("->")+"->"+e;throw"Cycle in require graph: "+f}if(b[e].factory)try{return d[e]=c.length,c.push(e),a(b[e])}finally{delete d[e],c.pop()}return b[e].exports},define=function(a,c){if(b[a])throw"module "+a+" already defined";b[a]={id:a,factory:c}},define.remove=function(a){delete b[a]},define.moduleMap=b}(),"object"==typeof module&&"function"==typeof require&&(module.exports.require=require,module.exports.define=define),define("cordova",function(a,b,c){function d(a,b){var c=document.createEvent("Events");if(c.initEvent(a,!1,!1),b)for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);return c}if(window.cordova)throw new Error("cordova already defined");var e=a("cordova/channel"),f=a("cordova/platform"),g=document.addEventListener,h=document.removeEventListener,i=window.addEventListener,j=window.removeEventListener,k={},l={};document.addEventListener=function(a,b,c){var d=a.toLowerCase();"undefined"!=typeof k[d]?k[d].subscribe(b):g.call(document,a,b,c)},window.addEventListener=function(a,b,c){var d=a.toLowerCase();"undefined"!=typeof l[d]?l[d].subscribe(b):i.call(window,a,b,c)},document.removeEventListener=function(a,b,c){var d=a.toLowerCase();"undefined"!=typeof k[d]?k[d].unsubscribe(b):h.call(document,a,b,c)},window.removeEventListener=function(a,b,c){var d=a.toLowerCase();"undefined"!=typeof l[d]?l[d].unsubscribe(b):j.call(window,a,b,c)};var m={define:define,require:a,version:PLATFORM_VERSION_BUILD_LABEL,platformVersion:PLATFORM_VERSION_BUILD_LABEL,platformId:f.id,addWindowEventHandler:function(a){return l[a]=e.create(a)},addStickyDocumentEventHandler:function(a){return k[a]=e.createSticky(a)},addDocumentEventHandler:function(a){return k[a]=e.create(a)},removeWindowEventHandler:function(a){delete l[a]},removeDocumentEventHandler:function(a){delete k[a]},getOriginalHandlers:function(){return{document:{addEventListener:g,removeEventListener:h},window:{addEventListener:i,removeEventListener:j}}},fireDocumentEvent:function(a,b,c){var e=d(a,b);"undefined"!=typeof k[a]?c?k[a].fire(e):setTimeout(function(){"deviceready"==a&&document.dispatchEvent(e),k[a].fire(e)},0):document.dispatchEvent(e)},fireWindowEvent:function(a,b){var c=d(a,b);"undefined"!=typeof l[a]?setTimeout(function(){l[a].fire(c)},0):window.dispatchEvent(c)},callbackId:Math.floor(2e9*Math.random()),callbacks:{},callbackStatus:{NO_RESULT:0,OK:1,CLASS_NOT_FOUND_EXCEPTION:2,ILLEGAL_ACCESS_EXCEPTION:3,INSTANTIATION_EXCEPTION:4,MALFORMED_URL_EXCEPTION:5,IO_EXCEPTION:6,INVALID_ACTION:7,JSON_EXCEPTION:8,ERROR:9},callbackSuccess:function(a,b){m.callbackFromNative(a,!0,b.status,[b.message],b.keepCallback)},callbackError:function(a,b){m.callbackFromNative(a,!1,b.status,[b.message],b.keepCallback)},callbackFromNative:function(a,b,c,d,e){try{var f=m.callbacks[a];f&&(b&&c==m.callbackStatus.OK?f.success&&f.success.apply(null,d):b||f.fail&&f.fail.apply(null,d),e||delete m.callbacks[a])}catch(g){var h="Error in "+(b?"Success":"Error")+" callbackId: "+a+" : "+g;throw console&&console.log&&void 0,m.fireWindowEvent("cordovacallbackerror",{message:h}),g}},addConstructor:function(a){e.onCordovaReady.subscribe(function(){try{a()}catch(b){}})}};c.exports=m}),define("cordova/android/nativeapiprovider",function(a,b,c){var d=this._cordovaNative||a("cordova/android/promptbasednativeapi"),e=d;c.exports={get:function(){return e},setPreferPrompt:function(b){e=b?a("cordova/android/promptbasednativeapi"):d},set:function(a){e=a}}}),define("cordova/android/promptbasednativeapi",function(a,b,c){c.exports={exec:function(a,b,c,d,e){return prompt(e,"gap:"+JSON.stringify([a,b,c,d]))},setNativeToJsBridgeMode:function(a,b){prompt(b,"gap_bridge_mode:"+a)},retrieveJsMessages:function(a,b){return prompt(+b,"gap_poll:"+a)}}}),define("cordova/argscheck",function(a,b,c){function d(a,b){return/.*?\((.*?)\)/.exec(a)[1].split(", ")[b]}function e(a,b,c,e){if(h.enableChecks){for(var f,j=null,k=0;k<a.length;++k){var l=a.charAt(k),m=l.toUpperCase(),n=c[k];if("*"!=l&&(f=g.typeName(n),(null!==n&&void 0!==n||l!=m)&&f!=i[m])){j="Expected "+i[m];break}}if(j)throw j+=", but got "+f+".",j='Wrong type for parameter "'+d(e||c.callee,k)+'" of '+b+": "+j,TypeError(j)}}function f(a,b){return void 0===a?b:a}var g=(a("cordova/exec"),a("cordova/utils")),h=c.exports,i={A:"Array",D:"Date",N:"Number",S:"String",F:"Function",O:"Object"};h.checkArgs=e,h.getValue=f,h.enableChecks=!0}),define("cordova/base64",function(a,b){function c(a){for(var b,c=a.byteLength,d="",e=g(),h=0;c-2>h;h+=3)b=(a[h]<<16)+(a[h+1]<<8)+a[h+2],d+=e[b>>12],d+=e[4095&b];return c-h==2?(b=(a[h]<<16)+(a[h+1]<<8),d+=e[b>>12],d+=f[(4095&b)>>6],d+="="):c-h==1&&(b=a[h]<<16,d+=e[b>>12],d+="=="),d}var d=b;d.fromArrayBuffer=function(a){var b=new Uint8Array(a);return c(b)},d.toArrayBuffer=function(a){for(var b="undefined"!=typeof atob?atob(a):new Buffer(a,"base64").toString("binary"),c=new ArrayBuffer(b.length),d=new Uint8Array(c),e=0,f=b.length;f>e;e++)d[e]=b.charCodeAt(e);return c};var e,f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",g=function(){e=[];for(var a=0;64>a;a++)for(var b=0;64>b;b++)e[64*a+b]=f[a]+f[b];return g=function(){return e},e}}),define("cordova/builder",function(a,b){function c(a,b,c){for(var d in a)a.hasOwnProperty(d)&&b.apply(c,[a[d],d])}function d(a,c,d){b.replaceHookForTesting(a,c);var e=!1;try{a[c]=d}catch(f){e=!0}(e||a[c]!==d)&&h.defineGetter(a,c,function(){return d})}function e(a,b,c,e){e?h.defineGetter(a,b,function(){return delete a[b],d(a,b,c),c}):d(a,b,c)}function f(b,d,i,j){c(d,function(c,d){try{var k=c.path?a(c.path):{};i?("undefined"==typeof b[d]?e(b,d,k,c.deprecated):"undefined"!=typeof c.path&&(j?g(b[d],k):e(b,d,k,c.deprecated)),k=b[d]):"undefined"==typeof b[d]?e(b,d,k,c.deprecated):k=b[d],c.children&&f(k,c.children,i,j)}catch(l){h.alert("Exception building Cordova JS globals: "+l+' for key "'+d+'"')}})}function g(a,b){for(var c in b)b.hasOwnProperty(c)&&(a.prototype&&a.prototype.constructor===a?d(a.prototype,c,b[c]):"object"==typeof b[c]&&"object"==typeof a[c]?g(a[c],b[c]):d(a,c,b[c]))}var h=a("cordova/utils");b.buildIntoButDoNotClobber=function(a,b){f(b,a,!1,!1)},b.buildIntoAndClobber=function(a,b){f(b,a,!0,!1)},b.buildIntoAndMerge=function(a,b){f(b,a,!0,!0)},b.recursiveMerge=g,b.assignOrWrapInDeprecateGetter=e,b.replaceHookForTesting=function(){}}),define("cordova/channel",function(a,b,c){function d(a){if("function"!=typeof a)throw"Function required as first argument!"}var e=a("cordova/utils"),f=1,g=function(a,b){this.type=a,this.handlers={},this.state=b?1:0,this.fireArgs=null,this.numHandlers=0,this.onHasSubscribersChange=null},h={join:function(a,b){for(var c=b.length,d=c,e=function(){--d||a()},f=0;c>f;f++){if(0===b[f].state)throw Error("Can only use join with sticky channels.");b[f].subscribe(e)}c||a()},create:function(a){return h[a]=new g(a,!1)},createSticky:function(a){return h[a]=new g(a,!0)},deviceReadyChannelsArray:[],deviceReadyChannelsMap:{},waitForInitialization:function(a){if(a){var b=h[a]||this.createSticky(a);this.deviceReadyChannelsMap[a]=b,this.deviceReadyChannelsArray.push(b)}},initializationComplete:function(a){var b=this.deviceReadyChannelsMap[a];b&&b.fire()}};g.prototype.subscribe=function(a,b){if(d(a),2==this.state)return void a.apply(b||this,this.fireArgs);var c=a,g=a.observer_guid;"object"==typeof b&&(c=e.close(b,a)),g||(g=""+f++),c.observer_guid=g,a.observer_guid=g,this.handlers[g]||(this.handlers[g]=c,this.numHandlers++,1==this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())},g.prototype.unsubscribe=function(a){d(a);var b=a.observer_guid,c=this.handlers[b];c&&(delete this.handlers[b],this.numHandlers--,0===this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())},g.prototype.fire=function(){var a=Array.prototype.slice.call(arguments);if(1==this.state&&(this.state=2,this.fireArgs=a),this.numHandlers){var b=[];for(var c in this.handlers)b.push(this.handlers[c]);for(var d=0;d<b.length;++d)b[d].apply(this,a);2==this.state&&this.numHandlers&&(this.numHandlers=0,this.handlers={},this.onHasSubscribersChange&&this.onHasSubscribersChange())}},h.createSticky("onDOMContentLoaded"),h.createSticky("onNativeReady"),h.createSticky("onCordovaReady"),h.createSticky("onPluginsReady"),h.createSticky("onDeviceReady"),h.create("onResume"),h.create("onPause"),h.waitForInitialization("onCordovaReady"),h.waitForInitialization("onDOMContentLoaded"),c.exports=h}),define("cordova/exec",function(require,exports,module){function androidExec(a,b,c,d,e){if(0>bridgeSecret)throw new Error("exec() called without bridgeSecret");void 0===jsToNativeBridgeMode&&androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);for(var f=0;f<e.length;f++)"ArrayBuffer"==utils.typeName(e[f])&&(e[f]=base64.fromArrayBuffer(e[f]));var g=c+cordova.callbackId++,h=JSON.stringify(e);(a||b)&&(cordova.callbacks[g]={success:a,fail:b});var i=nativeApiProvider.get().exec(bridgeSecret,c,d,g,h);jsToNativeBridgeMode==jsToNativeModes.JS_OBJECT&&"@Null arguments."===i?(androidExec.setJsToNativeBridgeMode(jsToNativeModes.PROMPT),androidExec(a,b,c,d,e),androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT)):i&&(messagesFromNative.push(i),nextTick(processMessages))}function pollOnceFromOnlineEvent(){pollOnce(!0)}function pollOnce(a){if(!(0>bridgeSecret)){var b=nativeApiProvider.get().retrieveJsMessages(bridgeSecret,!!a);b&&(messagesFromNative.push(b),processMessages())}}function pollingTimerFunc(){pollEnabled&&(pollOnce(),setTimeout(pollingTimerFunc,50))}function hookOnlineApis(){function a(a){cordova.fireWindowEvent(a.type)}window.addEventListener("online",pollOnceFromOnlineEvent,!1),window.addEventListener("offline",pollOnceFromOnlineEvent,!1),cordova.addWindowEventHandler("online"),cordova.addWindowEventHandler("offline"),document.addEventListener("online",a,!1),document.addEventListener("offline",a,!1)}function buildPayload(a,b){var c=b.charAt(0);if("s"==c)a.push(b.slice(1));else if("t"==c)a.push(!0);else if("f"==c)a.push(!1);else if("N"==c)a.push(null);else if("n"==c)a.push(+b.slice(1));else if("A"==c){var d=b.slice(1);a.push(base64.toArrayBuffer(d))}else if("S"==c)a.push(window.atob(b.slice(1)));else if("M"==c)for(var e=b.slice(1);""!==e;){var f=e.indexOf(" "),g=+e.slice(0,f),h=e.substr(f+1,g);e=e.slice(f+g+1),buildPayload(a,h)}else a.push(JSON.parse(b))}function processMessage(message){var firstChar=message.charAt(0);if("J"==firstChar)eval(message.slice(1));else if("S"==firstChar||"F"==firstChar){var success="S"==firstChar,keepCallback="1"==message.charAt(1),spaceIdx=message.indexOf(" ",2),status=+message.slice(2,spaceIdx),nextSpaceIdx=message.indexOf(" ",spaceIdx+1),callbackId=message.slice(spaceIdx+1,nextSpaceIdx),payloadMessage=message.slice(nextSpaceIdx+1),payload=[];buildPayload(payload,payloadMessage),cordova.callbackFromNative(callbackId,success,status,payload,keepCallback)}}function processMessages(){if(!isProcessing&&0!==messagesFromNative.length){isProcessing=!0;try{var a=popMessageFromQueue();if("*"==a&&0===messagesFromNative.length)return void nextTick(pollOnce);processMessage(a)}finally{isProcessing=!1,messagesFromNative.length>0&&nextTick(processMessages)}}}function popMessageFromQueue(){var a=messagesFromNative.shift();if("*"==a)return"*";var b=a.indexOf(" "),c=+a.slice(0,b),d=a.substr(b+1,c);return a=a.slice(b+c+1),a&&messagesFromNative.unshift(a),d}var cordova=require("cordova"),nativeApiProvider=require("cordova/android/nativeapiprovider"),utils=require("cordova/utils"),base64=require("cordova/base64"),channel=require("cordova/channel"),jsToNativeModes={PROMPT:0,JS_OBJECT:1},nativeToJsModes={POLLING:0,LOAD_URL:1,ONLINE_EVENT:2,PRIVATE_API:3},jsToNativeBridgeMode,nativeToJsBridgeMode=nativeToJsModes.ONLINE_EVENT,pollEnabled=!1,bridgeSecret=-1,messagesFromNative=[],isProcessing=!1,resolvedPromise="undefined"==typeof Promise?null:Promise.resolve(),nextTick=resolvedPromise?function(a){resolvedPromise.then(a)}:function(a){setTimeout(a)};androidExec.init=function(){bridgeSecret=+prompt("","gap_init:"+nativeToJsBridgeMode),channel.onNativeReady.fire()},hookOnlineApis(),androidExec.jsToNativeModes=jsToNativeModes,androidExec.nativeToJsModes=nativeToJsModes,androidExec.setJsToNativeBridgeMode=function(a){a!=jsToNativeModes.JS_OBJECT||window._cordovaNative||(a=jsToNativeModes.PROMPT),nativeApiProvider.setPreferPrompt(a==jsToNativeModes.PROMPT),jsToNativeBridgeMode=a},androidExec.setNativeToJsBridgeMode=function(a){a!=nativeToJsBridgeMode&&(nativeToJsBridgeMode==nativeToJsModes.POLLING&&(pollEnabled=!1),nativeToJsBridgeMode=a,bridgeSecret>=0&&nativeApiProvider.get().setNativeToJsBridgeMode(bridgeSecret,a),a==nativeToJsModes.POLLING&&(pollEnabled=!0,setTimeout(pollingTimerFunc,1)))},module.exports=androidExec}),define("cordova/exec/proxy",function(a,b,c){var d={};c.exports={add:function(a,b){return d[a]=b,b},remove:function(a){var b=d[a];return delete d[a],d[a]=null,b},get:function(a,b){return d[a]?d[a][b]:null}}}),define("cordova/init",function(a){function b(a){for(var b=0;b<a.length;++b)2!=a[b].state}function c(a){var b=function(){};b.prototype=a;var c=new b;if(b.bind)for(var d in a)"function"==typeof a[d]?c[d]=a[d].bind(a):!function(b){i.defineGetterSetter(c,d,function(){return a[b]})}(d);return c}var d=a("cordova/channel"),e=a("cordova"),f=a("cordova/modulemapper"),g=a("cordova/platform"),h=a("cordova/pluginloader"),i=a("cordova/utils"),j=[d.onNativeReady,d.onPluginsReady];window.setTimeout(function(){2!=d.onDeviceReady.state&&(b(j),b(d.deviceReadyChannelsArray))},5e3),window.navigator&&(window.navigator=c(window.navigator)),window.console||(window.console={log:function(){}}),window.console.warn||(window.console.warn=function(a){this.log("warn: "+a)}),d.onPause=e.addDocumentEventHandler("pause"),d.onResume=e.addDocumentEventHandler("resume"),d.onDeviceReady=e.addStickyDocumentEventHandler("deviceready"),"complete"==document.readyState||"interactive"==document.readyState?d.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){d.onDOMContentLoaded.fire()},!1),window._nativeReady&&d.onNativeReady.fire(),f.clobbers("cordova","cordova"),f.clobbers("cordova/exec","cordova.exec"),f.clobbers("cordova/exec","Cordova.exec"),g.bootstrap&&g.bootstrap(),setTimeout(function(){h.load(function(){d.onPluginsReady.fire()})},0),d.join(function(){f.mapModules(window),g.initialize&&g.initialize(),d.onCordovaReady.fire(),d.join(function(){a("cordova").fireDocumentEvent("deviceready")},d.deviceReadyChannelsArray)},j)}),define("cordova/init_b",function(a){function b(a){for(var b=0;b<a.length;++b)2!=a[b].state}function c(a){var b=function(){};b.prototype=a;var c=new b;if(b.bind)for(var d in a)"function"==typeof a[d]?c[d]=a[d].bind(a):!function(b){g.defineGetterSetter(c,d,function(){return a[b]})}(d);return c}var d=a("cordova/channel"),e=a("cordova"),f=a("cordova/platform"),g=a("cordova/utils"),h=[d.onDOMContentLoaded,d.onNativeReady];e.exec=a("cordova/exec"),window.setTimeout(function(){2!=d.onDeviceReady.state&&(b(h),b(d.deviceReadyChannelsArray))},5e3),window.navigator&&(window.navigator=c(window.navigator)),window.console||(window.console={log:function(){}}),window.console.warn||(window.console.warn=function(a){this.log("warn: "+a)}),d.onPause=e.addDocumentEventHandler("pause"),d.onResume=e.addDocumentEventHandler("resume"),d.onDeviceReady=e.addStickyDocumentEventHandler("deviceready"),"complete"==document.readyState||"interactive"==document.readyState?d.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){d.onDOMContentLoaded.fire()},!1),window._nativeReady&&d.onNativeReady.fire(),f.bootstrap&&f.bootstrap(),d.join(function(){f.initialize&&f.initialize(),d.onCordovaReady.fire(),d.join(function(){a("cordova").fireDocumentEvent("deviceready")},d.deviceReadyChannelsArray)},h)}),define("cordova/modulemapper",function(a,b){function c(a,b,c,d){if(!(b in h))throw new Error("Module "+b+" does not exist.");e.push(a,b,c),d&&(f[c]=d)}function d(a,b){if(!a)return b;for(var c,d=a.split("."),e=b,f=0;c=d[f];++f)e=e[c]=e[c]||{};return e}var e,f,g=a("cordova/builder"),h=define.moduleMap;b.reset=function(){e=[],f={}},b.clobbers=function(a,b,d){c("c",a,b,d)},b.merges=function(a,b,d){c("m",a,b,d)},b.defaults=function(a,b,d){c("d",a,b,d)},b.runs=function(a){c("r",a,null)},b.mapModules=function(b){var c={};b.CDV_origSymbols=c;for(var h=0,i=e.length;i>h;h+=3){var j=e[h],k=e[h+1],l=a(k);if("r"!=j){var m=e[h+2],n=m.lastIndexOf("."),o=m.substr(0,n),p=m.substr(n+1),q=m in f?"Access made to deprecated symbol: "+m+". "+q:null,r=d(o,b),s=r[p];"m"==j&&s?g.recursiveMerge(s,l):("d"==j&&!s||"d"!=j)&&(m in c||(c[m]=s),g.assignOrWrapInDeprecateGetter(r,p,l,q))}}},b.getOriginalSymbol=function(a,b){var c=a.CDV_origSymbols;if(c&&b in c)return c[b];for(var d=b.split("."),e=a,f=0;f<d.length;++f)e=e&&e[d[f]];return e},b.reset()}),define("cordova/platform",function(a,b,c){function d(b){var c=a("cordova"),d=b.action;switch(d){case"backbutton":case"menubutton":case"searchbutton":case"pause":case"resume":case"volumedownbutton":case"volumeupbutton":c.fireDocumentEvent(d);break;default:throw new Error("Unknown event action "+d)}}c.exports={id:"android",bootstrap:function(){function b(a){var b=e.addDocumentEventHandler(a+"button");b.onHasSubscribersChange=function(){f(null,null,h,"overrideButton",[a,1==this.numHandlers])}}var c=a("cordova/channel"),e=a("cordova"),f=a("cordova/exec"),g=a("cordova/modulemapper");f.init(),g.clobbers("cordova/plugin/android/app","navigator.app");var h=Number(e.platformVersion.split(".")[0])>=4?"CoreAndroid":"App",i=e.addDocumentEventHandler("backbutton");i.onHasSubscribersChange=function(){f(null,null,h,"overrideBackbutton",[1==this.numHandlers])},e.addDocumentEventHandler("menubutton"),e.addDocumentEventHandler("searchbutton"),b("volumeup"),b("volumedown"),c.onCordovaReady.subscribe(function(){f(d,null,h,"messageChannel",[]),f(null,null,h,"show",[])})}}}),define("cordova/plugin/android/app",function(a,b,c){var d=a("cordova/exec"),e=Number(a("cordova").platformVersion.split(".")[0])>=4?"CoreAndroid":"App";c.exports={clearCache:function(){d(null,null,e,"clearCache",[])},loadUrl:function(a,b){d(null,null,e,"loadUrl",[a,b])},cancelLoadUrl:function(){d(null,null,e,"cancelLoadUrl",[])},clearHistory:function(){d(null,null,e,"clearHistory",[])},backHistory:function(){d(null,null,e,"backHistory",[])},overrideBackbutton:function(a){d(null,null,e,"overrideBackbutton",[a])},overrideButton:function(a,b){d(null,null,e,"overrideButton",[a,b])},exitApp:function(){return d(null,null,e,"exitApp",[])}}}),define("cordova/pluginloader",function(a,b){function c(a,c,d,e){e=e||d,a in define.moduleMap?d():b.injectScript(c,function(){a in define.moduleMap?d():e()},e)}function d(a,b){for(var c,d=0;c=a[d];d++){if(c.clobbers&&c.clobbers.length)for(var e=0;e<c.clobbers.length;e++)g.clobbers(c.id,c.clobbers[e]);if(c.merges&&c.merges.length)for(var f=0;f<c.merges.length;f++)g.merges(c.id,c.merges[f]);c.runs&&g.runs(c.id)}b()}function e(a,b,e){function f(){--g||d(b,e)}var g=b.length;if(!g)return void e();for(var h=0;h<b.length;h++)c(b[h].id,a+b[h].file,f)}function f(){for(var a=null,b=document.getElementsByTagName("script"),c="/cordova.js",d=b.length-1;d>-1;d--){var e=b[d].src.replace(/\?.*$/,"");if(e.indexOf(c)==e.length-c.length){a=e.substring(0,e.length-c.length)+"/";break}}return a}{var g=a("cordova/modulemapper");a("cordova/urlutil")}b.injectScript=function(a,b,c){var d=document.createElement("script");d.onload=b,d.onerror=c,d.src=a,document.head.appendChild(d)},b.load=function(b){var d=f();null===d&&(d=""),c("cordova/plugin_list",d+"cordova_plugins.js",function(){var c=a("cordova/plugin_list");e(d,c,b)},b)}}),define("cordova/urlutil",function(a,b){b.makeAbsolute=function(a){var b=document.createElement("a");return b.href=a,b.href}}),define("cordova/utils",function(a,b){function c(a){for(var b="",c=0;a>c;c++){var d=parseInt(256*Math.random(),10).toString(16);1==d.length&&(d="0"+d),b+=d}return b}var d=b;d.defineGetterSetter=function(a,b,c,d){if(Object.defineProperty){var e={get:c,configurable:!0};d&&(e.set=d),Object.defineProperty(a,b,e)}else a.__defineGetter__(b,c),d&&a.__defineSetter__(b,d)},d.defineGetter=d.defineGetterSetter,d.arrayIndexOf=function(a,b){if(a.indexOf)return a.indexOf(b);for(var c=a.length,d=0;c>d;++d)if(a[d]==b)return d;return-1},d.arrayRemove=function(a,b){var c=d.arrayIndexOf(a,b);return-1!=c&&a.splice(c,1),-1!=c},d.typeName=function(a){return Object.prototype.toString.call(a).slice(8,-1)},d.isArray=function(a){return"Array"==d.typeName(a)},d.isDate=function(a){return"Date"==d.typeName(a)},d.clone=function(a){if(!a||"function"==typeof a||d.isDate(a)||"object"!=typeof a)return a;var b,c;if(d.isArray(a)){for(b=[],c=0;c<a.length;++c)b.push(d.clone(a[c]));return b}b={};for(c in a)c in b&&b[c]==a[c]||(b[c]=d.clone(a[c]));return b},d.close=function(a,b,c){return"undefined"==typeof c?function(){return b.apply(a,arguments)}:function(){return b.apply(a,c)}},d.createUUID=function(){return c(4)+"-"+c(2)+"-"+c(2)+"-"+c(2)+"-"+c(6)},d.extend=function(){var a=function(){};return function(b,c){a.prototype=c.prototype,b.prototype=new a,b.__super__=c.prototype,b.prototype.constructor=b}}(),d.alert=function(a){window.alert?window.alert(a):console&&console.log}}),window.cordova=require("cordova"),require("cordova/init")}()});