/*! BUILD: 2016-12-16 */
define("password",["zepto","common","model","routesUtil","sip"],function(a,b,c,d){function e(b){setTimeout(function(){a(b).find("input[widget_type='password']").each(function(a,b){h(b)}),a(b).find("input[widget_type='password']").on("click",f)},10)}function f(b){var c=a(this),d=c.attr("id"),e=c.attr("passType")||"password",f=l[e].keyboard,g=f?a.numberKeyboard:a.completeKeyboard;c.blur(),a.completeKeyboard&&a.completeKeyboard.hideKeyboard(),a.numberKeyboard&&a.numberKeyboard.hideKeyboard(),g.bindInputBox(d),g.showKeyboard(),b.stopPropagation()}function g(e){function f(a){CFCA_OK!=m.setMinLength(p,h)&&b.showAlert("setMinLength error",["确定"]),CFCA_OK!=m.setMaxLength(q,h)&&b.showAlert("setMaxLength error",["确定"]),CFCA_OK!=m.setOutputType(o,h)&&b.showAlert("setOutputType error",["确定"]),CFCA_OK!=m.setPublicKeyToEncrypt(n,h)&&b.showAlert("setEncryptToEncrypt error",["确定"]),CFCA_OK!=m.setServerRandom(a,h)&&b.showAlert("setServerRandom error",["确定"]),CFCA_OK!=m.setMatchRegex(r,h)&&b.showAlert("setMatchRegex error",["确定"]),CFCA_OK!=m.setCipherType(CIPHER_TYPE_SM2,h)&&b.showAlert("setMatchRegex error",["确定"])}var g=a(e),h=g.attr("id"),i=g.attr("cvtId"),j=g.attr("passType")||"password",k=l[j].keyboard,m=k?a.numberKeyboard:a.completeKeyboard,n=l[j].publicKey,o=l[j].outputType,p=l[j].minLength,q=l[j].maxLength,r=l[j].matchRegex,s=g.attr("loginpre");if(s=s?"true"==s:!1,!i)throw new Error("未正确初始化conversationid");if(a._pwdRandoms[i])if("initializing"==a._pwdRandoms[i])var t=setInterval(function(){"initializing"!=a._pwdRandoms[i]&&(clearInterval(t),f(a._pwdRandoms[i]))},50);else f(a._pwdRandoms[i]);else a._pwdRandoms[i]="initializing",c.interaction({method:s?d.method.CoinSeller.PSNGetRandomLoginPre:d.method.CoinSeller.PSNGetRandom,params:{conversationId:i}},"CoinSeller",function(b){a._pwdRandoms[i]=b,f(b)},null,null)}function h(b){if(a("#CFCA_CompleteKeyboard").length<=0){if(a("body").append('<div id="CFCA_CompleteKeyboard"></div>'),a.completeKeyboard&&a.completeKeyboard.ctls)for(var c in a.completeKeyboard.ctls)j(c);a.completeKeyboard=null}if(a("#CFCA_NumberKeyboard").length<=0){if(a("body").append('<div id="CFCA_NumberKeyboard"></div>'),a.numberKeyboard&&a.numberKeyboard.ctls)for(var c in a.numberKeyboard.ctls)j(c);a.numberKeyboard=null}var d=a(b).attr("passType")||"password",e=l[d].keyboard,f=a(b).attr("binded");if(!a(b).attr("id"))throw new Error("未正确初始化密码控件的唯一id");if(f)return!1;e?(!a.numberKeyboard&&(a("#CFCA_NumberKeyboard").empty(),a.numberKeyboard=new CFCAKeyboard("CFCA_NumberKeyboard",KEYBOARD_TYPE_DIGITAL),a.numberKeyboard.ctls={}),a.numberKeyboard.bindInputBox(a(b).attr("id")),a.numberKeyboard.hideKeyboard(),a.numberKeyboard.ctls[a(b).attr("id")]=d):(!a.completeKeyboard&&(a("#CFCA_CompleteKeyboard").empty(),a.completeKeyboard=new CFCAKeyboard("CFCA_CompleteKeyboard",KEYBOARD_TYPE_COMPLETE),a.completeKeyboard.ctls={}),a.completeKeyboard.bindInputBox(a(b).attr("id")),a.completeKeyboard.hideKeyboard(),a.completeKeyboard.ctls[a(b).attr("id")]=d),g(b),a(b).attr("binded",!0)}function i(b){return a.numberKeyboard&&a.numberKeyboard.ctls[b]?a.numberKeyboard:a.completeKeyboard&&a.completeKeyboard.ctls[b]?a.completeKeyboard:null}function j(a){i(a).clearInputValue(a)}a("body").append('<div id="CFCA_CompleteKeyboard"></div><div id="CFCA_NumberKeyboard"></div>');var k=1;0==b.urlParams.publicKey?(k=0,require(["publicKey_test"],function(){})):"";var l={password:{publicKey:k,outputType:2,minLength:1,maxLength:20,matchRegex:"^[!-~]*$",keyboard:0},wepassword:{publicKey:k,outputType:1,minLength:6,maxLength:20,matchRegex:"^[!-~]*$",keyboard:0},new_pwd:{publicKey:k,outputType:2,minLength:8,maxLength:20,matchRegex:"^[!-~]*$",keyboard:0},token_pwd:{publicKey:k,outputType:2,minLength:6,maxLength:6,matchRegex:"^[0-9]{6}$",keyboard:1},tel_pwd:{publicKey:k,outputType:2,minLength:6,maxLength:6,matchRegex:"^[0-9]{6}$",keyboard:1},mobile_pwd:{publicKey:k,outputType:1,minLength:6,maxLength:20,matchRegex:"^[!-~]*$",keyboard:0},confirm_pwd:{publicKey:k,outputType:2,minLength:8,maxLength:20,matchRegex:"(^[!-~]*[A-Za-z]+[!-~]*[0-9]+[!-~]*$)|(^[!-~]*[0-9]+[!-~]*[A-Za-z]+[!-~]*$)",keyboard:0},password2:{publicKey:k,outputType:2,minLength:1,maxLength:6,matchRegex:"^[0-9]{6}$",keyboard:1},reserv_pwd:{publicKey:k,outputType:2,minLength:6,maxLength:6,matchRegex:"^[0-9]{6}$",keyboard:1},quick_confirm_pwd:{publicKey:k,outputType:1,minLength:8,maxLength:8,matchRegex:"^[0-9]{8}$",keyboard:1},credit_cvv2:{publicKey:k,outputType:2,minLength:3,maxLength:3,matchRegex:"^[0-9]{3}$",keyboard:1},ATM_pwd:{publicKey:k,outputType:2,minLength:6,maxLength:6,matchRegex:"^[0-9]{6}$",keyboard:1},west_quick_pwd:{publicKey:k,outputType:1,minLength:8,maxLength:10,matchRegex:"^[0-9]{10}$",keyboard:1},ruia_quick_pwd:{publicKey:k,outputType:1,minLength:8,maxLength:11,matchRegex:"^[0-9]{11}$",keyboard:1}};a.funAop(a.fn,{html:{after:function(b,c){return a.isTmplContainsCtrl(c,"password")?(e(b),b):b}},append:{after:function(b,c){return a.isTmplContainsCtrl(c,"password")?(e(b),b):b}}},!0),a(document).on("click",function(){a.completeKeyboard&&a.completeKeyboard.hideKeyboard(),a.numberKeyboard&&a.numberKeyboard.hideKeyboard()}),a("#CFCA_NumberKeyboard, #CFCA_CompleteKeyboard").on("click",function(a){a.stopPropagation()}),a.extend(a.fn,{bindPwdKeyboard:function(b){this.attr("cvtId",b),h(this),a(this).on("click",f)},boc_password:function(b){var c={},d=this;return this.each(function(){var e=a(this).attr("id"),f=a(this).attr("widget_type");if("password"!=f)return"";var g=i(e),h=a(this).attr("name")||e,j=h+"_RC";if(c.activ=c.version=getCFCAKeyboardVersion(),a(this).attr(j))c[j]=a(this).attr(j);else{a(this).attr(j,g.getEncryptedClientRandom(e)),c[j]=a(this).attr(j);var k=g.getErrorCode(e).toString(16);if(k!=CFCA_OK)return c.isError=!0,c.errerCode=k,c.errorMessage=d.getErrorMessage(k,b||"密码"),c}return c[h]=g.getEncryptedInputValue(e),k=g.getErrorCode(e).toString(16),k!=CFCA_OK?(c.isError=!0,c.errerCode=k,c.errorMessage=d.getErrorMessage(k,b||"密码"),c):void 0}),c},clearPwd:function(){this.each(function(){j(a(this).attr("id"))})},getErrorMessage:function(a,b){var c="";switch(a=parseInt(a,16)){case CFCA_ERROR_INVALID_PARAMETER:c=b+"参数错误";break;case CFCA_ERROR_INVALID_SIP_HANDLE_ID:c=b+"SIP ID无效，键盘创建失败";break;case CFCA_ERROR_INPUT_LENGTH_OUT_OF_RANGE:c=b+"输入长度有误";break;case CFCA_ERROR_INPUT_VALUE_IS_NULL:c=b+"不能为空";break;case CFCA_ERROR_SERVER_RANDOM_INVALID:c=b+"随机数错误";break;case CFCA_ERROR_SERVER_RANDOM_IS_NULL:c=b+"随机数不能为空";break;case CFCA_ERROR_INPUT_VALUE_NOT_MATCH_REGEX:c=b+"格式有误";break;case CFCA_ERROR_RSA_ENCRYPT_FAILED:c=b+"加密失败"}return c},checkEqual:function(b){var c=a(this).attr("passType"),d=a(b).attr("passType"),e=a(this).attr("id"),f=a(b).attr("id"),g=i(e);if(c!=d)throw new Error("密码框类型不一致，不能比较!");return g.checkInputValueMatch(e,f)},checkMatchRegex:function(c){var d=a(this).attr("id"),e=i(d),f=e.checkMatchRegex(d),g=e.getErrorCode(d).toString(16);return g!=CFCA_OK?(b.showAlert(_t.getErrorMessage(g,c||"密码"),["确定"]),!1):f}})});