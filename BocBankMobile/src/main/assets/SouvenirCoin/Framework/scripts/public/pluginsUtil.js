/*! BUILD: 2016-12-16 */
define("pluginsUtil",["zepto","dateUtil"],function(a,b){function c(a,c,d){null!=c?data=b.parse(a,c):(c="yyyy/MM/dd",data=b.parse(a,"yyyy/MM/dd"));var e=b.addDays(data,d),f=b.addDays(data,1),g=b.addDays(f,-7),h=b.addMonths(f,-1),i=b.addMonths(f,-3),j=b.format(data,c),k=b.format(e,c),l=b.format(g,c),m=b.format(h,c),n=b.format(i,c),o=[{name:window.app.nls.ovs_ma_td_today,value:j+","+j},{name:window.app.nls.ovs_ma_td_nearlyaweek,value:l+","+k},{name:window.app.nls.ovs_ma_td_nearlyamonth,value:m+","+k},{name:window.app.nls.ovs_ma_td_closetomarch,value:n+","+k}];return o}var d={},e={cipher:!0,cipherType:1,randomeKey_S:"",outputValueType:"2",passwordRegularExpression:"",passwordMinLength:"1",passwordMaxLength:"6"},f={type:0,select:{options:[]},picker:{single:{min:"",max:"",def:""},scope:{min:"",max:"",mindef:"",maxdef:"",check:{interval:"3",unit:"M",msg:window.app.nls.ovs_gy_datebetweenthreemonth}},format:"yyyy/MM/dd"}};return d.createCFCAConfig=function(b){var c={};return a.extend(c,e),a.extend(c,b),c},d.createSigleDateSelectParams=function(b,c){var d={};return a.extend(d,f),d.type=0,a.extend(d.picker.single,b),null!=c&&""!=c&&(d.picker.format=c),d},d.createLimitDataSelectParams=function(b,d,e){var g={};a.extend(g,f),g.type=1;var h=c(b,e,0);return g.select.options=h,e&&(g.picker.format=e),a.extend(g.picker.scope,d),g},d.createBeforeTodayLimitDataSelectParams=function(b,d,e){var g={};a.extend(g,f),g.type=1;var h=c(b,e,-1);return g.select.options=h,a.extend(g.picker.scope,d),g},d});