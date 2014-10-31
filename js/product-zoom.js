$(document).ready(function(){
    var imageZoomInitialized = false;
    var zoomElement = $('img#zoom');
    if (zoomElement.length > 0) {
    	if(!(currentBreakpoint('small-screen') && Modernizr.touch) ){
            // console.log('set up zoom');
            zoomElement.elevateZoom({
                zoomType: 'inner',
                zoomWindowFadeIn: 200,
                zoomWindowFadeOut: 200
            });
        }
        imageZoomInitialized = true;
        zoomElement.on('mouseenter', function() {
        	if(!(currentBreakpoint('small-screen') && Modernizr.touch) ){
                if(imageZoomInitialized == false) {  
                // console.log('set up zoom');
                    zoomElement.elevateZoom({
                        zoomType: 'inner',
                        zoomWindowFadeIn: 200,
                        zoomWindowFadeOut: 200
                    });
                }
            }
        });
        $(window).on('resize', function() {
            // console.log('remove zoom');
            imageZoomInitialized = false;
            $('div.zoomContainer').remove();
            unbindEvents(zoomElement);
            if(!(currentBreakpoint('small-screen') && Modernizr.touch) ){
            // console.log('set up zoom');
	            zoomElement.elevateZoom({
	                zoomType: 'inner',
	                zoomWindowFadeIn: 200,
	                zoomWindowFadeOut: 200
	            });
        	}
        });
        function unbindEvents(element){
        	element.unbind('touchmove');
        }
    }

});
