/*! BUILD: 2016-12-16 */
define("SelectWidget",["zepto"],function(a){function b(b){return a.isTmplContainsCtrl(b,"SelectWidget")?(a(b).find(".select_widget").each(function(d,e){return a(e).attr("binded")?b:(c(e),void a(e).attr("binded","true"))}),b):b}function c(b){function c(c){var d=b.find(".options_content_container").offset().top;a(c).children().removeClass("selected").each(function(c,e){if(Math.abs(a(e).offset().top-d-g*h)<=10){a(e).addClass("selected");var f=(a(e).parent().parent()[0],a(e).text()),i=a(e).attr("value");b.find(".value").text(f),b.find(".value").attr("value",i)}})}function d(c,d){b.find(c).each(function(b,c){a(c).text()==d&&(a(c).parent().attr("old_dis",(g-b)*h),a(c).parent().css("-webkit-transform","translateY("+(g-b)*h+"px)"))})}function e(){var c="";b.find("li").each(function(b,d){c=0==b?a(d).text():a(d).attr("selected")?a(d).text():c}),d(".select_table-view-cell",c)}b=a(b);var f,g,h=36;b.find(".select_table-view").on("touchstart mousedown",function(b){var c=b.touches&&b.touches[0]||a(b.target),d={x:c.pageX||b.pageX,y:c.pageY||b.pageY},e=a(b.target).parent();e.attr("scrolling","true"),e.attr("x",d.x).attr("y",d.y),b.stopPropagation()}).on("touchmove mousemove",function(b){b.preventDefault();var d=b.touches&&b.touches[0]||a(b.target),e={x:d.pageX||b.pageX,y:d.pageY||b.pageY},i=a(b.target).parent();if("true"!==i.attr("scrolling"))return!1;var j=Math.abs(e.x-i.attr("x")),k=Math.abs(e.y-i.attr("y")),l=e.y-i.attr("y")>0?1:-1,m=1*i.attr("old_dis")||0,n=m+Math.ceil(k/h)*h*l;n=n>0?g*h>n?n:g*h:Math.abs(n)+f>i.height()+(Math.ceil(f/h)-g-1)*h?f-(i.height()+(Math.ceil(f/h)-g-1)*h):n,n=Math.ceil(n/h)*h,k>j&&k>20&&(i.attr("x",e.x).attr("y",e.y),i.attr("old_dis",n),i.css("-webkit-transform","translateY("+n+"px)"),b.stopPropagation(),c(i))}).on("touchend mouseup",function(b){b.preventDefault();var c=a(b.target).parent();c.attr("scrolling","false")}).on("wheel",function(b){var d=h,e=b.wheelDeltaY>0?1:-1,i=a(b.currentTarget),j=1*i.attr("old_dis"),k=j+Math.ceil(d/h)*h*e;k=k>0?g*h>k?k:g*h:Math.abs(k)+f>i.height()+(Math.round(f/h)-g-1)*h?f-(i.height()+(Math.round(f/h)-g-1)*h):k,i.attr("old_dis",k),i.css("-webkit-transform","translateY("+k+"px)"),b.stopPropagation(),c(i)}),b.find(".cancelbtn").on("touchstart click",function(){b.find(".popup_widget, .selectoverlay").hide()}),b.find(".choosedatebtn").on("touchstart click",function(b){a.BocSelect.selectOption(b)}),b.find(".selected_text, .select_wgt_icon").on("touchstart click",function(d){d.stopPropagation(),a.BocSelect.showSelectOptions(d),f=b.find(".options_content_container").height(),g=Math.ceil(Math.round(f/h)/2),e(d),b.find(".options_content_container .select_table-view").each(function(a,b){c(b)})})}a._widget_renders=a._widget_renders||{};var d=function(b){var c=[],d=b.match(/<option[^>]*>[^<>]*<\/option>/g);a.each(d,function(a,b){c.push({val:(b.match(/value=('|")[^<>'"]*('|")/)?b.match(/value=('|")[^<>'"]*('|")/)[0]:"").replace(/value=('|")/,"").replace(/'|"/,""),txt:b.replace(/<[^<>]*>/g,"")})});var e=a.analyzeWidgetProperties(b),f=new EJS({url:"views/wgt_tmpl/select_n.ejs"}).render({classes:e.classes,style:e.style,id:e.id,name:e.name,disabled:e.disabled,required:e.required,validator:e.validator,size:e.size,options:c},!0);return f};a._widget_renders.SelectWidget=d,a.BocSelect={showSelectOptions:function(b){a(".select_options_container, .selectoverlay").hide(),a(b.target).parents(".select_widget").children(".select_options_container, .selectoverlay").show(),b.stopPropagation()},selectOption:function(b){var c=a(b.target).parent().parent().parent(),d=a(b.target).siblings(".value").attr("value"),e=a(b.target).siblings(".value").text(),f=c.find("input").val();a(".select_widget .popup_widget, .select_widget .selectoverlay").hide(),c.find(".selected_text").find("span").text(e),c.find(".selected_text").find("input").val(d).attr("label",e);var g=c.attr("id");a.BocSelect.changeEvts[g]&&a.BocSelect.changeEvts[g].apply(null,[d,e,f]),a(".selectoverlay").hide(),b.stopPropagation()},changeEvts:[]},a.fn.bindSelectChange=function(b){var c=a(this).attr("id");if(!c)throw new Error("添加onchange事件的select必须带有ID");return a.BocSelect.changeEvts[c]=b,this},a.fn.addOptions=function(b){for(var c="",d=0;d<b.length;d++)b[d].selected&&(a(this).find(".selected_text span").html(b[d].txt),a(this).find(".selected_text input").val(b[d].val).attr(b[d].txt)),c+='<li class="select_table-view-cell selec_widget_opt" value="'+b[d].val+'" onclick="$.BocSelect.selectOption(event)">'+b[d].txt+"</li>";return a(this).find("ul").append(c),this},a.fn.clearSelect=function(){return a(this).find(".selected_text span").html(""),a(this).find("ul").html(""),this},a.fn.selectOpt=function(b){var c=a(this);return b?(c.find("input").val(b),c.find("li").each(function(d,e){a(e).attr("value")==b&&(c.find(".selected_text span").text(a(e).text()),c.find("input").attr("label",a(e).text()))}),c):c.find("input").val()},a.funAop(a.fn,{html:{after:function(a){return b(a)}},append:{after:function(a){return b(a)}}},!0)});