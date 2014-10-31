/* jQuery elevateZoom 2.5.6 - Demo's and documentation: - www.elevateweb.co.uk/image-zoom - Copyright (c) 2012 Andrew Eades - www.elevateweb.co.uk - Dual licensed under the LGPL licenses. - http://en.wikipedia.org/wiki/MIT_License - http://en.wikipedia.org/wiki/GNU_General_Public_License */
/* Customized to include an 'active' option */

if(typeof Object.create!=='function'){Object.create=function(obj){function F(){};F.prototype=obj;return new F();};}
(function($,window,document,undefined){var ElevateZoom={init:function(options,elem){var self=this;self.elem=elem;self.$elem=$(elem);self.imageSrc=self.$elem.data("zoom-image")?self.$elem.data("zoom-image"):self.$elem.attr("src");self.options=$.extend({},$.fn.elevateZoom.options,options);if(self.options.tint){self.options.lensColour="none",self.options.lensOpacity="1"}
if(self.options.zoomType=="inner"){self.options.showLens=false;}
self.$elem.parent().removeAttr('title').removeAttr('alt');self.zoomImage=self.imageSrc;self.refresh(1);$('#'+self.options.gallery+' a').click(function(e){if(self.options.galleryActiveClass){$('#'+self.options.gallery+' a').removeClass(self.options.galleryActiveClass);$(this).addClass(self.options.galleryActiveClass);}
e.preventDefault();if($(this).data("zoom-image")){self.zoomImagePre=$(this).data("zoom-image")}
else{self.zoomImagePre=$(this).data("image");}
self.swaptheimage($(this).data("image"),self.zoomImagePre);return false;});},refresh:function(length){var self=this;setTimeout(function(){self.fetch(self.imageSrc);},length||self.options.refresh);},fetch:function(imgsrc){var self=this;var newImg=new Image();newImg.onload=function(){self.largeWidth=newImg.width;self.largeHeight=newImg.height;self.startZoom();self.currentImage=self.imageSrc;self.options.onZoomedImageLoaded(self.$elem);}
newImg.src=imgsrc;return;},startZoom:function(){var self=this;self.nzWidth=self.$elem.width();self.nzHeight=self.$elem.height();self.nzOffset=self.$elem.offset();self.widthRatio=(self.largeWidth/self.options.zoomLevel)/self.nzWidth;self.heightRatio=(self.largeHeight/self.options.zoomLevel)/self.nzHeight;if(self.options.zoomType=="window"){self.zoomWindowStyle="overflow: hidden;"
+"background-position: 0px 0px;text-align:center;"
+"background-color: "+String(self.options.zoomWindowBgColour)
+";width: "+String(self.options.zoomWindowWidth)+"px;"
+"height: "+String(self.options.zoomWindowHeight)
+"px;float: left;"
+"background-size: "+self.largeWidth/self.options.zoomLevel+"px "+self.largeHeight/self.options.zoomLevel+"px;"
+"display: none;z-index:100"
+"px;border: "+String(self.options.borderSize)
+"px solid "+self.options.borderColour
+";background-repeat: no-repeat;"
+"position: absolute;";}
if(self.options.zoomType=="inner"){self.zoomWindowStyle="overflow: hidden;"
+"background-position: 0px 0px;"
+"width: "+String(self.nzWidth)+"px;"
+"height: "+String(self.nzHeight)
+"px;float: left;"
+"display: none;"
+"cursor:"+(self.options.cursor)+";"
+"px solid "+self.options.borderColour
+";background-repeat: no-repeat;"
+"position: absolute;";}
if(self.options.zoomType=="window"){if(self.nzHeight<self.options.zoomWindowWidth/self.widthRatio){lensHeight=self.nzHeight;}
else{lensHeight=String((self.options.zoomWindowHeight/self.heightRatio))}
if(self.largeWidth<self.options.zoomWindowWidth){lensWidth=self.nzWidth;}
else{lensWidth=(self.options.zoomWindowWidth/self.widthRatio);}
self.lensStyle="background-position: 0px 0px;width: "+String((self.options.zoomWindowWidth)/self.widthRatio)+"px;height: "+String((self.options.zoomWindowHeight)/self.heightRatio)
+"px;float: right;display: none;"
+"overflow: hidden;"
+"z-index: 999;"
+"-webkit-transform: translateZ(0);"
+"opacity:"+(self.options.lensOpacity)+";filter: alpha(opacity = "+(self.options.lensOpacity*100)+"); zoom:1;"
+"width:"+lensWidth+"px;"
+"height:"+lensHeight+"px;"
+"background-color:"+(self.options.lensColour)+";"
+"cursor:"+(self.options.cursor)+";"
+"border: "+(self.options.lensBorderSize)+"px"+" solid "+(self.options.lensBorderColour)+";background-repeat: no-repeat;position: absolute;";}
self.tintStyle="display: block;"
+"position: absolute;"
+"background-color: "+self.options.tintColour+";"
+"filter:alpha(opacity=0);"
+"opacity: 0;"
+"width: "+self.nzWidth+"px;"
+"height: "+self.nzHeight+"px;";self.lensRound='';if(self.options.zoomType=="lens"){self.lensStyle="background-position: 0px 0px;"
+"float: left;display: none;"
+"border: "+String(self.options.borderSize)+"px solid "+self.options.borderColour+";"
+"width:"+String(self.options.lensSize)+"px;"
+"height:"+String(self.options.lensSize)+"px;"
+"background-repeat: no-repeat;position: absolute;";}
if(self.options.lensShape=="round"){self.lensRound="border-top-left-radius: "+String(self.options.lensSize/2+self.options.borderSize)+"px;"
+"border-top-right-radius: "+String(self.options.lensSize/2+self.options.borderSize)+"px;"
+"border-bottom-left-radius: "+String(self.options.lensSize/2+self.options.borderSize)+"px;"
+"border-bottom-right-radius: "+String(self.options.lensSize/2+self.options.borderSize)+"px;";}
self.zoomContainer=$('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+self.nzOffset.left+'px;top:'+self.nzOffset.top+'px;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;"></div>');$('body').append(self.zoomContainer);if(self.options.containLensZoom&&self.options.zoomType=="lens"){self.zoomContainer.css("overflow","hidden");}
if(self.options.zoomType!="inner"){self.zoomLens=$("<div class='zoomLens' style='"+self.lensStyle+self.lensRound+"'>&nbsp;</div>").appendTo(self.zoomContainer).click(function(){self.$elem.trigger('click');});}
if(self.options.tint){self.tintContainer=$('<div/>').addClass('tintContainer');self.zoomTint=$("<div class='zoomTint' style='"+self.tintStyle+"'></div>");self.zoomLens.wrap(self.tintContainer);self.zoomTintcss=self.zoomLens.after(self.zoomTint);self.zoomTintImage=$('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+self.nzWidth+'px; height: '+self.nzHeight+'px;" src="'+self.imageSrc+'">').appendTo(self.zoomLens).click(function(){self.$elem.trigger('click');});}
if(isNaN(self.options.zoomWindowPosition)){self.zoomWindow=$("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;"+self.zoomWindowStyle+"' class='zoomWindow'>&nbsp;</div>").appendTo('body').click(function(){self.$elem.trigger('click');});}else{self.zoomWindow=$("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;"+self.zoomWindowStyle+"' class='zoomWindow'>&nbsp;</div>").appendTo(self.zoomContainer).click(function(){self.$elem.trigger('click');});}
self.zoomWindowContainer=$('<div/>').addClass('zoomWindowContainer').css("width",self.options.zoomWindowWidth);self.zoomWindow.wrap(self.zoomWindowContainer);if(self.options.zoomType=="lens"){self.zoomLens.css({backgroundImage:"url('"+self.imageSrc+"')"});}
if(self.options.zoomType=="window"){self.zoomWindow.css({backgroundImage:"url('"+self.imageSrc+"')"});}
if(self.options.zoomType=="inner"){self.zoomWindow.css({backgroundImage:"url('"+self.imageSrc+"')"});}
self.$elem.bind('touchmove',function(e){e.preventDefault();var touch=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0];self.setPosition(touch);});self.zoomContainer.bind('touchmove',function(e){if(self.options.zoomType=="inner"){if(self.options.zoomWindowFadeIn){self.zoomWindow.stop(true,true).fadeIn(self.options.zoomWindowFadeIn);}
else{self.zoomWindow.show();}}
e.preventDefault();var touch=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0];self.setPosition(touch);});self.zoomContainer.bind('touchend',function(e){self.zoomWindow.hide();if(self.options.showLens){self.zoomLens.hide();}
if(self.options.tint){self.zoomTint.hide();}});self.$elem.bind('touchend',function(e){self.zoomWindow.hide();if(self.options.showLens){self.zoomLens.hide();}
if(self.options.tint){self.zoomTint.hide();}});if(self.options.showLens){self.zoomLens.bind('touchmove',function(e){e.preventDefault();var touch=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0];self.setPosition(touch);});self.zoomLens.bind('touchend',function(e){self.zoomWindow.hide();if(self.options.showLens){self.zoomLens.hide();}
if(self.options.tint){self.zoomTint.hide();}});}
self.$elem.bind('mousemove',function(e){if(self.lastX!==e.clientX||self.lastY!==e.clientY){self.setPosition(e);}
self.lastX=e.clientX;self.lastY=e.clientY;});self.zoomContainer.bind('mousemove',function(e){if(self.lastX!==e.clientX||self.lastY!==e.clientY){self.setPosition(e);}
self.lastX=e.clientX;self.lastY=e.clientY;});if(self.options.zoomType!="inner"){self.zoomLens.bind('mousemove',function(e){if(self.lastX!==e.clientX||self.lastY!==e.clientY){self.setPosition(e);}
self.lastX=e.clientX;self.lastY=e.clientY;});}
if(self.options.tint){self.zoomTint.bind('mousemove',function(e){if(self.lastX!==e.clientX||self.lastY!==e.clientY){self.setPosition(e);}
self.lastX=e.clientX;self.lastY=e.clientY;});}
if(self.options.zoomType=="inner"){self.zoomWindow.bind('mousemove',function(e){if(self.lastX!==e.clientX||self.lastY!==e.clientY){self.setPosition(e);}
self.lastX=e.clientX;self.lastY=e.clientY;});}
self.zoomContainer.mouseenter(function(){if(!self.options.active){return;}
if(self.options.zoomType=="inner"){if(self.options.zoomWindowFadeIn){self.zoomWindow.stop(true,true).fadeIn(self.options.zoomWindowFadeIn);}
else{self.zoomWindow.show();}}
if(self.options.zoomType=="window"){if(self.options.zoomWindowFadeIn){self.zoomWindow.stop(true,true).fadeIn(self.options.zoomWindowFadeIn);}
else{self.zoomWindow.show();}}
if(self.options.showLens){if(self.options.lensFadeIn){self.zoomLens.stop(true,true).fadeIn(self.options.lensFadeIn);}
else{self.zoomLens.show();}}
if(self.options.tint){if(self.options.zoomTintFadeIn){self.zoomTint.stop(true,true).fadeIn(self.options.zoomTintFadeIn);}
else{self.zoomTint.show();}}}).mouseleave(function(){self.zoomWindow.hide();if(self.options.showLens){self.zoomLens.hide();}
if(self.options.tint){self.zoomTint.hide();}});self.$elem.mouseenter(function(){if(self.options.zoomType=="inner"){if(self.options.zoomWindowFadeIn){self.zoomWindow.stop(true,true).fadeIn(self.options.zoomWindowFadeIn);}
else{self.zoomWindow.show();}}
if(self.options.zoomType=="window"){if(self.options.zoomWindowFadeIn){self.zoomWindow.stop(true,true).fadeIn(self.options.zoomWindowFadeIn);}
else{self.zoomWindow.show();}}
if(self.options.showLens){if(self.options.lensFadeIn){self.zoomLens.stop(true,true).fadeIn(self.options.lensFadeIn);}
else{self.zoomLens.show();}}
if(self.options.tint){if(self.options.zoomTintFadeIn){self.zoomTint.stop(true,true).fadeIn(self.options.zoomTintFadeIn);}
else{self.zoomTint.show();}}}).mouseleave(function(){self.zoomWindow.hide();if(self.options.showLens){self.zoomLens.hide();}
if(self.options.tint){self.zoomTint.hide();}});if(self.options.zoomType!="inner"){self.zoomLens.mouseenter(function(){if(self.options.zoomType=="inner"){if(self.options.zoomWindowFadeIn){self.zoomWindow.stop(true,true).fadeIn(self.options.zoomWindowFadeIn);}
else{self.zoomWindow.show();}}
if(self.options.zoomType=="window"){self.zoomWindow.show();}
if(self.options.showLens){self.zoomLens.show();}
if(self.options.tint){self.zoomTint.show();}}).mouseleave(function(){if(self.options.zoomWindowFadeOut){self.zoomWindow.stop(true,true).fadeOut(self.options.zoomWindowFadeOut);}
else{self.zoomWindow.hide();}
if(self.options.zoomType!="inner"){self.zoomLens.hide();}
if(self.options.tint){self.zoomTint.hide();}});}
if(self.options.tint){self.zoomTint.mouseenter(function(){if(self.options.zoomType=="inner"){self.zoomWindow.show();}
if(self.options.zoomType=="window"){self.zoomWindow.show();}
if(self.options.showLens){self.zoomLens.show();}
self.zoomTint.show();}).mouseleave(function(){self.zoomWindow.hide();if(self.options.zoomType!="inner"){self.zoomLens.hide();}
self.zoomTint.hide();});}
if(self.options.zoomType=="inner"){self.zoomWindow.mouseenter(function(){if(self.options.zoomType=="inner"){self.zoomWindow.show();}
if(self.options.zoomType=="window"){self.zoomWindow.show();}
if(self.options.showLens){self.zoomLens.show();}}).mouseleave(function(){if(self.options.zoomWindowFadeOut){self.zoomWindow.stop(true,true).fadeOut(self.options.zoomWindowFadeOut);}
else{self.zoomWindow.hide();}
if(self.options.zoomType!="inner"){self.zoomLens.hide();}});}},setPosition:function(e){var self=this;self.nzHeight=self.$elem.height();self.nzWidth=self.$elem.width();self.nzOffset=self.$elem.offset();if(self.options.tint){self.zoomTint.css({top:0});self.zoomTint.css({left:0});}
if(self.options.responsive){if(self.nzHeight<self.options.zoomWindowWidth/self.widthRatio){lensHeight=self.nzHeight;}
else{lensHeight=String((self.options.zoomWindowHeight/self.heightRatio))}
if(self.largeWidth<self.options.zoomWindowWidth){lensWidth=self.nzHWidth;}
else{lensWidth=(self.options.zoomWindowWidth/self.widthRatio);}
self.widthRatio=self.largeWidth/self.nzWidth;self.heightRatio=self.largeHeight/self.nzHeight;self.zoomLens.css({width:String((self.options.zoomWindowWidth)/self.widthRatio)+'px',height:String((self.options.zoomWindowHeight)/self.heightRatio)+'px'})}
self.zoomContainer.css({top:self.nzOffset.top});self.zoomContainer.css({left:self.nzOffset.left});self.mouseLeft=parseInt(e.pageX-self.nzOffset.left);self.mouseTop=parseInt(e.pageY-self.nzOffset.top);if(self.options.zoomType=="window"){self.Etoppos=(self.mouseTop<(self.zoomLens.height()/2));self.Eboppos=(self.mouseTop>self.nzHeight-(self.zoomLens.height()/2)-(self.options.lensBorderSize*2));self.Eloppos=(self.mouseLeft<0+((self.zoomLens.width()/2)));self.Eroppos=(self.mouseLeft>(self.nzWidth-(self.zoomLens.width()/2)-(self.options.lensBorderSize*2)));}
if(self.options.zoomType=="inner"){self.Etoppos=(self.mouseTop<(self.nzHeight/2)/self.heightRatio);self.Eboppos=(self.mouseTop>self.nzHeight-((self.nzHeight/2)/self.heightRatio));self.Eloppos=(self.mouseLeft<0+((self.nzWidth/2)/self.widthRatio));self.Eroppos=(self.mouseLeft>(self.nzWidth-(self.nzWidth/2)/self.widthRatio-(self.options.lensBorderSize*2)));}
if(self.mouseLeft<0||self.mouseTop<=0||self.mouseLeft>self.nzWidth||self.mouseTop>self.nzHeight){self.zoomWindow.hide();if(self.options.showLens){self.zoomLens.hide();}
if(self.options.tint){self.zoomTint.hide();}
return;}
else{if(self.options.zoomType=="window"){self.zoomWindow.show();}
if(self.options.tint){self.zoomTint.show();}
if(self.options.showLens){self.zoomLens.show();self.lensLeftPos=String(self.mouseLeft-self.zoomLens.width()/2);self.lensTopPos=String(self.mouseTop-self.zoomLens.height()/2);}
if(self.Etoppos){self.lensTopPos=0;}
if(self.Eloppos){self.windowLeftPos=0;self.lensLeftPos=0;self.tintpos=0;}
if(self.options.zoomType=="window"){if(self.Eboppos){self.lensTopPos=Math.max((self.nzHeight)-self.zoomLens.height()-(self.options.lensBorderSize*2),0);}
if(self.Eroppos){self.lensLeftPos=(self.nzWidth-(self.zoomLens.width())-(self.options.lensBorderSize*2));}}
if(self.options.zoomType=="inner"){if(self.Eboppos){self.lensTopPos=Math.max((self.nzHeight)-(self.options.lensBorderSize*2),0);}
if(self.Eroppos){self.lensLeftPos=(self.nzWidth-(self.nzWidth)-(self.options.lensBorderSize*2));}}
if(self.options.zoomType=="lens"){self.windowLeftPos=String(((e.pageX-self.nzOffset.left)*self.widthRatio-self.zoomLens.width()/2)*(-1));self.windowTopPos=String(((e.pageY-self.nzOffset.top)*self.heightRatio-self.zoomLens.height()/2)*(-1));self.zoomLens.css({backgroundPosition:self.windowLeftPos+'px '+self.windowTopPos+'px'});self.setWindowPostition(e);}
if(self.options.tint){self.setTintPosition(e);}
if(self.options.zoomType=="window"){self.setWindowPostition(e);}
if(self.options.zoomType=="inner"){self.setWindowPostition(e);}
if(self.options.showLens){self.zoomLens.css({left:self.lensLeftPos+'px',top:self.lensTopPos+'px'})}}},setLensPostition:function(e){},setWindowPostition:function(e){var self=this;if(!isNaN(self.options.zoomWindowPosition)){switch(self.options.zoomWindowPosition){case 1:self.windowOffsetTop=(self.options.zoomWindowOffety);self.windowOffsetLeft=(+self.nzWidth);break;case 2:if(self.options.zoomWindowHeight>self.nzHeight){self.windowOffsetTop=((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);self.windowOffsetLeft=(self.nzWidth);}
else{}
break;case 3:self.windowOffsetTop=(self.nzHeight-self.zoomWindow.height()-(self.options.borderSize*2));self.windowOffsetLeft=(self.nzWidth);break;case 4:self.windowOffsetTop=(self.nzHeight);self.windowOffsetLeft=(self.nzWidth);break;case 5:self.windowOffsetTop=(self.nzHeight);self.windowOffsetLeft=(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2));break;case 6:if(self.options.zoomWindowHeight>self.nzHeight){self.windowOffsetTop=(self.nzHeight);self.windowOffsetLeft=((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);}
else{}
break;case 7:self.windowOffsetTop=(self.nzHeight);self.windowOffsetLeft=0;break;case 8:self.windowOffsetTop=(self.nzHeight);self.windowOffsetLeft=(self.zoomWindow.width()+(self.options.borderSize*2))*(-1);break;case 9:self.windowOffsetTop=(self.nzHeight-self.zoomWindow.height()-(self.options.borderSize*2));self.windowOffsetLeft=(self.zoomWindow.width()+(self.options.borderSize*2))*(-1);break;case 10:if(self.options.zoomWindowHeight>self.nzHeight){self.windowOffsetTop=((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);self.windowOffsetLeft=(self.zoomWindow.width()+(self.options.borderSize*2))*(-1);}
else{}
break;case 11:self.windowOffsetTop=(self.options.zoomWindowOffety);self.windowOffsetLeft=(self.zoomWindow.width()+(self.options.borderSize*2))*(-1);break;case 12:self.windowOffsetTop=(self.zoomWindow.height()+(self.options.borderSize*2))*(-1);self.windowOffsetLeft=(self.zoomWindow.width()+(self.options.borderSize*2))*(-1);break;case 13:self.windowOffsetTop=(self.zoomWindow.height()+(self.options.borderSize*2))*(-1);self.windowOffsetLeft=(0);break;case 14:if(self.options.zoomWindowHeight>self.nzHeight){self.windowOffsetTop=(self.zoomWindow.height()+(self.options.borderSize*2))*(-1);self.windowOffsetLeft=((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);}
else{}
break;case 15:self.windowOffsetTop=(self.zoomWindow.height()+(self.options.borderSize*2))*(-1);self.windowOffsetLeft=(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2));break;case 16:self.windowOffsetTop=(self.zoomWindow.height()+(self.options.borderSize*2))*(-1);self.windowOffsetLeft=(self.nzWidth);break;default:self.windowOffsetTop=(self.options.zoomWindowOffety);self.windowOffsetLeft=(self.nzWidth);}}
else{self.externalContainer=$('#'+self.options.zoomWindowPosition);self.externalContainerWidth=self.externalContainer.width();self.externalContainerHeight=self.externalContainer.height();self.externalContainerOffset=self.externalContainer.offset();self.windowOffsetTop=self.externalContainerOffset.top;self.windowOffsetLeft=self.externalContainerOffset.left;}
self.windowOffsetTop=self.windowOffsetTop+self.options.zoomWindowOffety;self.windowOffsetLeft=self.windowOffsetLeft+self.options.zoomWindowOffetx;self.zoomWindow.css({top:self.windowOffsetTop});self.zoomWindow.css({left:self.windowOffsetLeft});if(self.options.zoomType=="inner"){self.zoomWindow.css({top:0});self.zoomWindow.css({left:0});}
self.windowLeftPos=String(((e.pageX-self.nzOffset.left)*self.widthRatio-self.zoomWindow.width()/2)*(-1));self.windowTopPos=String(((e.pageY-self.nzOffset.top)*self.heightRatio-self.zoomWindow.height()/2)*(-1));if(self.Etoppos){self.windowTopPos=0;}
if(self.Eloppos){self.windowLeftPos=0;}
if(self.Eboppos){self.windowTopPos=(self.largeHeight/self.options.zoomLevel-self.zoomWindow.height())*(-1);}
if(self.Eroppos){self.windowLeftPos=((self.largeWidth/self.options.zoomLevel-self.zoomWindow.width())*(-1));}
if(self.options.zoomType=="window"||self.options.zoomType=="inner"){if(self.widthRatio<=1){self.windowLeftPos=0;}
if(self.heightRatio<=1){self.windowTopPos=0;}
if(self.largeHeight<self.options.zoomWindowHeight){self.windowTopPos=0;}
if(self.largeWidth<self.options.zoomWindowWidth){self.windowLeftPos=0;}
if(self.options.easing){if(!self.xp){self.xp=0;}
if(!self.yp){self.yp=0;}
if(!self.loop){self.loop=setInterval(function(){self.xp+=(self.windowLeftPos-self.xp)/self.options.easingAmount;self.yp+=(self.windowTopPos-self.yp)/self.options.easingAmount;self.zoomWindow.css({backgroundPosition:self.xp+'px '+self.yp+'px'});},16);}}
else{self.zoomWindow.css({backgroundPosition:self.windowLeftPos+'px '+self.windowTopPos+'px'});}}},setTintPosition:function(e){var self=this;self.nzOffset=self.$elem.offset();self.tintpos=String(((e.pageX-self.nzOffset.left)-(self.zoomLens.width()/2))*(-1));self.tintposy=String(((e.pageY-self.nzOffset.top)-self.zoomLens.height()/2)*(-1));if(self.Etoppos){self.tintposy=0;}
if(self.Eloppos){self.tintpos=0;}
if(self.Eboppos){self.tintposy=(self.nzHeight-self.zoomLens.height()-(self.options.lensBorderSize*2))*(-1);}
if(self.Eroppos){self.tintpos=((self.nzWidth-self.zoomLens.width()-(self.options.lensBorderSize*2))*(-1));}
if(self.options.tint){self.zoomTint.css({opacity:self.options.tintOpacity}).animate().fadeIn("slow");self.zoomTintImage.css({'left':self.tintpos-self.options.lensBorderSize+'px'});self.zoomTintImage.css({'top':self.tintposy-self.options.lensBorderSize+'px'});}},swaptheimage:function(smallimage,largeimage){var self=this;var newImg=new Image();self.options.onImageSwap(self.$elem);newImg.onload=function(){self.largeWidth=newImg.width;self.largeHeight=newImg.height;self.zoomImage=largeimage;self.zoomWindow.css({"background-size":self.largeWidth+'px '+self.largeHeight+'px'});self.swapAction(smallimage,largeimage);return;}
newImg.src=largeimage;},swapAction:function(smallimage,largeimage){var self=this;var newImg2=new Image();newImg2.onload=function(){self.nzHeight=newImg2.height;self.nzWidth=newImg2.width;self.options.onImageSwapComplete(self.$elem);self.doneCallback();return;}
newImg2.src=smallimage;if(self.options.zoomType=="lens"){self.zoomLens.css({backgroundImage:"url('"+largeimage+"')"});}
if(self.options.zoomType=="window"){self.zoomWindow.css({backgroundImage:"url('"+largeimage+"')"});}
if(self.options.zoomType=="inner"){self.zoomWindow.css({backgroundImage:"url('"+largeimage+"')"});}
self.currentImage=largeimage;self.$elem.attr("src",smallimage);},doneCallback:function(){var self=this;if(self.options.tint){self.zoomTintImage.attr("src",largeimage);self.zoomTintImage.attr("height",self.$elem.height());self.zoomTintImage.css({height:self.$elem.height()});self.zoomTint.css({height:self.$elem.height()});}
self.nzOffset=self.$elem.offset();self.nzWidth=self.$elem.width();self.nzHeight=self.$elem.height();self.widthRatio=self.largeWidth/self.nzWidth;self.heightRatio=self.largeHeight/self.nzHeight;if(self.options.zoomType=="window"){if(self.nzHeight<self.options.zoomWindowWidth/self.widthRatio){lensHeight=self.nzHeight;}
else{lensHeight=String((self.options.zoomWindowHeight/self.heightRatio))}
if(self.largeWidth<self.options.zoomWindowWidth){lensWidth=self.nzHWidth;}
else{lensWidth=(self.options.zoomWindowWidth/self.widthRatio);}
if(self.zoomLens){self.zoomLens.css('width',lensWidth);self.zoomLens.css('height',lensHeight);}}},getCurrentImage:function(){var self=this;return self.zoomImage;},getGalleryList:function(){var self=this;self.gallerylist=[];if(self.options.gallery){$('#'+self.options.gallery+' a').each(function(){var img_src='';if($(this).data("zoom-image")){img_src=$(this).data("zoom-image");}
else if($(this).data("image")){img_src=$(this).data("image");}
if(img_src==self.zoomImage){self.gallerylist.unshift({href:''+img_src+'',title:$(this).find('img').attr("title")});}
else{self.gallerylist.push({href:''+img_src+'',title:$(this).find('img').attr("title")});}});}
else{self.gallerylist.push({href:''+self.zoomImage+'',title:$(this).find('img').attr("title")});}
return self.gallerylist;},changeZoomLevel:function(value){var self=this;self.widthRatio=(self.largeWidth/value)/self.nzWidth;self.heightRatio=(self.largeHeight/value)/self.nzHeight;self.zoomWindow.css({"background-size":self.largeWidth/value+'px '+self.largeHeight/value+'px'});self.zoomLens.css({width:String((self.options.zoomWindowWidth)/self.widthRatio)+'px',height:String((self.options.zoomWindowHeight)/self.heightRatio)+'px'})
self.options.zoomLevel=value;},closeAll:function(){if(self.zoomWindow){self.zoomWindow.hide();};if(self.zoomLens){self.zoomLens.hide();}
if(self.zoomTint){self.zoomTint.hide();}}};$.fn.elevateZoom=function(options){return this.each(function(){var elevate=Object.create(ElevateZoom);elevate.init(options,this);$.data(this,'elevateZoom',elevate);});};$.fn.elevateZoom.options={active:true,zoomLevel:1,easing:false,easingAmount:12,lensSize:200,zoomWindowWidth:400,zoomWindowHeight:400,zoomWindowOffetx:0,zoomWindowOffety:0,zoomWindowPosition:1,zoomWindowBgColour:"#fff",lensFadeIn:false,lensFadeOut:false,debug:false,zoomWindowFadeIn:false,zoomWindowFadeOut:false,zoomWindowAlwaysShow:false,zoomTintFadeIn:false,zoomTintFadeOut:false,borderSize:4,showLens:true,borderColour:"#888",lensBorderSize:1,lensBorderColour:"#000",lensShape:"square",zoomType:"window",containLensZoom:false,lensColour:"white",lensOpacity:0.4,lenszoom:false,tint:false,tintColour:"#333",tintOpacity:0.4,gallery:false,galleryActiveClass:"zoomGalleryActive",cursor:"default",responsive:false,onComplete:$.noop,onZoomedImageLoaded:function(){},onImageSwap:$.noop,onImageSwapComplete:$.noop};})(jQuery,window,document);
