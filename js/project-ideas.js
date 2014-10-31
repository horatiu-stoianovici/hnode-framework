/*! jQuery UI - v1.10.4 - 2014-03-07
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */


(function(e,t){function i(t,i){var s,a,o,r=t.nodeName.toLowerCase();return"area"===r?(s=t.parentNode,a=s.name,t.href&&a&&"map"===s.nodeName.toLowerCase()?(o=e("img[usemap=#"+a+"]")[0],!!o&&n(o)):!1):(/input|select|textarea|button|object/.test(r)?!t.disabled:"a"===r?t.href||i:i)&&n(t)}function n(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var s=0,a=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,n){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),n&&n.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var n,s,a=e(this[0]);a.length&&a[0]!==document;){if(n=a.css("position"),("absolute"===n||"relative"===n||"fixed"===n)&&(s=parseInt(a.css("zIndex"),10),!isNaN(s)&&0!==s))return s;a=a.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++s)})},removeUniqueId:function(){return this.each(function(){a.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,n){return!!e.data(t,n[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),s=isNaN(n);return(s||n>=0)&&i(t,!s)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,n){function s(t,i,n,s){return e.each(a,function(){i-=parseFloat(e.css(t,"padding"+this))||0,n&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var a="Width"===n?["Left","Right"]:["Top","Bottom"],o=n.toLowerCase(),r={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+n]=function(i){return i===t?r["inner"+n].call(this):this.each(function(){e(this).css(o,s(this,i)+"px")})},e.fn["outer"+n]=function(t,i){return"number"!=typeof t?r["outer"+n].call(this,t):this.each(function(){e(this).css(o,s(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,n){var s,a=e.ui[t].prototype;for(s in n)a.plugins[s]=a.plugins[s]||[],a.plugins[s].push([i,n[s]])},call:function(e,t,i){var n,s=e.plugins[t];if(s&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(n=0;s.length>n;n++)e.options[s[n][0]]&&s[n][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var n=i&&"left"===i?"scrollLeft":"scrollTop",s=!1;return t[n]>0?!0:(t[n]=1,s=t[n]>0,t[n]=0,s)}})})(jQuery);(function(t,e){var i=0,s=Array.prototype.slice,n=t.cleanData;t.cleanData=function(e){for(var i,s=0;null!=(i=e[s]);s++)try{t(i).triggerHandler("remove")}catch(o){}n(e)},t.widget=function(i,s,n){var o,a,r,h,l={},c=i.split(".")[0];i=i.split(".")[1],o=c+"-"+i,n||(n=s,s=t.Widget),t.expr[":"][o.toLowerCase()]=function(e){return!!t.data(e,o)},t[c]=t[c]||{},a=t[c][i],r=t[c][i]=function(t,i){return this._createWidget?(arguments.length&&this._createWidget(t,i),e):new r(t,i)},t.extend(r,a,{version:n.version,_proto:t.extend({},n),_childConstructors:[]}),h=new s,h.options=t.widget.extend({},h.options),t.each(n,function(i,n){return t.isFunction(n)?(l[i]=function(){var t=function(){return s.prototype[i].apply(this,arguments)},e=function(t){return s.prototype[i].apply(this,t)};return function(){var i,s=this._super,o=this._superApply;return this._super=t,this._superApply=e,i=n.apply(this,arguments),this._super=s,this._superApply=o,i}}(),e):(l[i]=n,e)}),r.prototype=t.widget.extend(h,{widgetEventPrefix:a?h.widgetEventPrefix||i:i},l,{constructor:r,namespace:c,widgetName:i,widgetFullName:o}),a?(t.each(a._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,r,i._proto)}),delete a._childConstructors):s._childConstructors.push(r),t.widget.bridge(i,r)},t.widget.extend=function(i){for(var n,o,a=s.call(arguments,1),r=0,h=a.length;h>r;r++)for(n in a[r])o=a[r][n],a[r].hasOwnProperty(n)&&o!==e&&(i[n]=t.isPlainObject(o)?t.isPlainObject(i[n])?t.widget.extend({},i[n],o):t.widget.extend({},o):o);return i},t.widget.bridge=function(i,n){var o=n.prototype.widgetFullName||i;t.fn[i]=function(a){var r="string"==typeof a,h=s.call(arguments,1),l=this;return a=!r&&h.length?t.widget.extend.apply(null,[a].concat(h)):a,r?this.each(function(){var s,n=t.data(this,o);return n?t.isFunction(n[a])&&"_"!==a.charAt(0)?(s=n[a].apply(n,h),s!==n&&s!==e?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):e):t.error("no such method '"+a+"' for "+i+" widget instance"):t.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+a+"'")}):this.each(function(){var e=t.data(this,o);e?e.option(a||{})._init():t.data(this,o,new n(a,this))}),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),this.hoverable=t(),this.focusable=t(),s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(i,s){var n,o,a,r=i;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof i)if(r={},n=i.split("."),i=n.shift(),n.length){for(o=r[i]=t.widget.extend({},this.options[i]),a=0;n.length-1>a;a++)o[n[a]]=o[n[a]]||{},o=o[n[a]];if(i=n.pop(),1===arguments.length)return o[i]===e?null:o[i];o[i]=s}else{if(1===arguments.length)return this.options[i]===e?null:this.options[i];r[i]=s}return this._setOptions(r),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var o,a=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=o=t(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,o=this.widget()),t.each(n,function(n,r){function h(){return i||a.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof r?a[r]:r).apply(a,arguments):e}"string"!=typeof r&&(h.guid=r.guid=r.guid||h.guid||t.guid++);var l=n.match(/^(\w+)\s*(.*)$/),c=l[1]+a.eventNamespace,u=l[2];u?o.delegate(u,c,h):s.bind(c,h)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}})})(jQuery);(function(t){var e=!1;t(document).mouseup(function(){e=!1}),t.widget("ui.mouse",{version:"1.10.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.bind("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).bind("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!e){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,a="string"==typeof this.options.cancel&&i.target.nodeName?t(i.target).closest(this.options.cancel).length:!1;return n&&!a&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===t.data(i.target,this.widgetName+".preventClickEvent")&&t.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return s._mouseMove(t)},this._mouseUpDelegate=function(t){return s._mouseUp(t)},t(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),e=!0,!0)):!0}},_mouseMove:function(e){return t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button?this._mouseUp(e):this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){return t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),!1},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var a,o=Math.max,r=Math.abs,l=Math.round,h=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(a!==e)return a;var i,s,n=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),i=o.offsetWidth,n.css("overflow","scroll"),s=o.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),a=i-s},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,a="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:a?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var a,p,g,m,v,_,b=t(e.of),y=t.position.getWithinInfo(e.within),k=t.position.getScrollInfo(y),w=(e.collision||"flip").split(" "),D={};return _=n(b),b[0].preventDefault&&(e.at="left top"),p=_.width,g=_.height,m=_.offset,v=t.extend({},m),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=h.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=h.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),D[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===w.length&&(w[1]=w[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=g:"center"===e.at[1]&&(v.top+=g/2),a=i(D.at,p,g),v.left+=a[0],v.top+=a[1],this.each(function(){var n,h,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),_=s(this,"marginTop"),x=u+f+s(this,"marginRight")+k.width,C=d+_+s(this,"marginBottom")+k.height,M=t.extend({},v),T=i(D.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?M.left-=u:"center"===e.my[0]&&(M.left-=u/2),"bottom"===e.my[1]?M.top-=d:"center"===e.my[1]&&(M.top-=d/2),M.left+=T[0],M.top+=T[1],t.support.offsetFractions||(M.left=l(M.left),M.top=l(M.top)),n={marginLeft:f,marginTop:_},t.each(["left","top"],function(i,s){t.ui.position[w[i]]&&t.ui.position[w[i]][s](M,{targetWidth:p,targetHeight:g,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:x,collisionHeight:C,offset:[a[0]+T[0],a[1]+T[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(h=function(t){var i=m.left-M.left,s=i+p-u,n=m.top-M.top,a=n+g-d,l={target:{element:b,left:m.left,top:m.top,width:p,height:g},element:{element:c,left:M.left,top:M.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>a?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(l.horizontal="center"),d>g&&g>r(n+a)&&(l.vertical="middle"),l.important=o(r(i),r(s))>o(r(n),r(a))?"horizontal":"vertical",e.using.call(this,t,l)}),c.offset(t.extend(M,{using:h}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,l=n-r,h=r+e.collisionWidth-a-n;e.collisionWidth>a?l>0&&0>=h?(i=t.left+l+e.collisionWidth-a-n,t.left+=l-i):t.left=h>0&&0>=l?n:l>h?n+a-e.collisionWidth:n:l>0?t.left+=l:h>0?t.left-=h:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,l=n-r,h=r+e.collisionHeight-a-n;e.collisionHeight>a?l>0&&0>=h?(i=t.top+l+e.collisionHeight-a-n,t.top+=l-i):t.top=h>0&&0>=l?n:l>h?n+a-e.collisionHeight:n:l>0?t.top+=l:h>0?t.top-=h:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,a=n.offset.left+n.scrollLeft,o=n.width,l=n.isWindow?n.scrollLeft:n.offset.left,h=t.left-e.collisionPosition.marginLeft,c=h-l,u=h+e.collisionWidth-o-l,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-o-a,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-l,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,a=n.offset.top+n.scrollTop,o=n.height,l=n.isWindow?n.scrollTop:n.offset.top,h=t.top-e.collisionPosition.marginTop,c=h-l,u=h+e.collisionHeight-o-l,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,g=-2*e.offset[1];0>c?(s=t.top+p+f+g+e.collisionHeight-o-a,t.top+p+f+g>c&&(0>s||r(c)>s)&&(t.top+=p+f+g)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+g-l,t.top+p+f+g>u&&(i>0||u>r(i))&&(t.top+=p+f+g))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,a,o=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(o?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in s)e.style[a]=s[a];e.appendChild(r),i=o||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()})(jQuery);(function(t,e){var i="ui-effects-";t.effects={effect:{}},function(t,e){function i(t,e,i){var s=u[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:t>s.max?s.max:t)}function s(i){var s=h(),n=s._rgba=[];return i=i.toLowerCase(),f(l,function(t,a){var o,r=a.re.exec(i),l=r&&a.parse(r),h=a.space||"rgba";return l?(o=s[h](l),s[c[h].cache]=o[c[h].cache],n=s._rgba=o._rgba,!1):e}),n.length?("0,0,0,0"===n.join()&&t.extend(n,a.transparent),s):a[i]}function n(t,e,i){return i=(i+1)%1,1>6*i?t+6*(e-t)*i:1>2*i?e:2>3*i?t+6*(e-t)*(2/3-i):t}var a,o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],h=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=h.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),h.fn=t.extend(h.prototype,{parse:function(n,o,r,l){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(o),o=e);var u=this,d=t.type(n),p=this._rgba=[];return o!==e&&(n=[n,o,r,l],d="array"),"string"===d?this.parse(s(n)||a._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(n[e.idx],e)}),this):"object"===d?(n instanceof h?f(c,function(t,e){n[e.cache]&&(u[e.cache]=n[e.cache].slice())}):f(c,function(e,s){var a=s.cache;f(s.props,function(t,e){if(!u[a]&&s.to){if("alpha"===t||null==n[t])return;u[a]=s.to(u._rgba)}u[a][e.idx]=i(n[t],e,!0)}),u[a]&&0>t.inArray(null,u[a].slice(0,3))&&(u[a][3]=1,s.from&&(u._rgba=s.from(u[a])))}),this):e},is:function(t){var i=h(t),s=!0,n=this;return f(c,function(t,a){var o,r=i[a.cache];return r&&(o=n[a.cache]||a.to&&a.to(n._rgba)||[],f(a.props,function(t,i){return null!=r[i.idx]?s=r[i.idx]===o[i.idx]:e})),s}),s},_space:function(){var t=[],e=this;return f(c,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=h(t),n=s._space(),a=c[n],o=0===this.alpha()?h("transparent"):this,r=o[a.cache]||a.to(o._rgba),l=r.slice();return s=s[a.cache],f(a.props,function(t,n){var a=n.idx,o=r[a],h=s[a],c=u[n.type]||{};null!==h&&(null===o?l[a]=h:(c.mod&&(h-o>c.mod/2?o+=c.mod:o-h>c.mod/2&&(o-=c.mod)),l[a]=i((h-o)*e+o,n)))}),this[n](l)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=h(e)._rgba;return h(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),h.fn.parse.prototype=h.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,a=t[2]/255,o=t[3],r=Math.max(s,n,a),l=Math.min(s,n,a),h=r-l,c=r+l,u=.5*c;return e=l===r?0:s===r?60*(n-a)/h+360:n===r?60*(a-s)/h+120:60*(s-n)/h+240,i=0===h?0:.5>=u?h/c:h/(2-c),[Math.round(e)%360,i,u,null==o?1:o]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],a=t[3],o=.5>=s?s*(1+i):s+i-s*i,r=2*s-o;return[Math.round(255*n(r,o,e+1/3)),Math.round(255*n(r,o,e)),Math.round(255*n(r,o,e-1/3)),a]},f(c,function(s,n){var a=n.props,o=n.cache,l=n.to,c=n.from;h.fn[s]=function(s){if(l&&!this[o]&&(this[o]=l(this._rgba)),s===e)return this[o].slice();var n,r=t.type(s),u="array"===r||"object"===r?s:arguments,d=this[o].slice();return f(a,function(t,e){var s=u["object"===r?t:e.idx];null==s&&(s=d[e.idx]),d[e.idx]=i(s,e)}),c?(n=h(c(d)),n[o]=d,n):h(d)},f(a,function(e,i){h.fn[e]||(h.fn[e]=function(n){var a,o=t.type(n),l="alpha"===e?this._hsla?"hsla":"rgba":s,h=this[l](),c=h[i.idx];return"undefined"===o?c:("function"===o&&(n=n.call(this,c),o=t.type(n)),null==n&&i.empty?this:("string"===o&&(a=r.exec(n),a&&(n=c+parseFloat(a[2])*("+"===a[1]?1:-1))),h[i.idx]=n,this[l](h)))})})}),h.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,n){var a,o,r="";if("transparent"!==n&&("string"!==t.type(n)||(a=s(n)))){if(n=h(a||n),!d.rgba&&1!==n._rgba[3]){for(o="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&o&&o.style;)try{r=t.css(o,"backgroundColor"),o=o.parentNode}catch(l){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(l){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=h(e.elem,i),e.end=h(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},h.hook(o),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},a=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(e){var i,s,n=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,a={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(a[t.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(a[i]=n[i]);return a}function s(e,i){var s,n,o={};for(s in i)n=i[s],e[s]!==n&&(a[s]||(t.fx.step[s]||!isNaN(parseFloat(n)))&&(o[s]=n));return o}var n=["add","remove","toggle"],a={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,i){t.fx.step[i]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(jQuery.style(t.elem,i,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(e,a,o,r){var l=t.speed(a,o,r);return this.queue(function(){var a,o=t(this),r=o.attr("class")||"",h=l.children?o.find("*").addBack():o;h=h.map(function(){var e=t(this);return{el:e,start:i(this)}}),a=function(){t.each(n,function(t,i){e[i]&&o[i+"Class"](e[i])})},a(),h=h.map(function(){return this.end=i(this.el[0]),this.diff=s(this.start,this.end),this}),o.attr("class",r),h=h.map(function(){var e=this,i=t.Deferred(),s=t.extend({},l,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,s),i.promise()}),t.when.apply(t,h.get()).done(function(){a(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),l.complete.call(o[0])})})},t.fn.extend({addClass:function(e){return function(i,s,n,a){return s?t.effects.animateClass.call(this,{add:i},s,n,a):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,s,n,a){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},s,n,a):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(i){return function(s,n,a,o,r){return"boolean"==typeof n||n===e?a?t.effects.animateClass.call(this,n?{add:s}:{remove:s},a,o,r):i.apply(this,arguments):t.effects.animateClass.call(this,{toggle:s},n,a,o)}}(t.fn.toggleClass),switchClass:function(e,i,s,n,a){return t.effects.animateClass.call(this,{add:i,remove:e},s,n,a)}})}(),function(){function s(e,i,s,n){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(n=s,s=i,i={}),t.isFunction(s)&&(n=s,s=null),i&&t.extend(e,i),s=s||i.duration,e.duration=t.fx.off?0:"number"==typeof s?s:s in t.fx.speeds?t.fx.speeds[s]:t.fx.speeds._default,e.complete=n||i.complete,e}function n(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}t.extend(t.effects,{version:"1.10.4",save:function(t,e){for(var s=0;e.length>s;s++)null!==e[s]&&t.data(i+e[s],t[0].style[e[s]])},restore:function(t,s){var n,a;for(a=0;s.length>a;a++)null!==s[a]&&(n=t.data(i+s[a]),n===e&&(n=""),t.css(s[a],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},s=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:e.width(),height:e.height()},a=document.activeElement;try{a.id}catch(o){a=document.body}return e.wrap(s),(e[0]===a||t.contains(e[0],a))&&t(a).focus(),s=e.parent(),"static"===e.css("position")?(s.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,s){i[s]=e.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(n),s.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).focus()),e},setTransition:function(e,i,s,n){return n=n||{},t.each(i,function(t,i){var a=e.cssUnit(i);a[0]>0&&(n[i]=a[0]*s+a[1])}),n}}),t.fn.extend({effect:function(){function e(e){function s(){t.isFunction(a)&&a.call(n[0]),t.isFunction(e)&&e()}var n=t(this),a=i.complete,r=i.mode;(n.is(":hidden")?"hide"===r:"show"===r)?(n[r](),s()):o.call(n[0],i,s)}var i=s.apply(this,arguments),n=i.mode,a=i.queue,o=t.effects.effect[i.effect];return t.fx.off||!o?n?this[n](i.duration,i.complete):this.each(function(){i.complete&&i.complete.call(this)}):a===!1?this.each(e):this.queue(a||"fx",e)},show:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="show",this.effect.call(this,i)}}(t.fn.show),hide:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="hide",this.effect.call(this,i)}}(t.fn.hide),toggle:function(t){return function(e){if(n(e)||"boolean"==typeof e)return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="toggle",this.effect.call(this,i)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),s=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(s=[parseFloat(i),e])}),s}})}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;((e=Math.pow(2,--i))-1)/11>t;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}()})(jQuery);(function(t){var e=/up|down|vertical/,i=/up|left|vertical|horizontal/;t.effects.effect.blind=function(s,n){var a,o,r,l=t(this),h=["position","top","bottom","left","right","height","width"],c=t.effects.setMode(l,s.mode||"hide"),u=s.direction||"up",d=e.test(u),p=d?"height":"width",f=d?"top":"left",g=i.test(u),m={},v="show"===c;l.parent().is(".ui-effects-wrapper")?t.effects.save(l.parent(),h):t.effects.save(l,h),l.show(),a=t.effects.createWrapper(l).css({overflow:"hidden"}),o=a[p](),r=parseFloat(a.css(f))||0,m[p]=v?o:0,g||(l.css(d?"bottom":"right",0).css(d?"top":"left","auto").css({position:"absolute"}),m[f]=v?r:o+r),v&&(a.css(p,0),g||a.css(f,r+o)),a.animate(m,{duration:s.duration,easing:s.easing,queue:!1,complete:function(){"hide"===c&&l.hide(),t.effects.restore(l,h),t.effects.removeWrapper(l),n()}})}})(jQuery);(function(t){t.effects.effect.bounce=function(e,i){var s,n,a,o=t(this),r=["position","top","bottom","left","right","height","width"],l=t.effects.setMode(o,e.mode||"effect"),h="hide"===l,c="show"===l,u=e.direction||"up",d=e.distance,p=e.times||5,f=2*p+(c||h?1:0),g=e.duration/f,m=e.easing,v="up"===u||"down"===u?"top":"left",_="up"===u||"left"===u,b=o.queue(),y=b.length;for((c||h)&&r.push("opacity"),t.effects.save(o,r),o.show(),t.effects.createWrapper(o),d||(d=o["top"===v?"outerHeight":"outerWidth"]()/3),c&&(a={opacity:1},a[v]=0,o.css("opacity",0).css(v,_?2*-d:2*d).animate(a,g,m)),h&&(d/=Math.pow(2,p-1)),a={},a[v]=0,s=0;p>s;s++)n={},n[v]=(_?"-=":"+=")+d,o.animate(n,g,m).animate(a,g,m),d=h?2*d:d/2;h&&(n={opacity:0},n[v]=(_?"-=":"+=")+d,o.animate(n,g,m)),o.queue(function(){h&&o.hide(),t.effects.restore(o,r),t.effects.removeWrapper(o),i()}),y>1&&b.splice.apply(b,[1,0].concat(b.splice(y,f+1))),o.dequeue()}})(jQuery);(function(t){t.effects.effect.clip=function(e,i){var s,n,a,o=t(this),r=["position","top","bottom","left","right","height","width"],l=t.effects.setMode(o,e.mode||"hide"),h="show"===l,c=e.direction||"vertical",u="vertical"===c,d=u?"height":"width",p=u?"top":"left",f={};t.effects.save(o,r),o.show(),s=t.effects.createWrapper(o).css({overflow:"hidden"}),n="IMG"===o[0].tagName?s:o,a=n[d](),h&&(n.css(d,0),n.css(p,a/2)),f[d]=h?a:0,f[p]=h?0:a/2,n.animate(f,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){h||o.hide(),t.effects.restore(o,r),t.effects.removeWrapper(o),i()}})}})(jQuery);(function(t){t.effects.effect.drop=function(e,i){var s,n=t(this),a=["position","top","bottom","left","right","opacity","height","width"],o=t.effects.setMode(n,e.mode||"hide"),r="show"===o,l=e.direction||"left",h="up"===l||"down"===l?"top":"left",c="up"===l||"left"===l?"pos":"neg",u={opacity:r?1:0};t.effects.save(n,a),n.show(),t.effects.createWrapper(n),s=e.distance||n["top"===h?"outerHeight":"outerWidth"](!0)/2,r&&n.css("opacity",0).css(h,"pos"===c?-s:s),u[h]=(r?"pos"===c?"+=":"-=":"pos"===c?"-=":"+=")+s,n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===o&&n.hide(),t.effects.restore(n,a),t.effects.removeWrapper(n),i()}})}})(jQuery);(function(t){t.effects.effect.explode=function(e,i){function s(){b.push(this),b.length===u*d&&n()}function n(){p.css({visibility:"visible"}),t(b).remove(),g||p.hide(),i()}var a,o,r,l,h,c,u=e.pieces?Math.round(Math.sqrt(e.pieces)):3,d=u,p=t(this),f=t.effects.setMode(p,e.mode||"hide"),g="show"===f,m=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/d),_=Math.ceil(p.outerHeight()/u),b=[];for(a=0;u>a;a++)for(l=m.top+a*_,c=a-(u-1)/2,o=0;d>o;o++)r=m.left+o*v,h=o-(d-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-o*v,top:-a*_}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:_,left:r+(g?h*v:0),top:l+(g?c*_:0),opacity:g?0:1}).animate({left:r+(g?0:h*v),top:l+(g?0:c*_),opacity:g?1:0},e.duration||500,e.easing,s)}})(jQuery);(function(t){t.effects.effect.fade=function(e,i){var s=t(this),n=t.effects.setMode(s,e.mode||"toggle");s.animate({opacity:n},{queue:!1,duration:e.duration,easing:e.easing,complete:i})}})(jQuery);(function(t){t.effects.effect.fold=function(e,i){var s,n,a=t(this),o=["position","top","bottom","left","right","height","width"],r=t.effects.setMode(a,e.mode||"hide"),l="show"===r,h="hide"===r,c=e.size||15,u=/([0-9]+)%/.exec(c),d=!!e.horizFirst,p=l!==d,f=p?["width","height"]:["height","width"],g=e.duration/2,m={},v={};t.effects.save(a,o),a.show(),s=t.effects.createWrapper(a).css({overflow:"hidden"}),n=p?[s.width(),s.height()]:[s.height(),s.width()],u&&(c=parseInt(u[1],10)/100*n[h?0:1]),l&&s.css(d?{height:0,width:c}:{height:c,width:0}),m[f[0]]=l?n[0]:c,v[f[1]]=l?n[1]:0,s.animate(m,g,e.easing).animate(v,g,e.easing,function(){h&&a.hide(),t.effects.restore(a,o),t.effects.removeWrapper(a),i()})}})(jQuery);(function(t){t.effects.effect.highlight=function(e,i){var s=t(this),n=["backgroundImage","backgroundColor","opacity"],a=t.effects.setMode(s,e.mode||"show"),o={backgroundColor:s.css("backgroundColor")};"hide"===a&&(o.opacity=0),t.effects.save(s,n),s.show().css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(o,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===a&&s.hide(),t.effects.restore(s,n),i()}})}})(jQuery);(function(t){t.effects.effect.pulsate=function(e,i){var s,n=t(this),a=t.effects.setMode(n,e.mode||"show"),o="show"===a,r="hide"===a,l=o||"hide"===a,h=2*(e.times||5)+(l?1:0),c=e.duration/h,u=0,d=n.queue(),p=d.length;for((o||!n.is(":visible"))&&(n.css("opacity",0).show(),u=1),s=1;h>s;s++)n.animate({opacity:u},c,e.easing),u=1-u;n.animate({opacity:u},c,e.easing),n.queue(function(){r&&n.hide(),i()}),p>1&&d.splice.apply(d,[1,0].concat(d.splice(p,h+1))),n.dequeue()}})(jQuery);(function(t){t.effects.effect.puff=function(e,i){var s=t(this),n=t.effects.setMode(s,e.mode||"hide"),a="hide"===n,o=parseInt(e.percent,10)||150,r=o/100,l={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()};t.extend(e,{effect:"scale",queue:!1,fade:!0,mode:n,complete:i,percent:a?o:100,from:a?l:{height:l.height*r,width:l.width*r,outerHeight:l.outerHeight*r,outerWidth:l.outerWidth*r}}),s.effect(e)},t.effects.effect.scale=function(e,i){var s=t(this),n=t.extend(!0,{},e),a=t.effects.setMode(s,e.mode||"effect"),o=parseInt(e.percent,10)||(0===parseInt(e.percent,10)?0:"hide"===a?0:100),r=e.direction||"both",l=e.origin,h={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()},c={y:"horizontal"!==r?o/100:1,x:"vertical"!==r?o/100:1};n.effect="size",n.queue=!1,n.complete=i,"effect"!==a&&(n.origin=l||["middle","center"],n.restore=!0),n.from=e.from||("show"===a?{height:0,width:0,outerHeight:0,outerWidth:0}:h),n.to={height:h.height*c.y,width:h.width*c.x,outerHeight:h.outerHeight*c.y,outerWidth:h.outerWidth*c.x},n.fade&&("show"===a&&(n.from.opacity=0,n.to.opacity=1),"hide"===a&&(n.from.opacity=1,n.to.opacity=0)),s.effect(n)},t.effects.effect.size=function(e,i){var s,n,a,o=t(this),r=["position","top","bottom","left","right","width","height","overflow","opacity"],l=["position","top","bottom","left","right","overflow","opacity"],h=["width","height","overflow"],c=["fontSize"],u=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],d=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=t.effects.setMode(o,e.mode||"effect"),f=e.restore||"effect"!==p,g=e.scale||"both",m=e.origin||["middle","center"],v=o.css("position"),_=f?r:l,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&o.show(),s={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()},"toggle"===e.mode&&"show"===p?(o.from=e.to||b,o.to=e.from||s):(o.from=e.from||("show"===p?b:s),o.to=e.to||("hide"===p?b:s)),a={from:{y:o.from.height/s.height,x:o.from.width/s.width},to:{y:o.to.height/s.height,x:o.to.width/s.width}},("box"===g||"both"===g)&&(a.from.y!==a.to.y&&(_=_.concat(u),o.from=t.effects.setTransition(o,u,a.from.y,o.from),o.to=t.effects.setTransition(o,u,a.to.y,o.to)),a.from.x!==a.to.x&&(_=_.concat(d),o.from=t.effects.setTransition(o,d,a.from.x,o.from),o.to=t.effects.setTransition(o,d,a.to.x,o.to))),("content"===g||"both"===g)&&a.from.y!==a.to.y&&(_=_.concat(c).concat(h),o.from=t.effects.setTransition(o,c,a.from.y,o.from),o.to=t.effects.setTransition(o,c,a.to.y,o.to)),t.effects.save(o,_),o.show(),t.effects.createWrapper(o),o.css("overflow","hidden").css(o.from),m&&(n=t.effects.getBaseline(m,s),o.from.top=(s.outerHeight-o.outerHeight())*n.y,o.from.left=(s.outerWidth-o.outerWidth())*n.x,o.to.top=(s.outerHeight-o.to.outerHeight)*n.y,o.to.left=(s.outerWidth-o.to.outerWidth)*n.x),o.css(o.from),("content"===g||"both"===g)&&(u=u.concat(["marginTop","marginBottom"]).concat(c),d=d.concat(["marginLeft","marginRight"]),h=r.concat(u).concat(d),o.find("*[width]").each(function(){var i=t(this),s={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};f&&t.effects.save(i,h),i.from={height:s.height*a.from.y,width:s.width*a.from.x,outerHeight:s.outerHeight*a.from.y,outerWidth:s.outerWidth*a.from.x},i.to={height:s.height*a.to.y,width:s.width*a.to.x,outerHeight:s.height*a.to.y,outerWidth:s.width*a.to.x},a.from.y!==a.to.y&&(i.from=t.effects.setTransition(i,u,a.from.y,i.from),i.to=t.effects.setTransition(i,u,a.to.y,i.to)),a.from.x!==a.to.x&&(i.from=t.effects.setTransition(i,d,a.from.x,i.from),i.to=t.effects.setTransition(i,d,a.to.x,i.to)),i.css(i.from),i.animate(i.to,e.duration,e.easing,function(){f&&t.effects.restore(i,h)})})),o.animate(o.to,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){0===o.to.opacity&&o.css("opacity",o.from.opacity),"hide"===p&&o.hide(),t.effects.restore(o,_),f||("static"===v?o.css({position:"relative",top:o.to.top,left:o.to.left}):t.each(["top","left"],function(t,e){o.css(e,function(e,i){var s=parseInt(i,10),n=t?o.to.left:o.to.top;return"auto"===i?n+"px":s+n+"px"})})),t.effects.removeWrapper(o),i()}})}})(jQuery);(function(t){t.effects.effect.shake=function(e,i){var s,n=t(this),a=["position","top","bottom","left","right","height","width"],o=t.effects.setMode(n,e.mode||"effect"),r=e.direction||"left",l=e.distance||20,h=e.times||3,c=2*h+1,u=Math.round(e.duration/c),d="up"===r||"down"===r?"top":"left",p="up"===r||"left"===r,f={},g={},m={},v=n.queue(),_=v.length;for(t.effects.save(n,a),n.show(),t.effects.createWrapper(n),f[d]=(p?"-=":"+=")+l,g[d]=(p?"+=":"-=")+2*l,m[d]=(p?"-=":"+=")+2*l,n.animate(f,u,e.easing),s=1;h>s;s++)n.animate(g,u,e.easing).animate(m,u,e.easing);n.animate(g,u,e.easing).animate(f,u/2,e.easing).queue(function(){"hide"===o&&n.hide(),t.effects.restore(n,a),t.effects.removeWrapper(n),i()}),_>1&&v.splice.apply(v,[1,0].concat(v.splice(_,c+1))),n.dequeue()}})(jQuery);(function(t){t.effects.effect.slide=function(e,i){var s,n=t(this),a=["position","top","bottom","left","right","width","height"],o=t.effects.setMode(n,e.mode||"show"),r="show"===o,l=e.direction||"left",h="up"===l||"down"===l?"top":"left",c="up"===l||"left"===l,u={};t.effects.save(n,a),n.show(),s=e.distance||n["top"===h?"outerHeight":"outerWidth"](!0),t.effects.createWrapper(n).css({overflow:"hidden"}),r&&n.css(h,c?isNaN(s)?"-"+s:-s:s),u[h]=(r?c?"+=":"-=":c?"-=":"+=")+s,n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===o&&n.hide(),t.effects.restore(n,a),t.effects.removeWrapper(n),i()}})}})(jQuery);(function(t){t.effects.effect.transfer=function(e,i){var s=t(this),n=t(e.to),a="fixed"===n.css("position"),o=t("body"),r=a?o.scrollTop():0,l=a?o.scrollLeft():0,h=n.offset(),c={top:h.top-r,left:h.left-l,height:n.innerHeight(),width:n.innerWidth()},u=s.offset(),d=t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({top:u.top-r,left:u.left-l,height:s.innerHeight(),width:s.innerWidth(),position:a?"fixed":"absolute"}).animate(c,e.duration,e.easing,function(){d.remove(),i()})}})(jQuery);
/*
 * iosSlider - http://iosscripts.com/iosslider/
 * 
 * Touch Enabled, Responsive jQuery Horizontal Content Slider/Carousel/Image Gallery Plugin
 *
 * A jQuery plugin which allows you to integrate a customizable, cross-browser 
 * content slider into your web presence. Designed for use as a content slider, carousel, 
 * scrolling website banner, or image gallery.
 * 
 * Copyright (c) 2013 Marc Whitbread
 * 
 * Version: v1.3.43 (06/17/2014)
 * Minimum requirements: jQuery v1.4+
 *
 * Advanced requirements:
 * 1) jQuery bind() click event override on slide requires jQuery v1.6+
 *
 * Terms of use:
 *
 * 1) iosSlider is licensed under the Creative Commons – Attribution-NonCommercial 3.0 License.
 * 2) You may use iosSlider free for personal or non-profit purposes, without restriction.
 *	  Attribution is not required but always appreciated. For commercial projects, you
 *	  must purchase a license. You may download and play with the script before deciding to
 *	  fully implement it in your project. Making sure you are satisfied, and knowing iosSlider
 *	  is the right script for your project is paramount.
 * 3) You are not permitted to make the resources found on iosscripts.com available for
 *    distribution elsewhere "as is" without prior consent. If you would like to feature
 *    iosSlider on your site, please do not link directly to the resource zip files. Please
 *    link to the appropriate page on iosscripts.com where users can find the download.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

 
(function(b){var ma=0,X=0,ga=0,T=0,Ca="ontouchstart"in window||0<navigator.msMaxTouchPoints,Da="onorientationchange"in window,ca=!1,da=!1,Y=!1,na=!1,ia=!1,ea="pointer",ta="pointer",ja=[],N=[],ua=[],R=[],B=[],aa=[],y=[],n=[],t=[],oa=[],fa=[],f={showScrollbar:function(e,c){e.scrollbarHide&&b("."+c).css({opacity:e.scrollbarOpacity,filter:"alpha(opacity:"+100*e.scrollbarOpacity+")"})},hideScrollbar:function(b,c,a,v,g,d,n,t,y,B){if(b.scrollbar&&b.scrollbarHide)for(var w=a;w<a+25;w++)c[c.length]=f.hideScrollbarIntervalTimer(10* w,v[a],(a+24-w)/24,g,d,n,t,y,B,b)},hideScrollbarInterval:function(e,c,a,v,g,d,n,y,B){T=-1*e/t[y]*(g-d-n-v);f.setSliderOffset("."+a,T);b("."+a).css({opacity:B.scrollbarOpacity*c,filter:"alpha(opacity:"+B.scrollbarOpacity*c*100+")"})},slowScrollHorizontalInterval:function(e,c,a,v,g,d,I,O,J,K,w,x,A,r,u,m,D,k,l){if(l.infiniteSlider){if(a<=-1*t[m]||a<=-1*oa[m]){var q=b(e).width();if(a<=-1*oa[m]){var s=-1*w[0];b(c).each(function(a){f.setSliderOffset(b(c)[a],s+D);a<x.length&&(x[a]=-1*s);s+=u[a]});a+=-1* x[0];n[m]=-1*x[0]+D;t[m]=n[m]+q-d;y[m]=0}for(;a<=-1*t[m];){var h=0,C=f.getSliderOffset(b(c[0]),"x");b(c).each(function(a){f.getSliderOffset(this,"x")<C&&(C=f.getSliderOffset(this,"x"),h=a)});A=n[m]+q;f.setSliderOffset(b(c)[h],A);n[m]=-1*x[1]+D;t[m]=n[m]+q-d;x.splice(0,1);x.splice(x.length,0,-1*A+D);y[m]++}}if(a>=-1*n[m]||0<=a){q=b(e).width();if(0<a)for(s=-1*w[0],b(c).each(function(a){f.setSliderOffset(b(c)[a],s+D);a<x.length&&(x[a]=-1*s);s+=u[a]}),a-=-1*x[0],n[m]=-1*x[0]+D,t[m]=n[m]+q-d,y[m]=r;0< -1*x[0]-q+D;){var z=0,L=f.getSliderOffset(b(c[0]),"x");b(c).each(function(a){f.getSliderOffset(this,"x")>L&&(L=f.getSliderOffset(this,"x"),z=a)});A=n[m]-u[z];f.setSliderOffset(b(c)[z],A);x.splice(0,0,-1*A+D);x.splice(x.length-1,1);n[m]=-1*x[0]+D;t[m]=n[m]+q-d;y[m]--;B[m]++}for(;a>-1*n[m];)z=0,L=f.getSliderOffset(b(c[0]),"x"),b(c).each(function(a){f.getSliderOffset(this,"x")>L&&(L=f.getSliderOffset(this,"x"),z=a)}),A=n[m]-u[z],f.setSliderOffset(b(c)[z],A),x.splice(0,0,-1*A+D),x.splice(x.length-1,1), n[m]=-1*x[0]+D,t[m]=n[m]+q-d,y[m]--}}w=!1;d=f.calcActiveOffset(l,a,x,d,y[m],r,K,m);A=(d+y[m]+r)%r;l.infiniteSlider?A!=aa[m]&&(w=!0):d!=B[m]&&(w=!0);if(w&&(r=new f.args("change",l,e,b(e).children(":eq("+A+")"),A,k),b(e).parent().data("args",r),""!=l.onSlideChange))l.onSlideChange(r);B[m]=d;aa[m]=A;a=Math.floor(a);if(m!=b(e).parent().data("args").data.sliderNumber)return!0;f.setSliderOffset(e,a);l.scrollbar&&(T=Math.floor((-1*a-n[m]+D)/(t[m]-n[m]+D)*(I-O-g)),e=g-J,a>=-1*n[m]+D?(e=g-J- -1*T,f.setSliderOffset(b("."+ v),0)):(a<=-1*t[m]+1&&(e=I-O-J-T),f.setSliderOffset(b("."+v),T)),b("."+v).css({width:e+"px"}))},slowScrollHorizontal:function(e,c,a,v,g,d,I,O,J,K,w,x,A,r,u,m,D,k,l,q,s){var h=f.getSliderOffset(e,"x");d=[];var C=0,z=25/1024*O;frictionCoefficient=s.frictionCoefficient;elasticFrictionCoefficient=s.elasticFrictionCoefficient;snapFrictionCoefficient=s.snapFrictionCoefficient;g>s.snapVelocityThreshold&&s.snapToChildren&&!l?C=1:g<-1*s.snapVelocityThreshold&&s.snapToChildren&&!l&&(C=-1);g<-1*z?g=-1*z:g>z&& (g=z);b(e)[0]!==b(k)[0]&&(C*=-1,g*=-2);k=y[u];if(s.infiniteSlider)var L=n[u],p=t[u];l=[];for(var z=[],G=0;G<A.length;G++)l[G]=A[G],G<c.length&&(z[G]=f.getSliderOffset(b(c[G]),"x"));for(;1<g||-1>g;){g*=frictionCoefficient;h+=g;(h>-1*n[u]||h<-1*t[u])&&!s.infiniteSlider&&(g*=elasticFrictionCoefficient,h+=g);if(s.infiniteSlider){if(h<=-1*p){for(var p=b(e).width(),N=0,P=z[0],G=0;G<z.length;G++)z[G]<P&&(P=z[G],N=G);G=L+p;z[N]=G;L=-1*l[1]+q;p=L+p-O;l.splice(0,1);l.splice(l.length,0,-1*G+q);k++}if(h>=-1* L){p=b(e).width();N=0;P=z[0];for(G=0;G<z.length;G++)z[G]>P&&(P=z[G],N=G);G=L-r[N];z[N]=G;l.splice(0,0,-1*G+q);l.splice(l.length-1,1);L=-1*l[0]+q;p=L+p-O;k--}}d[d.length]=h}z=!1;g=f.calcActiveOffset(s,h,l,O,k,D,B[u],u);L=(g+k+D)%D;s.snapToChildren&&(s.infiniteSlider?L!=aa[u]&&(z=!0):g!=B[u]&&(z=!0),0>C&&!z?(g++,g>=A.length&&!s.infiniteSlider&&(g=A.length-1)):0<C&&!z&&(g--,0>g&&!s.infiniteSlider&&(g=0)));if(s.snapToChildren||(h>-1*n[u]||h<-1*t[u])&&!s.infiniteSlider){(h>-1*n[u]||h<-1*t[u])&&!s.infiniteSlider? d.splice(0,d.length):(d.splice(.1*d.length,d.length),h=0<d.length?d[d.length-1]:h);for(;h<l[g]-.5||h>l[g]+.5;)h=(h-l[g])*snapFrictionCoefficient+l[g],d[d.length]=h;d[d.length]=l[g]}C=1;0!=d.length%2&&(C=0);for(h=0;h<a.length;h++)clearTimeout(a[h]);k=(g+k+D)%D;L=0;for(h=C;h<d.length;h+=2)if(h==C||1<Math.abs(d[h]-L)||h>=d.length-2)L=d[h],a[a.length]=f.slowScrollHorizontalIntervalTimer(10*h,e,c,d[h],v,I,O,J,K,w,g,x,A,m,D,r,u,q,k,s);L=(g+y[u]+D)%D;""!=s.onSlideComplete&&1<d.length&&(a[a.length]=f.onSlideCompleteTimer(10* (h+1),s,e,b(e).children(":eq("+L+")"),k,u));a[a.length]=f.updateBackfaceVisibilityTimer(10*(h+1),c,u,D,s);R[u]=a;f.hideScrollbar(s,a,h,d,v,I,O,K,w,u)},onSlideComplete:function(e,c,a,v,g){a=new f.args("complete",e,b(c),a,v,v);b(c).parent().data("args",a);if(""!=e.onSlideComplete)e.onSlideComplete(a)},getSliderOffset:function(e,c){var a=0;c="x"==c?4:5;if(!ca||da||Y)a=parseInt(b(e).css("left"),10);else{for(var a=["-webkit-transform","-moz-transform","transform"],f,g=0;g<a.length;g++)if(void 0!=b(e).css(a[g])&& 0<b(e).css(a[g]).length){f=b(e).css(a[g]).split(",");break}a=void 0==f[c]?0:parseInt(f[c],10)}return a},setSliderOffset:function(e,c){c=parseInt(c,10);!ca||da||Y?b(e).css({left:c+"px"}):b(e).css({msTransform:"matrix(1,0,0,1,"+c+",0)",webkitTransform:"matrix(1,0,0,1,"+c+",0)",MozTransform:"matrix(1,0,0,1,"+c+",0)",transform:"matrix(1,0,0,1,"+c+",0)"})},setBrowserInfo:function(){null!=navigator.userAgent.match("WebKit")?(ea="-webkit-grab",ta="-webkit-grabbing"):null!=navigator.userAgent.match("Gecko")? (ia=!0,ea="move",ta="-moz-grabbing"):null!=navigator.userAgent.match("MSIE 7")?na=da=!0:null!=navigator.userAgent.match("MSIE 8")?na=Y=!0:null!=navigator.userAgent.match("MSIE 9")&&(na=!0)},has3DTransform:function(){var e=!1,c=b("<div />").css({msTransform:"matrix(1,1,1,1,1,1)",webkitTransform:"matrix(1,1,1,1,1,1)",MozTransform:"matrix(1,1,1,1,1,1)",transform:"matrix(1,1,1,1,1,1)"});""==c.attr("style")?e=!1:ia&&21<=parseInt(navigator.userAgent.split("/")[3],10)?e=!1:void 0!=c.attr("style")&&(e=!0); return e},getSlideNumber:function(b,c,a){return(b-y[c]+a)%a},calcActiveOffset:function(b,c,a,f,g,d,n,t){g=!1;b=[];var y;c>a[0]&&(y=0);c<a[a.length-1]&&(y=d-1);for(d=0;d<a.length;d++)a[d]<=c&&a[d]>c-f&&(g||a[d]==c||(b[b.length]=a[d-1]),b[b.length]=a[d],g=!0);0==b.length&&(b[0]=a[a.length-1]);for(d=g=0;d<b.length;d++)n=Math.abs(c-b[d]),n<f&&(g=b[d],f=n);for(d=0;d<a.length;d++)g==a[d]&&(y=d);return y},changeSlide:function(e,c,a,v,g,d,n,t,J,K,w,x,A,r,u,m,D,k){f.autoSlidePause(r);for(var l=0;l<v.length;l++)clearTimeout(v[l]); var q=Math.ceil(k.autoSlideTransTimer/10)+1,s=f.getSliderOffset(c,"x"),h=x[e],h=h-s,C=e-(B[r]+y[r]+m)%m;if(k.infiniteSlider){e=(e-y[r]+2*m)%m;l=!1;0==e&&2==m&&(e=m,x[e]=x[e-1]-b(a).eq(0).outerWidth(!0),l=!0);var h=x[e],h=h-s,z=[x[e]-b(c).width(),x[e]+b(c).width()];l&&x.splice(x.length-1,1);for(l=0;l<z.length;l++)Math.abs(z[l]-s)<Math.abs(h)&&(h=z[l]-s)}0>h&&-1==C?h+=b(c).width():0<h&&1==C&&(h-=b(c).width());C=[];f.showScrollbar(k,g);for(l=0;l<=q;l++)z=l,z/=q,z--,z=s+h*(Math.pow(z,5)+1),C[C.length]= z;q=(e+y[r]+m)%m;for(l=s=0;l<C.length;l++){if(0==l||1<Math.abs(C[l]-s)||l>=C.length-2)s=C[l],v[l]=f.slowScrollHorizontalIntervalTimer(10*(l+1),c,a,C[l],g,d,n,t,J,K,e,w,x,u,m,A,r,D,q,k);0==l&&""!=k.onSlideStart&&(h=(B[r]+y[r]+m)%m,k.onSlideStart(new f.args("start",k,c,b(c).children(":eq("+h+")"),h,e)))}s=!1;k.infiniteSlider?q!=aa[r]&&(s=!0):e!=B[r]&&(s=!0);s&&""!=k.onSlideComplete&&(v[v.length]=f.onSlideCompleteTimer(10*(l+1),k,c,b(c).children(":eq("+q+")"),q,r));R[r]=v;f.hideScrollbar(k,v,l,C,g,d, n,J,K,r);f.autoSlide(c,a,v,g,d,n,t,J,K,w,x,A,r,u,m,D,k)},changeOffset:function(e,c,a,v,g,d,I,O,J,K,w,x,A,r,u,m,D,k){f.autoSlidePause(r);for(var l=0;l<v.length;l++)clearTimeout(v[l]);k.infiniteSlider||(e=e>-1*n[r]+D?-1*n[r]+D:e,e=e<-1*t[r]?-1*t[r]:e);var q=Math.ceil(k.autoSlideTransTimer/10)+1,s=f.getSliderOffset(c,"x"),l=(f.calcActiveOffset(k,e,x,I,y,m,B[r],r)+y[r]+m)%m,h=x.slice();if(k.snapToChildren&&!k.infiniteSlider)e=x[l];else if(k.infiniteSlider&&k.snapToChildren){for(;e>=h[0];)h.splice(0,0, h[m-1]+b(c).width()),h.splice(m,1);for(;e<=h[m-1];)h.splice(m,0,h[0]-b(c).width()),h.splice(0,1);l=f.calcActiveOffset(k,e,h,I,y,m,B[r],r);e=h[l]}var C=e-s;e=[];var z;f.showScrollbar(k,g);for(h=0;h<=q;h++)z=h,z/=q,z--,z=s+C*(Math.pow(z,5)+1),e[e.length]=z;q=(l+y[r]+m)%m;for(h=s=0;h<e.length;h++){if(0==h||1<Math.abs(e[h]-s)||h>=e.length-2)s=e[h],v[h]=f.slowScrollHorizontalIntervalTimer(10*(h+1),c,a,e[h],g,d,I,O,J,K,l,w,x,u,m,A,r,D,q,k);0==h&&""!=k.onSlideStart&&(q=(B[r]+y[r]+m)%m,k.onSlideStart(new f.args("start", k,c,b(c).children(":eq("+q+")"),q,l)))}s=!1;k.infiniteSlider?q!=aa[r]&&(s=!0):l!=B[r]&&(s=!0);s&&""!=k.onSlideComplete&&(v[v.length]=f.onSlideCompleteTimer(10*(h+1),k,c,b(c).children(":eq("+q+")"),q,r));R[r]=v;f.hideScrollbar(k,v,h,e,g,d,I,J,K,r);f.autoSlide(c,a,v,g,d,I,O,J,K,w,x,A,r,u,m,D,k)},autoSlide:function(b,c,a,v,g,d,n,t,J,K,w,x,A,r,u,m,D){if(!N[A].autoSlide)return!1;f.autoSlidePause(A);ja[A]=setTimeout(function(){!D.infiniteSlider&&B[A]>w.length-1&&(B[A]-=u);f.changeSlide(B[A]+y[A]+1,b,c, a,v,g,d,n,t,J,K,w,x,A,r,u,m,D);f.autoSlide(b,c,a,v,g,d,n,t,J,K,w,x,A,r,u,m,D)},D.autoSlideTimer+D.autoSlideTransTimer)},autoSlidePause:function(b){clearTimeout(ja[b])},isUnselectable:function(e,c){return""!=c.unselectableSelector&&1==b(e).closest(c.unselectableSelector).length?!0:!1},slowScrollHorizontalIntervalTimer:function(b,c,a,v,g,d,n,t,y,B,w,x,A,r,u,m,D,k,l,q){return setTimeout(function(){f.slowScrollHorizontalInterval(c,a,v,g,d,n,t,y,B,w,x,A,r,u,m,D,k,l,q)},b)},onSlideCompleteTimer:function(b, c,a,v,g,d){return setTimeout(function(){f.onSlideComplete(c,a,v,g,d)},b)},hideScrollbarIntervalTimer:function(b,c,a,v,g,d,n,t,y,B){return setTimeout(function(){f.hideScrollbarInterval(c,a,v,g,d,n,t,y,B)},b)},updateBackfaceVisibilityTimer:function(b,c,a,v,g){return setTimeout(function(){f.updateBackfaceVisibility(c,a,v,g)},b)},updateBackfaceVisibility:function(e,c,a,v){c=(B[c]+y[c]+a)%a;for(var g=[],d=0;d<2*v.hardwareAccelBuffer;d++){var n=f.mod(c+d-v.hardwareAccelBuffer,a);if("visible"==b(e).eq(n).css("-webkit-backface-visibility")){g[g.length]= n;var t=f.mod(n+2*v.hardwareAccelBuffer,a),J=f.mod(n-2*v.hardwareAccelBuffer,a);b(e).eq(n).css("-webkit-backface-visibility","hidden");-1==g.indexOf(J)&&b(e).eq(J).css("-webkit-backface-visibility","");-1==g.indexOf(t)&&b(e).eq(t).css("-webkit-backface-visibility","")}}},mod:function(b,c){var a=b%c;return 0>a?a+c:a},args:function(e,c,a,v,g,d){this.prevSlideNumber=void 0==b(a).parent().data("args")?void 0:b(a).parent().data("args").prevSlideNumber;this.prevSlideObject=void 0==b(a).parent().data("args")? void 0:b(a).parent().data("args").prevSlideObject;this.targetSlideNumber=d+1;this.targetSlideObject=b(a).children(":eq("+d+")");this.slideChanged=!1;"load"==e?this.targetSlideObject=this.targetSlideNumber=void 0:"start"==e?this.targetSlideObject=this.targetSlideNumber=void 0:"change"==e?(this.slideChanged=!0,this.prevSlideNumber=void 0==b(a).parent().data("args")?c.startAtSlide:b(a).parent().data("args").currentSlideNumber,this.prevSlideObject=b(a).children(":eq("+this.prevSlideNumber+")")):"complete"== e&&(this.slideChanged=b(a).parent().data("args").slideChanged);this.settings=c;this.data=b(a).parent().data("iosslider");this.sliderObject=a;this.sliderContainerObject=b(a).parent();this.currentSlideObject=v;this.currentSlideNumber=g+1;this.currentSliderOffset=-1*f.getSliderOffset(a,"x")},preventDrag:function(b){b.preventDefault()},preventClick:function(b){b.stopImmediatePropagation();return!1},enableClick:function(){return!0}};f.setBrowserInfo();var $={init:function(e,c){ca=f.has3DTransform();var a= b.extend(!0,{elasticPullResistance:.6,frictionCoefficient:.92,elasticFrictionCoefficient:.6,snapFrictionCoefficient:.92,snapToChildren:!1,snapSlideCenter:!1,startAtSlide:1,scrollbar:!1,scrollbarDrag:!1,scrollbarHide:!0,scrollbarPaging:!1,scrollbarLocation:"top",scrollbarContainer:"",scrollbarOpacity:.4,scrollbarHeight:"4px",scrollbarBorder:"0",scrollbarMargin:"5px",scrollbarBackground:"#000",scrollbarBorderRadius:"100px",scrollbarShadow:"0 0 0 #000",scrollbarElasticPullResistance:.9,desktopClickDrag:!1, keyboardControls:!1,tabToAdvance:!1,responsiveSlideContainer:!0,responsiveSlides:!0,navSlideSelector:"",navPrevSelector:"",navNextSelector:"",autoSlideToggleSelector:"",autoSlide:!1,autoSlideTimer:5E3,autoSlideTransTimer:750,autoSlideHoverPause:!0,infiniteSlider:!1,snapVelocityThreshold:5,slideStartVelocityThreshold:0,horizontalSlideLockThreshold:5,verticalSlideLockThreshold:3,hardwareAccelBuffer:5,stageCSS:{position:"relative",top:"0",left:"0",overflow:"hidden",zIndex:1},unselectableSelector:"", onSliderLoaded:"",onSliderUpdate:"",onSliderResize:"",onSlideStart:"",onSlideChange:"",onSlideComplete:""},e);void 0==c&&(c=this);return b(c).each(function(c){function e(){f.autoSlidePause(d);va=b(F).find("a");za=b(F).find("[onclick]");pa=b(F).find("*");b(l).css("width","");b(l).css("height","");b(F).css("width","");E=b(F).children().not("script").get();ha=[];M=[];a.responsiveSlides&&b(E).css("width","");t[d]=0;p=[];m=b(l).parent().width();q=b(l).outerWidth(!0);a.responsiveSlideContainer&&(q=b(l).outerWidth(!0)> m?m:b(l).width());b(l).css({position:a.stageCSS.position,top:a.stageCSS.top,left:a.stageCSS.left,overflow:a.stageCSS.overflow,zIndex:a.stageCSS.zIndex,webkitPerspective:1E3,webkitBackfaceVisibility:"hidden",msTouchAction:"pan-y",width:q});b(a.unselectableSelector).css({cursor:"default"});for(var c=0;c<E.length;c++){ha[c]=b(E[c]).width();M[c]=b(E[c]).outerWidth(!0);var v=M[c];a.responsiveSlides&&(M[c]>q?(v=q+-1*(M[c]-ha[c]),ha[c]=v,M[c]=q):v=ha[c],b(E[c]).css({width:v}));b(E[c]).css({overflow:"hidden", position:"absolute"});p[c]=-1*t[d];t[d]=t[d]+v+(M[c]-ha[c])}a.snapSlideCenter&&(k=.5*(q-M[0]),a.responsiveSlides&&M[0]>q&&(k=0));oa[d]=2*t[d];for(c=0;c<E.length;c++)f.setSliderOffset(b(E[c]),-1*p[c]+t[d]+k),p[c]-=t[d];if(!a.infiniteSlider&&!a.snapSlideCenter){for(c=0;c<p.length&&!(p[c]<=-1*(2*t[d]-q));c++)ja=c;p.splice(ja+1,p.length);p[p.length]=-1*(2*t[d]-q)}for(c=0;c<p.length;c++)G[c]=p[c];L&&(N[d].startAtSlide=N[d].startAtSlide>p.length?p.length:N[d].startAtSlide,a.infiniteSlider?(N[d].startAtSlide= (N[d].startAtSlide-1+H)%H,B[d]=N[d].startAtSlide):(N[d].startAtSlide=0>N[d].startAtSlide-1?p.length-1:N[d].startAtSlide,B[d]=N[d].startAtSlide-1),aa[d]=B[d]);n[d]=t[d]+k;b(F).css({position:"relative",cursor:ea,webkitPerspective:"0",webkitBackfaceVisibility:"hidden",width:t[d]+"px"});U=t[d];t[d]=2*t[d]-q+2*k;(V=U+k<q||0==q?!0:!1)&&b(F).css({cursor:"default"});D=b(l).parent().outerHeight(!0);s=b(l).height();a.responsiveSlideContainer&&(s=s>D?D:s);b(l).css({height:s});f.setSliderOffset(F,p[B[d]]);if(a.infiniteSlider&& !V){c=f.getSliderOffset(b(F),"x");for(v=(y[d]+H)%H*-1;0>v;){var g=0,z=f.getSliderOffset(b(E[0]),"x");b(E).each(function(a){f.getSliderOffset(this,"x")<z&&(z=f.getSliderOffset(this,"x"),g=a)});var J=n[d]+U;f.setSliderOffset(b(E)[g],J);n[d]=-1*p[1]+k;t[d]=n[d]+U-q;p.splice(0,1);p.splice(p.length,0,-1*J+k);v++}for(;0<-1*p[0]-U+k&&a.snapSlideCenter&&L;){var O=0,P=f.getSliderOffset(b(E[0]),"x");b(E).each(function(a){f.getSliderOffset(this,"x")>P&&(P=f.getSliderOffset(this,"x"),O=a)});J=n[d]-M[O];f.setSliderOffset(b(E)[O], J);p.splice(0,0,-1*J+k);p.splice(p.length-1,1);n[d]=-1*p[0]+k;t[d]=n[d]+U-q;y[d]--;B[d]++}for(;c<=-1*t[d];)g=0,z=f.getSliderOffset(b(E[0]),"x"),b(E).each(function(a){f.getSliderOffset(this,"x")<z&&(z=f.getSliderOffset(this,"x"),g=a)}),J=n[d]+U,f.setSliderOffset(b(E)[g],J),n[d]=-1*p[1]+k,t[d]=n[d]+U-q,p.splice(0,1),p.splice(p.length,0,-1*J+k),y[d]++,B[d]--}f.setSliderOffset(F,p[B[d]]);f.updateBackfaceVisibility(E,d,H,a);a.desktopClickDrag||b(F).css({cursor:"default"});a.scrollbar&&(b("."+K).css({margin:a.scrollbarMargin, overflow:"hidden",display:"none"}),b("."+K+" ."+w).css({border:a.scrollbarBorder}),h=parseInt(b("."+K).css("marginLeft"))+parseInt(b("."+K).css("marginRight")),C=parseInt(b("."+K+" ."+w).css("borderLeftWidth"),10)+parseInt(b("."+K+" ."+w).css("borderRightWidth"),10),r=""!=a.scrollbarContainer?b(a.scrollbarContainer).width():q,u=q/U*(r-h),a.scrollbarHide||(ca=a.scrollbarOpacity),b("."+K).css({position:"absolute",left:0,width:r-h+"px",margin:a.scrollbarMargin}),"top"==a.scrollbarLocation?b("."+K).css("top", "0"):b("."+K).css("bottom","0"),b("."+K+" ."+w).css({borderRadius:a.scrollbarBorderRadius,background:a.scrollbarBackground,height:a.scrollbarHeight,width:u-C+"px",minWidth:a.scrollbarHeight,border:a.scrollbarBorder,webkitPerspective:1E3,webkitBackfaceVisibility:"hidden",position:"relative",opacity:ca,filter:"alpha(opacity:"+100*ca+")",boxShadow:a.scrollbarShadow}),f.setSliderOffset(b("."+K+" ."+w),Math.floor((-1*p[B[d]]-n[d]+k)/(t[d]-n[d]+k)*(r-h-u))),b("."+K).css({display:"block"}),x=b("."+K+" ."+ w),A=b("."+K));a.scrollbarDrag&&!V&&b("."+K+" ."+w).css({cursor:ea});a.infiniteSlider&&(S=(t[d]+q)/3);""!=a.navSlideSelector&&b(a.navSlideSelector).each(function(c){b(this).css({cursor:"pointer"});b(this).unbind(Q).bind(Q,function(e){"touchstart"==e.type?b(this).unbind("click.iosSliderEvent"):b(this).unbind("touchstart.iosSliderEvent");Q=e.type+".iosSliderEvent";f.changeSlide(c,F,E,I,w,u,q,r,h,C,G,p,M,d,S,H,k,a)})});""!=a.navPrevSelector&&(b(a.navPrevSelector).css({cursor:"pointer"}),b(a.navPrevSelector).unbind(Q).bind(Q, function(c){"touchstart"==c.type?b(this).unbind("click.iosSliderEvent"):b(this).unbind("touchstart.iosSliderEvent");Q=c.type+".iosSliderEvent";c=(B[d]+y[d]+H)%H;(0<c||a.infiniteSlider)&&f.changeSlide(c-1,F,E,I,w,u,q,r,h,C,G,p,M,d,S,H,k,a)}));""!=a.navNextSelector&&(b(a.navNextSelector).css({cursor:"pointer"}),b(a.navNextSelector).unbind(Q).bind(Q,function(c){"touchstart"==c.type?b(this).unbind("click.iosSliderEvent"):b(this).unbind("touchstart.iosSliderEvent");Q=c.type+".iosSliderEvent";c=(B[d]+y[d]+ H)%H;(c<p.length-1||a.infiniteSlider)&&f.changeSlide(c+1,F,E,I,w,u,q,r,h,C,G,p,M,d,S,H,k,a)}));a.autoSlide&&!V&&""!=a.autoSlideToggleSelector&&(b(a.autoSlideToggleSelector).css({cursor:"pointer"}),b(a.autoSlideToggleSelector).unbind(Q).bind(Q,function(c){"touchstart"==c.type?b(this).unbind("click.iosSliderEvent"):b(this).unbind("touchstart.iosSliderEvent");Q=c.type+".iosSliderEvent";ka?(f.autoSlide(F,E,I,w,u,q,r,h,C,G,p,M,d,S,H,k,a),ka=!1,b(a.autoSlideToggleSelector).removeClass("on")):(f.autoSlidePause(d), ka=!0,b(a.autoSlideToggleSelector).addClass("on"))}));f.autoSlide(F,E,I,w,u,q,r,h,C,G,p,M,d,S,H,k,a);b(l).bind("mouseleave.iosSliderEvent",function(){if(ka)return!0;f.autoSlide(F,E,I,w,u,q,r,h,C,G,p,M,d,S,H,k,a)});b(l).bind("touchend.iosSliderEvent",function(){if(ka)return!0;f.autoSlide(F,E,I,w,u,q,r,h,C,G,p,M,d,S,H,k,a)});a.autoSlideHoverPause&&b(l).bind("mouseenter.iosSliderEvent",function(){f.autoSlidePause(d)});b(l).data("iosslider",{obj:Aa,settings:a,scrollerNode:F,slideNodes:E,numberOfSlides:H, centeredSlideOffset:k,sliderNumber:d,originalOffsets:G,childrenOffsets:p,sliderMax:t[d],scrollbarClass:w,scrollbarWidth:u,scrollbarStageWidth:r,stageWidth:q,scrollMargin:h,scrollBorder:C,infiniteSliderOffset:y[d],infiniteSliderWidth:S,slideNodeOuterWidths:M,shortContent:V});L=!1;return!0}ma++;var d=ma,I=[];N[d]=b.extend({},a);n[d]=0;t[d]=0;var O=[0,0],J=[0,0],K="scrollbarBlock"+ma,w="scrollbar"+ma,x,A,r,u,m,D,k=0,l=b(this),q,s,h,C,z,L=!0;c=-1;var p,G=[],ca=0,P=0,ia=0,F=b(this).children(":first-child"), E,ha,M,H=b(F).children().not("script").length,W=!1,ja=0,wa=!1,qa=void 0,S;y[d]=0;var V=!1,ka=!1;ua[d]=!1;var Z,ra=!1,la=!1,Q="touchstart.iosSliderEvent click.iosSliderEvent",U,va,za,pa;fa[d]=!1;R[d]=[];a.scrollbarDrag&&(a.scrollbar=!0,a.scrollbarHide=!1);var Aa=b(this);if(void 0!=Aa.data("iosslider"))return!0;14.2<=parseInt(b().jquery.split(".").join(""),10)?b(this).delegate("img","dragstart.iosSliderEvent",function(a){a.preventDefault()}):b(this).find("img").bind("dragstart.iosSliderEvent",function(a){a.preventDefault()}); a.infiniteSlider&&(a.scrollbar=!1);a.infiniteSlider&&1==H&&(a.infiniteSlider=!1);a.scrollbar&&(""!=a.scrollbarContainer?b(a.scrollbarContainer).append("<div class = '"+K+"'><div class = '"+w+"'></div></div>"):b(F).parent().append("<div class = '"+K+"'><div class = '"+w+"'></div></div>"));if(!e())return!0;b(this).find("a").bind("mousedown",f.preventDrag);b(this).find("[onclick]").bind("click",f.preventDrag).each(function(){b(this).data("onclick",this.onclick)});c=f.calcActiveOffset(a,f.getSliderOffset(b(F), "x"),p,q,y[d],H,void 0,d);c=(c+y[d]+H)%H;c=new f.args("load",a,F,b(F).children(":eq("+c+")"),c,c);b(l).data("args",c);if(""!=a.onSliderLoaded)a.onSliderLoaded(c);a.scrollbarPaging&&a.scrollbar&&!V&&(b(A).css("cursor","pointer"),b(A).bind("click.iosSliderEvent",function(a){this==a.target&&(a.pageX>b(x).offset().left?$.nextPage(l):$.prevPage(l))}));if(N[d].responsiveSlides||N[d].responsiveSlideContainer)c=Da?"orientationchange":"resize",b(window).bind(c+".iosSliderEvent-"+d,function(){if(!e())return!0; var c=b(l).data("args");if(""!=a.onSliderResize)a.onSliderResize(c)});!a.keyboardControls&&!a.tabToAdvance||V||b(document).bind("keydown.iosSliderEvent",function(b){da||Y||(b=b.originalEvent);if("INPUT"==b.target.nodeName||fa[d])return!0;if(37==b.keyCode&&a.keyboardControls)b.preventDefault(),b=(B[d]+y[d]+H)%H,(0<b||a.infiniteSlider)&&f.changeSlide(b-1,F,E,I,w,u,q,r,h,C,G,p,M,d,S,H,k,a);else if(39==b.keyCode&&a.keyboardControls||9==b.keyCode&&a.tabToAdvance)b.preventDefault(),b=(B[d]+y[d]+H)%H,(b< p.length-1||a.infiniteSlider)&&f.changeSlide(b+1,F,E,I,w,u,q,r,h,C,G,p,M,d,S,H,k,a)});if(Ca||a.desktopClickDrag){var ba=!1,xa=!1;c=b(F);var sa=b(F),ya=!1;a.scrollbarDrag&&(c=c.add(x),sa=sa.add(A));b(c).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent",function(c){b(window).one("scroll.iosSliderEvent",function(a){ba=!1});if(ba)return!0;ba=!0;xa=!1;"touchstart"==c.type?b(sa).unbind("mousedown.iosSliderEvent"):b(sa).unbind("touchstart.iosSliderEvent");if(fa[d]||V||(ya=f.isUnselectable(c.target, a)))return W=ba=!1,!0;Z=b(this)[0]===b(x)[0]?x:F;da||Y||(c=c.originalEvent);f.autoSlidePause(d);pa.unbind(".disableClick");if("touchstart"==c.type)eventX=c.touches[0].pageX,eventY=c.touches[0].pageY;else{if(window.getSelection)window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges();else if(document.selection)if(Y)try{document.selection.empty()}catch(e){}else document.selection.empty();eventX=c.pageX;eventY=c.pageY;wa= !0;qa=F;b(this).css({cursor:ta})}O=[0,0];J=[0,0];X=0;W=!1;for(c=0;c<I.length;c++)clearTimeout(I[c]);c=f.getSliderOffset(F,"x");c>-1*n[d]+k+U?(c=-1*n[d]+k+U,f.setSliderOffset(b("."+w),c),b("."+w).css({width:u-C+"px"})):c<-1*t[d]&&(c=-1*t[d],f.setSliderOffset(b("."+w),r-h-u),b("."+w).css({width:u-C+"px"}));c=b(this)[0]===b(x)[0]?n[d]:0;P=-1*(f.getSliderOffset(this,"x")-eventX-c);f.getSliderOffset(this,"y");O[1]=eventX;J[1]=eventY;la=!1});b(document).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent", function(c){da||Y||(c=c.originalEvent);if(fa[d]||V||ya||!ba)return!0;var e=0;if("touchmove"==c.type)eventX=c.touches[0].pageX,eventY=c.touches[0].pageY;else{if(window.getSelection)window.getSelection().empty||window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges();else if(document.selection)if(Y)try{document.selection.empty()}catch(v){}else document.selection.empty();eventX=c.pageX;eventY=c.pageY;if(!wa||!na&&("undefined"!=typeof c.webkitMovementX||"undefined"!=typeof c.webkitMovementY)&& 0===c.webkitMovementY&&0===c.webkitMovementX)return!0}O[0]=O[1];O[1]=eventX;X=(O[1]-O[0])/2;J[0]=J[1];J[1]=eventY;ga=(J[1]-J[0])/2;if(!W){var g=(B[d]+y[d]+H)%H,g=new f.args("start",a,F,b(F).children(":eq("+g+")"),g,void 0);b(l).data("args",g);if(""!=a.onSlideStart)a.onSlideStart(g)}(ga>a.verticalSlideLockThreshold||ga<-1*a.verticalSlideLockThreshold)&&"touchmove"==c.type&&!W&&(ra=!0);(X>a.horizontalSlideLockThreshold||X<-1*a.horizontalSlideLockThreshold)&&"touchmove"==c.type&&c.preventDefault();if(X> a.slideStartVelocityThreshold||X<-1*a.slideStartVelocityThreshold)W=!0;if(W&&!ra){var g=f.getSliderOffset(F,"x"),m=b(Z)[0]===b(x)[0]?n[d]:k,s=b(Z)[0]===b(x)[0]?(n[d]-t[d]-k)/(r-h-u):1,A=b(Z)[0]===b(x)[0]?a.scrollbarElasticPullResistance:a.elasticPullResistance,D=a.snapSlideCenter&&b(Z)[0]===b(x)[0]?0:k,K=a.snapSlideCenter&&b(Z)[0]===b(x)[0]?k:0;"touchmove"==c.type&&(ia!=c.touches.length&&(P=-1*g+eventX),ia=c.touches.length);if(a.infiniteSlider){if(g<=-1*t[d]){var I=b(F).width();if(g<=-1*oa[d]){var L= -1*G[0];b(E).each(function(a){f.setSliderOffset(b(E)[a],L+k);a<p.length&&(p[a]=-1*L);L+=M[a]});P-=-1*p[0];n[d]=-1*p[0]+k;t[d]=n[d]+I-q;y[d]=0}else{var N=0,S=f.getSliderOffset(b(E[0]),"x");b(E).each(function(a){f.getSliderOffset(this,"x")<S&&(S=f.getSliderOffset(this,"x"),N=a)});A=n[d]+I;f.setSliderOffset(b(E)[N],A);n[d]=-1*p[1]+k;t[d]=n[d]+I-q;p.splice(0,1);p.splice(p.length,0,-1*A+k);y[d]++}}if(g>=-1*n[d]||0<=g)if(I=b(F).width(),0<=g)for(L=-1*G[0],b(E).each(function(a){f.setSliderOffset(b(E)[a], L+k);a<p.length&&(p[a]=-1*L);L+=M[a]}),P+=-1*p[0],n[d]=-1*p[0]+k,t[d]=n[d]+I-q,y[d]=H;0<-1*p[0]-I+k;){var Q=0,R=f.getSliderOffset(b(E[0]),"x");b(E).each(function(a){f.getSliderOffset(this,"x")>R&&(R=f.getSliderOffset(this,"x"),Q=a)});A=n[d]-M[Q];f.setSliderOffset(b(E)[Q],A);p.splice(0,0,-1*A+k);p.splice(p.length-1,1);n[d]=-1*p[0]+k;t[d]=n[d]+I-q;y[d]--;B[d]++}else Q=0,R=f.getSliderOffset(b(E[0]),"x"),b(E).each(function(a){f.getSliderOffset(this,"x")>R&&(R=f.getSliderOffset(this,"x"),Q=a)}),A=n[d]- M[Q],f.setSliderOffset(b(E)[Q],A),p.splice(0,0,-1*A+k),p.splice(p.length-1,1),n[d]=-1*p[0]+k,t[d]=n[d]+I-q,y[d]--}else I=b(F).width(),g>-1*n[d]+k&&(e=(n[d]+-1*(P-m-eventX+D)*s-m)*A*-1/s),g<-1*t[d]&&(e=(t[d]+K+-1*(P-m-eventX)*s-m)*A*-1/s);f.setSliderOffset(F,-1*(P-m-eventX-e)*s-m+K);a.scrollbar&&(f.showScrollbar(a,w),T=Math.floor((P-eventX-e-n[d]+D)/(t[d]-n[d]+k)*(r-h-u)*s),g=u,0>=T?(g=u-C- -1*T,f.setSliderOffset(b("."+w),0),b("."+w).css({width:g+"px"})):T>=r-h-C-u?(g=r-h-C-T,f.setSliderOffset(b("."+ w),T),b("."+w).css({width:g+"px"})):f.setSliderOffset(b("."+w),T));"touchmove"==c.type&&(z=c.touches[0].pageX);c=!1;e=f.calcActiveOffset(a,-1*(P-eventX-e),p,q,y[d],H,void 0,d);g=(e+y[d]+H)%H;a.infiniteSlider?g!=aa[d]&&(c=!0):e!=B[d]&&(c=!0);if(c){B[d]=e;aa[d]=g;la=!0;g=new f.args("change",a,F,b(F).children(":eq("+g+")"),g,g);b(l).data("args",g);if(""!=a.onSlideChange)a.onSlideChange(g);f.updateBackfaceVisibility(E,d,H,a)}}});var Ba=b(window);if(Y||da)Ba=b(document);b(c).bind("touchcancel.iosSliderEvent touchend.iosSliderEvent", function(b){b=b.originalEvent;if(xa)return!1;xa=!0;if(fa[d]||V||ya)return!0;if(0!=b.touches.length)for(var c=0;c<b.touches.length;c++)b.touches[c].pageX==z&&f.slowScrollHorizontal(F,E,I,w,X,ga,u,q,r,h,C,G,p,M,d,S,H,Z,la,k,a);else f.slowScrollHorizontal(F,E,I,w,X,ga,u,q,r,h,C,G,p,M,d,S,H,Z,la,k,a);ba=ra=!1;return!0});b(Ba).bind("mouseup.iosSliderEvent-"+d,function(c){W?va.unbind("click.disableClick").bind("click.disableClick",f.preventClick):va.unbind("click.disableClick").bind("click.disableClick", f.enableClick);za.each(function(){this.onclick=function(a){if(W)return!1;b(this).data("onclick")&&b(this).data("onclick").call(this,a||window.event)};this.onclick=b(this).data("onclick")});1.8<=parseFloat(b().jquery)?pa.each(function(){var a=b._data(this,"events");if(void 0!=a&&void 0!=a.click&&"iosSliderEvent"!=a.click[0].namespace){if(!W)return!1;b(this).one("click.disableClick",f.preventClick);var a=b._data(this,"events").click,c=a.pop();a.splice(0,0,c)}}):1.6<=parseFloat(b().jquery)&&pa.each(function(){var a= b(this).data("events");if(void 0!=a&&void 0!=a.click&&"iosSliderEvent"!=a.click[0].namespace){if(!W)return!1;b(this).one("click.disableClick",f.preventClick);var a=b(this).data("events").click,c=a.pop();a.splice(0,0,c)}});if(!ua[d]){if(V)return!0;a.desktopClickDrag&&b(F).css({cursor:ea});a.scrollbarDrag&&b(x).css({cursor:ea});wa=!1;if(void 0==qa)return!0;f.slowScrollHorizontal(qa,E,I,w,X,ga,u,q,r,h,C,G,p,M,d,S,H,Z,la,k,a);qa=void 0}ba=ra=!1})}})},destroy:function(e,c){void 0==c&&(c=this);return b(c).each(function(){var a= b(this),c=a.data("iosslider");if(void 0==c)return!1;void 0==e&&(e=!0);f.autoSlidePause(c.sliderNumber);ua[c.sliderNumber]=!0;b(window).unbind(".iosSliderEvent-"+c.sliderNumber);b(document).unbind(".iosSliderEvent-"+c.sliderNumber);b(document).unbind("keydown.iosSliderEvent");b(this).unbind(".iosSliderEvent");b(this).children(":first-child").unbind(".iosSliderEvent");b(this).children(":first-child").children().unbind(".iosSliderEvent");b(c.settings.scrollbarBlockNode).unbind(".iosSliderEvent");e&& (b(this).attr("style",""),b(this).children(":first-child").attr("style",""),b(this).children(":first-child").children().attr("style",""),b(c.settings.navSlideSelector).attr("style",""),b(c.settings.navPrevSelector).attr("style",""),b(c.settings.navNextSelector).attr("style",""),b(c.settings.autoSlideToggleSelector).attr("style",""),b(c.settings.unselectableSelector).attr("style",""));c.settings.scrollbar&&b(".scrollbarBlock"+c.sliderNumber).remove();for(var c=R[c.sliderNumber],g=0;g<c.length;g++)clearTimeout(c[g]); a.removeData("iosslider");a.removeData("args")})},update:function(e){void 0==e&&(e=this);return b(e).each(function(){var c=b(this),a=c.data("iosslider");if(void 0==a)return!1;a.settings.startAtSlide=c.data("args").currentSlideNumber;$.destroy(!1,this);1!=a.numberOfSlides&&a.settings.infiniteSlider&&(a.settings.startAtSlide=(B[a.sliderNumber]+1+y[a.sliderNumber]+a.numberOfSlides)%a.numberOfSlides);$.init(a.settings,this);c=new f.args("update",a.settings,a.scrollerNode,b(a.scrollerNode).children(":eq("+ (a.settings.startAtSlide-1)+")"),a.settings.startAtSlide-1,a.settings.startAtSlide-1);b(a.stageNode).data("args",c);if(""!=a.settings.onSliderUpdate)a.settings.onSliderUpdate(c)})},addSlide:function(e,c){return this.each(function(){var a=b(this),f=a.data("iosslider");if(void 0==f)return!1;0==b(f.scrollerNode).children().length?(b(f.scrollerNode).append(e),a.data("args").currentSlideNumber=1):f.settings.infiniteSlider?(1==c?b(f.scrollerNode).children(":eq(0)").before(e):b(f.scrollerNode).children(":eq("+ (c-2)+")").after(e),-1>y[f.sliderNumber]&&B[f.sliderNumber]--,a.data("args").currentSlideNumber>=c&&B[f.sliderNumber]++):(c<=f.numberOfSlides?b(f.scrollerNode).children(":eq("+(c-1)+")").before(e):b(f.scrollerNode).children(":eq("+(c-2)+")").after(e),a.data("args").currentSlideNumber>=c&&a.data("args").currentSlideNumber++);a.data("iosslider").numberOfSlides++;$.update(this)})},removeSlide:function(e){return this.each(function(){var c=b(this),a=c.data("iosslider");if(void 0==a)return!1;b(a.scrollerNode).children(":eq("+ (e-1)+")").remove();B[a.sliderNumber]>e-1&&B[a.sliderNumber]--;c.data("iosslider").numberOfSlides--;$.update(this)})},goToSlide:function(e,c,a){void 0==a&&(a=this);return b(a).each(function(){var a=b(this).data("iosslider");if(void 0==a||a.shortContent)return!1;e=e>a.childrenOffsets.length?a.childrenOffsets.length-1:e-1;void 0!=c&&(a.settings.autoSlideTransTimer=c);f.changeSlide(e,b(a.scrollerNode),b(a.slideNodes),R[a.sliderNumber],a.scrollbarClass,a.scrollbarWidth,a.stageWidth,a.scrollbarStageWidth, a.scrollMargin,a.scrollBorder,a.originalOffsets,a.childrenOffsets,a.slideNodeOuterWidths,a.sliderNumber,a.infiniteSliderWidth,a.numberOfSlides,a.centeredSlideOffset,a.settings)})},prevSlide:function(e){return this.each(function(){var c=b(this).data("iosslider");if(void 0==c||c.shortContent)return!1;var a=(B[c.sliderNumber]+y[c.sliderNumber]+c.numberOfSlides)%c.numberOfSlides;void 0!=e&&(c.settings.autoSlideTransTimer=e);(0<a||c.settings.infiniteSlider)&&f.changeSlide(a-1,b(c.scrollerNode),b(c.slideNodes), R[c.sliderNumber],c.scrollbarClass,c.scrollbarWidth,c.stageWidth,c.scrollbarStageWidth,c.scrollMargin,c.scrollBorder,c.originalOffsets,c.childrenOffsets,c.slideNodeOuterWidths,c.sliderNumber,c.infiniteSliderWidth,c.numberOfSlides,c.centeredSlideOffset,c.settings);B[c.sliderNumber]=a})},nextSlide:function(e){return this.each(function(){var c=b(this).data("iosslider");if(void 0==c||c.shortContent)return!1;var a=(B[c.sliderNumber]+y[c.sliderNumber]+c.numberOfSlides)%c.numberOfSlides;void 0!=e&&(c.settings.autoSlideTransTimer= e);(a<c.childrenOffsets.length-1||c.settings.infiniteSlider)&&f.changeSlide(a+1,b(c.scrollerNode),b(c.slideNodes),R[c.sliderNumber],c.scrollbarClass,c.scrollbarWidth,c.stageWidth,c.scrollbarStageWidth,c.scrollMargin,c.scrollBorder,c.originalOffsets,c.childrenOffsets,c.slideNodeOuterWidths,c.sliderNumber,c.infiniteSliderWidth,c.numberOfSlides,c.centeredSlideOffset,c.settings);B[c.sliderNumber]=a})},prevPage:function(e,c){void 0==c&&(c=this);return b(c).each(function(){var a=b(this).data("iosslider"); if(void 0==a)return!1;var c=f.getSliderOffset(a.scrollerNode,"x")+a.stageWidth;void 0!=e&&(a.settings.autoSlideTransTimer=e);f.changeOffset(c,b(a.scrollerNode),b(a.slideNodes),R[a.sliderNumber],a.scrollbarClass,a.scrollbarWidth,a.stageWidth,a.scrollbarStageWidth,a.scrollMargin,a.scrollBorder,a.originalOffsets,a.childrenOffsets,a.slideNodeOuterWidths,a.sliderNumber,a.infiniteSliderWidth,a.numberOfSlides,a.centeredSlideOffset,a.settings)})},nextPage:function(e,c){void 0==c&&(c=this);return b(c).each(function(){var a= b(this).data("iosslider");if(void 0==a)return!1;var c=f.getSliderOffset(a.scrollerNode,"x")-a.stageWidth;void 0!=e&&(a.settings.autoSlideTransTimer=e);f.changeOffset(c,b(a.scrollerNode),b(a.slideNodes),R[a.sliderNumber],a.scrollbarClass,a.scrollbarWidth,a.stageWidth,a.scrollbarStageWidth,a.scrollMargin,a.scrollBorder,a.originalOffsets,a.childrenOffsets,a.slideNodeOuterWidths,a.sliderNumber,a.infiniteSliderWidth,a.numberOfSlides,a.centeredSlideOffset,a.settings)})},lock:function(){return this.each(function(){var e= b(this).data("iosslider");if(void 0==e||e.shortContent)return!1;b(e.scrollerNode).css({cursor:"default"});fa[e.sliderNumber]=!0})},unlock:function(){return this.each(function(){var e=b(this).data("iosslider");if(void 0==e||e.shortContent)return!1;b(e.scrollerNode).css({cursor:ea});fa[e.sliderNumber]=!1})},getData:function(){return this.each(function(){var e=b(this).data("iosslider");return void 0==e||e.shortContent?!1:e})},autoSlidePause:function(){return this.each(function(){var e=b(this).data("iosslider"); if(void 0==e||e.shortContent)return!1;N[e.sliderNumber].autoSlide=!1;f.autoSlidePause(e.sliderNumber);return e})},autoSlidePlay:function(){return this.each(function(){var e=b(this).data("iosslider");if(void 0==e||e.shortContent)return!1;N[e.sliderNumber].autoSlide=!0;f.autoSlide(b(e.scrollerNode),b(e.slideNodes),R[e.sliderNumber],e.scrollbarClass,e.scrollbarWidth,e.stageWidth,e.scrollbarStageWidth,e.scrollMargin,e.scrollBorder,e.originalOffsets,e.childrenOffsets,e.slideNodeOuterWidths,e.sliderNumber, e.infiniteSliderWidth,e.numberOfSlides,e.centeredSlideOffset,e.settings);return e})}};b.fn.iosSlider=function(e){if($[e])return $[e].apply(this,Array.prototype.slice.call(arguments,1));if("object"!==typeof e&&e)b.error("invalid method call!");else return $.init.apply(this,arguments)}})(jQuery);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
;

/*!
 * jQuery Browser Plugin 0.0.6
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2014 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 30-03-2014
 */
!function(a,b){"use strict";var c,d;if(a.uaMatch=function(a){a=a.toLowerCase();var b=/(opr)[\/]([\w.]+)/.exec(a)||/(chrome)[ \/]([\w.]+)/.exec(a)||/(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[],c=/(ipad)/.exec(a)||/(iphone)/.exec(a)||/(android)/.exec(a)||/(windows phone)/.exec(a)||/(win)/.exec(a)||/(mac)/.exec(a)||/(linux)/.exec(a)||/(cros)/i.exec(a)||[];return{browser:b[3]||b[1]||"",version:b[2]||"0",platform:c[0]||""}},c=a.uaMatch(b.navigator.userAgent),d={},c.browser&&(d[c.browser]=!0,d.version=c.version,d.versionNumber=parseInt(c.version)),c.platform&&(d[c.platform]=!0),(d.android||d.ipad||d.iphone||d["windows phone"])&&(d.mobile=!0),(d.cros||d.mac||d.linux||d.win)&&(d.desktop=!0),(d.chrome||d.opr||d.safari)&&(d.webkit=!0),d.rv){var e="msie";c.browser=e,d[e]=!0}if(d.opr){var f="opera";c.browser=f,d[f]=!0}if(d.safari&&d.android){var g="android";c.browser=g,d[g]=!0}d.name=c.browser,d.platform=c.platform,a.browser=d}(jQuery,window);

/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,i,b){var j,k=$.event.special,c="location",d="hashchange",l="href",f=$.browser,g=document.documentMode,h=f.msie&&(g===b||g<8),e="on"+d in i&&!h;function a(m){m=m||i[c][l];return m.replace(/^[^#]*#?(.*)$/,"$1")}$[d+"Delay"]=100;k[d]=$.extend(k[d],{setup:function(){if(e){return false}$(j.start)},teardown:function(){if(e){return false}$(j.stop)}});j=(function(){var m={},r,n,o,q;function p(){o=q=function(s){return s};if(h){n=$('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;q=function(){return a(n.document[c][l])};o=function(u,s){if(u!==s){var t=n.document;t.open().close();t[c].hash="#"+u}};o(a())}}m.start=function(){if(r){return}var t=a();o||p();(function s(){var v=a(),u=q(t);if(v!==t){o(t=v,u);$(i).trigger(d)}else{if(u!==t){i[c][l]=i[c][l].replace(/#.*/,"")+"#"+u}}r=setTimeout(s,$[d+"Delay"])})()};m.stop=function(){if(!n){r&&clearTimeout(r);r=0}};return m})()})(jQuery,this);







$(window).ready(function() {


    if ($.browser.msie && parseFloat($.browser.version) <= 8) {

        $("body").append($("<script />", {
            src: "/js/vendor/isotope-v1.5.js"
        }));

    } else {

        $("body").append($("<script />", {
            src: "/js/vendor/isotope.js"
        }));

    }

    // Add responsive Google Map to page
    // if($('.gmap').length > 0) {
    //   $('.gmap').mobileGmap();
    // }

    // Custom form elements
    $('#brand-filter input').iCheck();
    $(window).load(function() {
        equalHeights('.special-offers-wrap .corporate-primary-column .size-narrow .wrap');
    });

    $(window).resize(function() {
        equalHeights('.special-offers-wrap .corporate-primary-column .size-narrow .wrap');
    });
    // Show more brands on LARGE breakpoint
    $("#more-brands #show-more-brands").click(function() {
        $(this).hide();
        $("#product-filter #brand-filter li.collapsed").removeClass("collapsed");
    });

    var $isotope = $('.project-items');
    var isotopeOptions = {};

    if ($isotope.length > 0) {
        $isotope.isotope({
            // options
            itemSelector: '.item',
            layoutMode: 'fitRows'
        });

        var filters = {};

        $(".filter-menu li, .project-departments li").on('click', 'a', function() {
            var $this = $(this);
            if ($this.parent().hasClass('selected')) {
                return;
            }

            var href = $this.attr('href').replace(/^#/, '');
            option = $.deparam(href, true);
            $.extend(isotopeOptions, option);
            $.bbq.pushState(isotopeOptions);
            departmentsSize();
            return false;
        });

        // hide empty departments
        function hideEmptyDepartments() {
            var $depts = $('.project-departments li a');
            for (i = 0; i < $depts.length; i++) {
                var filterClass = $($depts[i]).data('filter');
                if ($(filterClass).length == 0 && filterClass != "") $($depts[i]).parent().hide();
            }
        }


        hideEmptyDepartments();

        function departmentsSize() {
            if($('.projects-wrapper').length >= 0){
                var $newHeight = $('.projects-wrapper').height();
                    $('.project-departments').css('height', $newHeight); 
            } else {
                return;
            }
        
        }

        // hide filters on click.
        $(".project-departments li a").click(function() {
            var $filters = $('.filter-menu li a');
            var depClass = $(this).data('filter');
            for (i = 0; i < $filters.length; i++) {
                var filterClass = $($filters[i]).data('filter');
                if ($("" + depClass + filterClass + "").length == 0) {
                    if (!$("" + depClass + filterClass + "").parent().hasClass('selected') && filterClass != "") $($filters[i]).parent().hide();
                    if ($('.filter-menu li.selected:hidden')) {
                        $('.filter-menu li.selected:hidden').removeClass('selected');
                        $('.filter-menu li:first-child a').trigger('click');
                    }
                } else {
                    $($filters[i]).parent().show();
                }
            }
        });

        // $(".filter-menu li a").click(function(){
        //   var $filters = $('.project-departments li a');
        //   var depClass = $(this).data('filter');
        //   for(i=0; i<$filters.length; i++)
        //   {
        //     var filterClass = $($filters[i]).data('filter');

        //     if($("" + depClass + filterClass + "").length == 0) {
        //       if(!$("" + depClass + filterClass + "").parent().hasClass('selected') && filterClass != "") $($filters[i]).parent().hide();
        //     } else {
        //       $($filters[i]).parent().show();
        //     }
        //   }
        // });

        $("#mobile-departments").change(function() {
            var filter = $(this).find('option:selected').data('filter');
            var selected = $(".project-departments").find('a[data-filter="' + filter + '"]').trigger('click');
        });

        $("#mobile-filters").change(function() {
            var filter = $(this).find('option:selected').data('filter');
            var selected = $(".filter-menu").find('a[data-filter="' + filter + '"]').trigger('click');
        });
    }
    // PNG fallback for SVG
    // if(!Modernizr.svg) {
    //   $('img[src*="svg"]').attr('src', function() {
    //     return $(this).attr('src').replace('.svg', '.png');
    //   });
    // }

    $(window).bind('hashchange', function(event) {
        // get options object from hash
        var hashOptions = window.location.hash ? $.deparam.fragment(window.location.hash, true) : {};
        options = $.extend({}, {}, hashOptions);
        // assign the correct filters as selected
        var filters = "";
        for (var key in options) {
            hrefObj = {};
            hrefObj[key] = options[key];
            filters += hrefObj[key];
            hrefValue = $.param(hrefObj);
            $('a[href="#' + hrefValue + '"]').parent().parent().find('li.selected').removeClass('selected');
            $('option[data-filter="' + hrefObj[key] + '"]').attr('selected', true);
            $('a[href="#' + hrefValue + '"]').parent().addClass('selected');
        }

        // apply the filters
        $isotope.isotope({
            filter: filters
        });
    })
    // trigger hashchange to capture any hash data on init
    .trigger('hashchange');
    
    // $('.project-items').css({'height': '100%', 'display' : 'block'});
    
    $('body').append('<div id="more-results" style="display:none"></div>');
    
    function moreResults() {
        var results = 11;
        for (i = 0; i <= results; i++) {
            $('.project-items .item:eq('+ i +')').addClass('picked');
        }

       $isotope.isotope({ filter: function( ){
            item = $( this );
            if( item.hasClass('picked') )
            {
                visible = true;
            
            }else{
                visible = false;
            }

            return visible;

            } 
        });
    }

    moreResults();
  
  

    $('#revealProducts').click(function(e){
        e.preventDefault();

        
        $('.project-items .item').not('.picked').addClass('more-picked');
        $isotope.isotope({ filter: function( ){
            item = $( this );
            if( item.hasClass('picked') || item.hasClass('more-picked') )
            {
                visible = true;
            
            }else{
                visible = false;
            }

            return visible;

        } });
        $( this ).fadeOut();
         departmentsSize();
    });


    if (Modernizr.svg) {
        $('#logo img').attr('src', function() {
            return $(this).attr('src').replace('.png', '.svg');
        });
    }

    // Can also be used with $(document).ready()
    $('.flexslider').flexslider({
        animation: "slide",
        slideshow: false,
        animationLoop: false,
        smoothHeight: true
    });

    $(document).load(function() {
        equalHeightRows('.product-grid .product-tile');
        departmentsSize();
    });
    $(window).resize(function() {
        equalHeightRows('.product-grid .product-tile');
        departmentsSize();
    });

});
