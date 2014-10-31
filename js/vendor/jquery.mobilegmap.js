/**
 * jQuery Mobile Google maps
 * @Author: Jochen Vandendriessche <jochen@builtbyrobot.com>
 * @Author URI: http://builtbyrobot.com
 *
 * @TODO:
 * - fix https image requests
 *
 * Note: Heavily modified by Jonathan Heron, Blue Cube, to suit Topline project
**/


(function($){
  "use strict";

  var methods = {
    init : function(config) {
      var options = $.extend({
        deviceWidth: 480,
        showMarker: true,
      }, config),
      settings = {},
      markers = [];
      // we'll use the width of the device, because we stopped browsersniffing
      // a long time ago. Anyway, we want to target _every_ small display
      var _o = $(this); // store the jqyuery object once
      options.imgURI = 'http://maps.googleapis.com/maps/api/staticmap?';
      settings.lat = $(this).attr('data-map-lat');
      settings.lang = $(this).attr('data-map-lang');
      settings.center = settings.lat + "," + settings.lang;

      settings.zoom = '14';
      settings.size = screen.width + 'x' +  200;
      settings.scale = window.devicePixelRatio ? window.devicePixelRatio : 1;
      settings.maptype = 'roadmap';
      settings.sensor = false;
      options.settings = settings;

      if ($(this).attr('data-zoom')){
        options.settings.zoom = parseInt($(this).attr('data-zoom'));
      }
      if ($(this).attr('data-maptype')){
        options.settings.zoom = $(this).attr('data-maptype');
      }
      // if there should be more markers _with_ text an ul.markers element should be used so
      // we can store all markers :-) (marker specific settings will be added later)
      if (options.showMarker){
        markers.push({
          label: 'A',
          position: settings.center
        });
      }
      options.markers = markers;
      $(this).data('options', options);

      if (screen.width < options.deviceWidth){
        $(this).mobileGmap('showImage');
      }else{
        $(this).mobileGmap('showMap');
      }

    },

    showMap : function(){
      var options = $(this).data('options'), mapOptions = {}, htmlObj = $(this).get(0);

      var startingLatLang = new google.maps.LatLng(options.settings.lat, options.settings.lang)

      mapOptions = {
        zoom: parseInt(options.settings.zoom, 10),
        center: startingLatLang,
        mapTypeId: options.settings.maptype
      }

      var map = new google.maps.Map(htmlObj, mapOptions);

      var marker = new google.maps.Marker({
        map: map,
        position: startingLatLang,
      });

      google.maps.event.addDomListener(window, 'resize', function() {
		    map.setCenter(startingLatLang);
			});
    },

    // TODO: fix image generation
    showImage : function(){
      var par = [],
          r = new Image(),
          l = document.createElement('a'),
          options = $(this).data('options'),
          i = 0,
          m = [];
      for (var o in options.settings){
        par.push(o + '=' + options.settings[o]);
      }

      if (options.markers.length){
        var t=[];
        for (;i < options.markers.length;i++){
          t = [];
          for (var j in options.markers[i]){
            if (j == 'position'){
              t.push(options.markers[i][j]);
            }else{
              t.push(j + ':' + options.markers[i][j]);
            }
          }
          m.push('&markers=' + t.join('%7C'));
        }
      }
      r.src =  options.imgURI + par.join('&') + m.join('');
      l.href = 'http://maps.google.com/maps?q=' + options.settings.center;
      l.appendChild(r);
      $(this).empty().append(l);
    }

  };

  $.fn.mobileGmap = function(method){
    if ( methods[method] ) {
          return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
        } else {
          $.error( 'Method ' + method + ' does not exist on jQuery.mobileGmap' );
    }
  };
})(this.jQuery);
