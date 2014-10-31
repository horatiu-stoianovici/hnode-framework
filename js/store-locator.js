var storeMap;
$(document).ready(function(){

    /*
     * Randomise order of stores
     */

    (function($) {
    $.fn.randomize = function(childElem) {
      return this.each(function() {
          var $this = $(this);
          var elems = $this.children(childElem);

          elems.sort(function() { return (Math.round(Math.random())-0.5); });

          $this.empty();

          for(var i=0; i < elems.length; i++)
            $this.append(elems[i]);

      });
    };
    })(jQuery);

(function($) {
    $.fn.sortByDistance = function(objArray) {
      return this.each(function() {
          var $this = $(this);
          var elems = objArray;

          elems.sort(SortByDistance);

          for(var i=0; i < elems.length; i++){
            elems[i]['tp_store_el'].remove();
            $this.append(elems[i]['tp_store_el']);
          }

      });
    };
    })(jQuery);

    function SortByDistance(a, b){
      var aDistance = a['tp_distance'];
      var bDistance = b['tp_distance'];
      return ((aDistance < bDistance) ? -1 : ((aDistance > bDistance) ? 1 : 0));
    }


    // TODO: Randomize the order of stores on the back end and remove this JS.
     $("#store-locator-accordion").randomize(".store");
    /*
     * Initialization.
     */

    var markerColour = '821b84';

    var markerShadow = new google.maps.MarkerImage(
        "http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35)
    );

    var defaultStoreMapCenter = new google.maps.LatLng(53.579461, -7.756348);
    var defaultStoreMapZoom = 7;

    var geocoder = new google.maps.Geocoder();
    var countyStyle = [
            {
              "featureType": "administrative.country",
              "elementType": "labels",
              "stylers": [
                { "visibility": "off" }
              ]
            },{
              "featureType": "administrative.province",
              "elementType": "labels",
              "stylers": [
                { "visibility": "off" }
              ]
            },{
              "featureType": "road",
              "stylers": [
                { "visibility": "off" }
              ]
            },{
              "featureType": "landscape.natural.terrain",
              "stylers": [
                { "visibility": "off" }
              ]
            },{
              "featureType": "landscape.natural.landcover",
              "stylers": [
                { "visibility": "off" }
              ]
            },{
              "featureType": "administrative.locality",
              "stylers": [
                { "visibility": "off" }
              ]
            },{
              "featureType": "poi",
              "stylers": [
                { "visibility": "off" }
              ]
            }
          ];

    var storeStyle = [{    
        "featureType": "landscape", 
        "elementType": "all", 
        "stylers": [{ "visibility": "off" }] 
                        }]; 
      storeMap = new google.maps.Map(document.getElementById('map'), {
        zoom: defaultStoreMapZoom,
        center: defaultStoreMapCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true,streetViewControl:false
    });

    var storeMarkers = [];
    var countyMarkers = [];
    var countyPolygons = [];
    var countyPolygonsVars;
    $.ajax({
    dataType: "json",
    url: "/js/json/county-polygons.json",
    success: function(data){
        countyPolygonsVars = data.countyPolygonsVars;
        initialize();
    }
    ,error: function(request, textStatus, errorThrown) {
        console.log(textStatus);
        throw(errorThrown);
    },
    });


    function initialize(){
    // In the initial page state we hide the list!

        $('#store-locator').show();
        $('#store-locator-store-list').addClass('hide-for-large');
        $('#store-locator #store-locator-map #map').show();
        $('#store-locator-map').addClass('full');

        // Plot all counties on the map to start with.

        addCountyMarkers();

        // Use geolocation API to center the map on the user's current area and
        // remove any stores/markers that aren't within a 10 mile boundary.
        google.maps.event.trigger(storeMap, 'resize');
        storeMap.setCenter(defaultStoreMapCenter);
        storeMap.setZoom(defaultStoreMapZoom);
        
        if (!!navigator.geolocation) {
            geoLocate();
        }
    }
    /*
     * Functions.
     */
     function geoLocate(){

        navigator.geolocation.getCurrentPosition(function(position) {

            // Remove all markers and hide all stores.
            
            removeAllMarkers();
            //$('#store-locator #store-locator-store-list .store').hide();
           var coords = position.coords;
           var accuracy = coords.accuracy;

            // Generate an array of ALL store markers (but don't plot them!)
           
            var allMarkers = [];

            $('#store-locator #store-locator-store-list .store').each(function() {
                var latlng = $(this).data('latlng').split(',');
                allMarkers.push(new google.maps.Marker({
                    position: new google.maps.LatLng(latlng[0], latlng[1])
                }));
            });

            // Determine which of these markers exist within range of the user
            // and for each one plot an appropriate marker on the map & show
            // the store.

            var currentLetterIndex = 0;
            var rangeCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var range = new google.maps.Circle({
                center: rangeCenter,
                radius: 40000,
                strokeOpacity: 0,
                fillOpacity: 0
            });

            // // Add data-distance and sort stores relative to current position
            // // TODO: Finished this code
            // for (var i = 0; i < allMarkers.length; i++) {
            //     var distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(rangeCenter, allMarkers[i].getPosition());
            //     var distanceInMiles = Math.round(distanceInMeters * 0.000621371192);
            //     var store = $('#store-locator #store-locator-store-list .store:eq(' + i + ')');
            //     store.data('distance', distanceInMiles);
            //     console.log(store);
            //     console.log('set distance: ' + distanceInMiles);
            // }
            if (accuracy < 10000){
                // Hide all stores before showing valid ones
                addYourAreaItem();
                $('#store-locator #store-locator-store-list .store').hide();
                // attachStoreClick();
                for (var i = 0; i < allMarkers.length; i++) {
                    allMarkers[i]['tp_distance'] = google.maps.geometry.spherical.computeDistanceBetween(rangeCenter, allMarkers[i].getPosition());
                    allMarkers[i]['tp_store_el'] = $('#store-locator #store-locator-store-list .store:eq(' + i + ')');
                }
                var closestMarkers = allMarkers.sort(SortByDistance).slice(0,10);
                for (var i = 0; i < closestMarkers.length; i++) {
                    var distanceInMeters = closestMarkers[i]['tp_distance'];
                    var distanceInMiles = Math.round(distanceInMeters * 0.000621371192);
                    var store = closestMarkers[i]['tp_store_el'];
                   
                    //TODO: GJC Letter Code 
                    var storeLetter = String.fromCharCode('A'.charCodeAt() + currentLetterIndex);
                    if (accuracy < 1000){ 
                        store.find('.geo').html(distanceInMiles + ' miles from you');
                    }
                    
                        
                    if (range.getBounds().contains(closestMarkers[i].getPosition())) {
                        store.find('.store-info-icon').html(storeLetter);
                        store.show();
                        var markerIcon = new google.maps.MarkerImage(
                            'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + storeLetter + '|' + markerColour + '|FFFFFF',
                            new google.maps.Size(21, 34),
                            new google.maps.Point(0,0),
                            new google.maps.Point(10, 34)
                        );
                        (function() {
                            var $store = store;
                            var marker = new google.maps.Marker({
                                position: closestMarkers[i].getPosition(),
                                map: storeMap,
                                icon: markerIcon,
                                shadow: markerShadow,
                                animation: google.maps.Animation.DROP,
                                title: store.find('.store-info-title .name').html()
                            });
                       
                            google.maps.event.addListener(marker, 'click', function() {
                                $store.find('.store-info').click();
                            });
                            storeMarkers.push(marker);
                        })(store);
                        currentLetterIndex++;
                        
                    }
                }
              $('#store-locator #store-locator-store-list').sortByDistance(closestMarkers);
              attachStoreClick();
              addControls();
              
              // If markers have been plotted (i.e. if there are stores in range
              // of the user) then centre/zoom the map and show the stores list.
              // If not, simply display all counties.

              if (storeMarkers.length > 0) {
                  storeMap.set('styles', storeStyle);
                  $('#store-locator-store-list').removeClass('hide-for-large');
                  $('#store-locator-map').removeClass('full');
                  google.maps.event.trigger(storeMap, 'resize');
                  fitBounds(storeMarkers,storeMap);
              } else {
                  displayCounties();
              }

            }else{
                $('#map-options label').html("Sorry, we couldn't detect your location. Please choose your county:");
                displayCounties();
            }

        },function(){
          $('#map-options label').html("Sorry, we couldn't detect your location. Please choose your county:");
              displayCounties();
        },{timeout:10000});
     }
     function removeControls(){
         storeMap.set('draggable', false);
         storeMap.set('zoomControl', false);
         storeMap.set('scrollwheel', false);
         storeMap.set('disableDoubleClickZoom', true);
     }
     function addControls(){
        storeMap.set('draggable', true);
        storeMap.set('zoomControl', true);
        storeMap.set('disableDoubleClickZoom', false);
     }
     function addYourAreaItem(){
        if($('section#map-options select').find('#your_area').length == 0 ){
            $('section#map-options select').prepend("<option value='' id='your_area' selected >Your area</option>");
        }

     }

    function addCountyMarker(county, latlng, storeCount){
        var marker = new MarkerWithLabel({
          position: latlng,
          map: storeMap,
          icon: {
              url: '/img/icons/marker.png',
              
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(12, 20)
          },
          title: county
        });

        google.maps.event.addListener(marker, 'click', function() {
          var countySelect = $('section#map-options select');
          countySelect.find('option[value="' + county + '"]').prop('selected', 'selected');
          countySelect.trigger('change');
        });

        countyMarkers.push(marker);
    }

    function addCountyMarkers(){
        storeMap.set('styles', countyStyle);
        removeControls();
        for(i = 0; i < countyPolygonsVars.length; i++){
          
              var gmapPolygonCoordinates = [];

              for(j=0; j < countyPolygonsVars[i].boundaries.length; j++){
               
                  var tempCoordinate = countyPolygonsVars[i].boundaries[j];
                  gmapPolygonCoordinates.push(new google.maps.LatLng(tempCoordinate[0], tempCoordinate[1]));

              }
              var polygon = new google.maps.Polygon({
              paths: gmapPolygonCoordinates,
              strokeColor: '#47aa42',
              strokeOpacity: 0.5,
              strokeWeight: 1,
              fillColor: '#47aa42',
              fillOpacity: 0.1,
              zIndex: 10
              });
              polygon['tp_county_name'] = countyPolygonsVars[i].name;
              google.maps.event.addListener(polygon, 'mouseover', function (event) {
              this.setOptions({strokeWeight: 1, fillOpacity: 0.3});
              });
              google.maps.event.addListener(polygon, 'mouseout', function (event) {
              this.setOptions({strokeWeight: 1, fillOpacity: 0.1});
              });
              google.maps.event.addListener(polygon, 'click', function (event) {
                  var countySelect = $('section#map-options select');
                    countySelect.find('option[value="' + this.tp_county_name + '"]').prop('selected', 'selected');
                    countySelect.trigger('change');
              });
              polygon.setMap(storeMap);
              countyPolygons.push(polygon);
        }
        $('#store-locator-accordion .store').each(function() {
            var $this = $(this);
            var latlng = $this.data('latlng').split(',');
            var storeCount = $this.data('store-count');
            var county= $this.data('county');
            addCountyMarker(county, new google.maps.LatLng(latlng[0], latlng[1]), storeCount);
        });
    }

    function addMarkerListener(store){
        store.find('.store-info').click();
    }

    function addStoreMarkers(){
        
        $('#store-locator #store-locator-store-list .store').each(function() {
            var $this = $(this);
            $this.find('.store-content').hide();
            $this.removeClass('on');
            var storeName = $this.find('.store-info-title .name').html();
            var latlng = $this.data('latlng').split(',');
            var markerIcon = new google.maps.MarkerImage(
                'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + markerColour + '|FFFFFF',
                new google.maps.Size(21, 34),
                new google.maps.Point(0,0),
                new google.maps.Point(10, 34)
            );
            $this.show();

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(latlng[0], latlng[1]),
                map: storeMap,
                icon: markerIcon,
                shadow: markerShadow,
                title: storeName
            });

            google.maps.event.addListener(marker, 'click', function() {
                $this.find('.store-info').click();
            });

            storeMarkers.push(marker);
        });
    }

    function removeAllMarkers()
    {
        for (var i = 0; i < storeMarkers.length; i++ ) {
            storeMarkers[i].setMap(null);
        }

        for (var i = 0; i < countyMarkers.length; i++ ) {
            countyMarkers[i].setMap(null);
        }

        for (var i = 0; i < countyPolygons.length; i++ ) {
            countyPolygons[i].setMap(null);
        }

        storeMarkers = [];
        countyMarkers = [];
        countyPolygons = [];
    }

    function displayStoresForCounty(county, zoomLevel){
        storeMap.set('styles', storeStyle);
        addControls();
        removeAllMarkers();

        var currentLetterIndex = 0;

        $('#store-locator #store-locator-store-list .store').each(function() {
            var $this = $(this);
            $this.find('.store-content').hide();
            $this.removeClass('on');
            if ($this.data('county')===county) {
                var storeName = $this.find('.store-info-title .name').html();
                var storeLetter = String.fromCharCode('A'.charCodeAt() + currentLetterIndex);
                var latlng = $this.data('latlng').split(',');
                var markerIcon = new google.maps.MarkerImage(
                    'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + storeLetter + '|' + markerColour + '|FFFFFF',
                    new google.maps.Size(21, 34),
                    new google.maps.Point(0,0),
                    new google.maps.Point(10, 34)
                );
                $this.find('.store-info .store-info-icon').html(storeLetter);
                $this.show();

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latlng[0], latlng[1]),
                    map: storeMap,
                    icon: markerIcon,
                    shadow: markerShadow,
                    animation: google.maps.Animation.DROP,
                    title: storeName
                });

                google.maps.event.addListener(marker, 'click', function() {
                    $this.find('.store-info').click();
                });

                storeMarkers.push(marker);

                currentLetterIndex++;
            } else {
                $this.hide();
            }
        });

        var firstMarkerPosition = storeMarkers[0].getPosition();

        var maxLatitude = firstMarkerPosition.lat();
        var minLatitude = firstMarkerPosition.lat();
        var maxLongitude = firstMarkerPosition.lng();
        var minLongitude = firstMarkerPosition.lng();

        for (var i = 1; i < storeMarkers.length; i++) {
            var markerPosition = storeMarkers[i].getPosition();
            if (markerPosition.lat() > maxLatitude) {
                maxLatitude = markerPosition.lat();
            }
            if (markerPosition.lat() < minLatitude) {
                minLatitude = markerPosition.lat();
            }
            if (markerPosition.lng() > maxLongitude) {
                maxLongitude = markerPosition.lng();
            }
            if (markerPosition.lng() < minLongitude) {
                minLongitude = markerPosition.lng();
            }
        }

        var latitudeMidpoint = (maxLatitude + minLatitude) / 2;
        var longitudeMidpoint = (maxLongitude + minLongitude) / 2;

        google.maps.event.trigger(storeMap, 'resize');
        storeMap.setCenter(new google.maps.LatLng(latitudeMidpoint, longitudeMidpoint));
        storeMap.setZoom(zoomLevel);
        fitBounds(storeMarkers,storeMap);
    }

     function fitBounds(bounds_array,map){
        //  Make an array of the LatLng's of the markers you want to show
        //var LatLngList = new Array (new google.maps.LatLng (52.537,-2.061), new google.maps.LatLng (52.564,-2.017));
        
        var LatLngList = bounds_array;
        //  Create a new viewpoint bound
        var bounds = new google.maps.LatLngBounds ();
        //  Go through each...
        for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
          //  And increase the bounds to take this point
          bounds.extend(LatLngList[i].getPosition());

        }
        //  Fit these bounds to the map
        map.fitBounds(bounds);
    }

    function displayCounties()
    {
        removeAllMarkers();
        $('#store-locator #store-locator-store-list .store').each(function() {
            var $this = $(this);
            $this.find('.store-content').hide();
            $this.removeClass('on');
            $this.show();
        });

        addCountyMarkers();

        google.maps.event.trigger(storeMap, 'resize');
        storeMap.setCenter(defaultStoreMapCenter);
        storeMap.setZoom(defaultStoreMapZoom);
    }

    /*
     * Events.
     */

    $('section#map-options select').on('change', function() {
        var $this = $(this);
        var county = $this.val();
        $("#store-locator-accordion").randomize(".store");
        $('#store-locator #store-locator-store-list .store-info').off('click');
        attachStoreClick();
        if ( county === '') {
            geoLocate();

        }
        else if ( county != '.') {
            $('#store-locator-store-list').removeClass('hide-for-large');
            $('#store-locator-map').removeClass('full');
            displayStoresForCounty(county, $this.find('option:selected').data('map-zoom-level'));
        } else {
            $('#store-locator-store-list').addClass('hide-for-large');
            $('#store-locator-map').addClass('full');
            displayCounties();
            $('.store-info-icon').empty();
        }
    });
    function attachStoreClick(){
        $('#store-locator #store-locator-store-list .store-info').click(function() {
            $('#store-locator #store-locator-store-list .store-info').parent().removeClass('on');
            $('#store-locator #store-locator-store-list .store-content').slideUp('normal');
            if($(this).next().is(':hidden') === true) {
                $(this).parent().addClass('on');
                $(this).next().slideDown('normal');
             }
         });
    }
    attachStoreClick();
    $('#store-locator #store-locator-store-list .store-content').hide();

});
