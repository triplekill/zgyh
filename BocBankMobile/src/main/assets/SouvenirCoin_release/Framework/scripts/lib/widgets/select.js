/*! BUILD: 2016-12-19 */
define("SelectWidget",["zepto"],function(a){a._widget_renders=a._widget_renders||[];var b=function(b){var c=[],d=b.match(/<option[^>]*>[^<>]*<\/option>/g);a.each(d,function(a,b){c.push({val:(b.match(/value=('|")[^<>'"]*('|")/)?b.match(/value=('|")[^<>'"]*('|")/)[0]:"").replace(/value=('|")/,"").replace(/'|"/,""),txt:b.replace(/<[^<>]*>/g,"")})});var e=a.analyzeWidgetProperties(b),f=new EJS({url:"views/wgt_tmpl/select.ejs"}).render({classes:e.classes,style:e.style,id:e.id,name:e.name,disabled:e.disabled,required:e.required,validator:e.validator,size:e.size,options:c},!0);return f};a._widget_renders.SelectWidget=b,a(document).on("click",function(){a(".select_widget .popup_widget, .select_widget .selectoverlay").hide()}),a.BocSelect={showSelectOptions:function(b){a(".select_options_container, .selectoverlay").hide(),a.isMinorScreen()?a(b.target).parents(".select_widget").children(".select_options_container, .selectoverlay").show():a(b.target).parents(".select_widget").children(".select_options_container").show(),b.stopPropagation()},selectOption:function(b){var c=a(b.target).parent().parent(),d=a(b.target).attr("value"),e=a(b.target).text(),f=c.siblings("input").val();c.siblings(".selected_text").find("span").text(e),c.siblings(".selected_text").find("input").val(d).attr("label",e);var g=c.parent().attr("id");a.BocSelect.changeEvts[g]&&a.BocSelect.changeEvts[g].apply(null,[d,e,f]),c.hide(),a(".selectoverlay").hide(),b.stopPropagation()},changeEvts:[]},a.fn.bindSelectChange=function(b){var c=a(this).attr("id");if(!c)throw new Error("添加onchange事件的select必须带有ID");return a.BocSelect.changeEvts[c]=b,this},a.fn.addOptions=function(b){for(var c="",d=0;d<b.length;d++)b[d].selected&&(a(this).find(".selected_text span").html(b[d].txt),a(this).find(".selected_text input").val(b[d].val).attr(b[d].txt)),c+='<li class="select_table-view-cell selec_widget_opt" value="'+b[d].val+'" onclick="$.BocSelect.selectOption(event)">'+b[d].txt+"</li>";return a(this).find("ul").append(c),this},a.fn.clearSelect=function(){return a(this).find(".selected_text span").html(""),a(this).find("ul").html(""),this},a.fn.selectOpt=function(b){var c=a(this);return b?(c.find("input").val(b),c.find("li").each(function(d,e){a(e).val()==b&&c.find("span").text(a(e).text())}),c):c.find("input").val()}});