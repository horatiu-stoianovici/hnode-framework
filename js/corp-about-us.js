$(document).ready(function(){
	setInterval(function(){contentSlide();},5000);
	$('.corp-about-us .iosslider').iosSlider({
      autoSlide: true,
      navSlideSelector: $('.dots li'),
      onSlideChange: slideChange,
      onSliderLoaded: sliderLoaded,
      autoSlideTransTimer: 1500,
      desktopClickDrag: true,
      snapToChildren: true,
      snapSlideCenter: true,
      responsiveSlideContainer: false,
      infiniteSlider: true
    });

    function contentSlide(){
		var slide_container = $('.content-slides');
		var current_slide = slide_container.find('.content-slide.active');
		var next_slide = current_slide.next('.content-slide').length ? current_slide.next('.content-slide') :slide_container.find('.content-slide').first() ;
		current_slide.hide('slide', {direction: 'left'}, 1000,function(){
			current_slide.removeClass('active');
			next_slide.show('slide', {direction: 'right'}, 1000);
			next_slide.addClass('active');
		});
	}


    function slideChange(args) {
        $('.dots li').removeClass('active');
        $('.dots li:eq(' + (args.currentSlideNumber - 1) + ')').addClass('active');
        slideComplete(args);
        
    }
    function sliderLoaded(args) {
          
        $(args.sliderObject).find('.lead, .header, .button').attr('style', '');
        
        $(args.currentSlideObject).find('.header').delay(400).animate({
          opacity: '1'
        }, 400, 'easeOutQuint');
        
        $(args.currentSlideObject).find('.lead ').delay(800).animate({
  
          opacity: '0.8'
        }, 400, 'easeOutQuint');
        
        $(args.currentSlideObject).find('.button').delay(800).animate({
          opacity: '1'
        }, 400, 'easeOutQuint');
        
        slideChange(args);
        
      }

      function slideComplete(args) {
        
        if(!args.slideChanged) return false;
        
        $(args.sliderObject).find('.lead, .header,.button').attr('style', '');
        
        $(args.currentSlideObject).find('.header').delay(400).animate({
         
          opacity: '1'
        }, 400, 'easeOutQuint');
        
        $(args.currentSlideObject).find('.lead').delay(800).animate({
          
          opacity: '0.8'
        }, 400, 'easeOutQuint');
        
        $(args.currentSlideObject).find('.button').delay(800).animate({
            opacity: '1'
          }, 400, 'easeOutQuint');
        }

    
});
$(window).load(function(){
	equalHeights(".quote");
});
$(window).resize(function(){
	equalHeights(".quote");
});

	
