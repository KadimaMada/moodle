YUI.add("moodle-mod_hsuforum-io",function(e,t){function i(){i.superclass.constructor.apply(this,arguments)}var n=e.Lang,r=M.cfg.wwwroot+"/mod/hsuforum/route.php";i.NAME=t,i.ATTRS={contextId:{value:undefined},url:{value:r,validator:n.isString}},e.extend(i,e.Base,{_complete:function(t,r,i){var s={};try{s=e.JSON.parse(r.responseText)}catch(o){alert(o.name+": "+o.message);return}n.isValue(s.error)?alert(s.error):i.fn.call(i.context,s)},send:function(t,r,i,s){n.isString(s)||(s="GET"),n.isUndefined(t.contextid)&&!n.isUndefined(this.get("contextId"))&&(t.contextid=this.get("contextId")),e.io(this.get("url"),{method:s,context:this,arguments:{fn:r,context:i},data:t,on:{complete:this._complete}})},submitForm:function(t,r,i,s){n.isBoolean(s)||(s=!1);var o={method:"POST",context:this,arguments:{fn:r,context:i},on:{complete:this._complete},form:{id:t.generateID(),upload:s}};if(s){var u=this.get("url");e.use("io-upload-iframe",function(){e.io(u,o)})}else e.io(this.get("url"),o)}}),M.mod_hsuforum=M.mod_hsuforum||{},M.mod_hsuforum.Io=i},"@VERSION@",{requires:["base","io-base","io-form","io-upload-iframe","json-parse"]});