$(document).ready(function() {

    $("#share-offers-link").popover({
        placement: function(context, source) {
            if (currentBreakpoint('medium-screen')) {
                return "left";
            }
            return "bottom";
        },
        container: $(".share-content:first"),
        trigger: 'click',
        content: $('#share-offers-link-content').html(),
        html: true
    });
    $("#share-offers-link").click(function() {
        $(document).trigger('ATTACH_EMAIL_SHARE');
    });

    function loadAndResize() {
        equalHeightRows('.product-grid .product-tile');
        equalHeights('.special-offer a');
    }

    $('.corporate-homepage .iosslider').iosSlider({
        autoSlide: true,
        navSlideSelector: $('.dots li'),
        onSlideChange: slideChange,
        autoSlideTransTimer: 1700,
        desktopClickDrag: true,
        snapToChildren: true,
        snapSlideCenter: true,
        responsiveSlideContainer: true,
        responsiveSlides: true,
        infiniteSlider: true,
        onSlideStart: slideStart,
        onSlideComplete: sliderComplete
    });


    var slides_objects = [];
    $('.corporate-homepage .iosslider .slide').each(function() {
        slides_objects.push({
            slide: $(this),
            content: $(this).find('.inner'),
            background_image: $("." + $(this).attr('id') + "_bg")
        });
    });
    var wrapper = $('.page-wrapper');
    var interval_id;

    function slideChange(args) {
        $('.dots li').removeClass('active');
        $('.dots li:eq(' + (args.currentSlideNumber - 1) + ')').addClass('active');
    }


    function slideStart(args) {
        var _args = args;
        if (!interval_id) {
            interval_id = setInterval(function() {
                for (var i = 0; i < slides_objects.length; i++) {
                    applySliderTransitions(args, slides_objects[i], slides_objects, wrapper);
                }
            }, 100);
        }
    }

    function sliderComplete(args) {
        clearInterval(interval_id);
        interval_id = '';
    }
});

function averageWidth(elements) {
    // Given a list of elements return the everage width
    var total_width = 0;
    for (var i = 0; i < elements.length; i++) {
        total_width += elements[i].slide.width();
    }
    return total_width / elements.length;
}

function applySliderTransitions(args, slide, slides, wrapper) {
    /*
  Change opacity and margin-left of slide and background div relative to the distance from the viewing area
  */
    var MARGIN_VALUE = 5;
    var slider_width = averageWidth(slides);
    //Calculate the distance of this slide from the viewing area

    var slide_offset = slide.slide.offset().left - (Math.abs(wrapper.offset().left));
    var relative_offset = slide_offset / slider_width;
    if (relative_offset > 1) {
        relative_offset = 1;
    }
    var opacity = Math.abs(relative_offset);
    opacity = 1 - opacity;
    slide.content.css('opacity', opacity);
    var margin_left = 0;
    if (relative_offset <= 0) {
        margin_left = relative_offset * MARGIN_VALUE - MARGIN_VALUE;
    } else {
        margin_left = (MARGIN_VALUE - relative_offset * MARGIN_VALUE) * -1;
    }
    $(slide.background_image).css({
        'opacity': opacity,
        'margin-left': (margin_left) + "%"
    });
}

function loadAndResize() {
    equalHeightRows('.product-grid .product-tile');
    equalHeights('.special-offer a');
}

function moveContent() {
    if (currentBreakpoint('medium-screen') && !Modernizr.mq('(device-height: 1024px) and (orientation:landscape)')) {
        $('.corp-intro').insertAfter('.how-to');
        $('.local-store').insertBefore('.top-offers');
    } else {
        $('.corp-intro').insertBefore('.top-offers');
        $('.local-store').insertBefore('.newsletter');
    }
}

if($('html').hasClass('ie8')) {
    $('.slide_bg').not(':first').css('opacity', '0');
}


$(window).resize(function() {

    if (!Modernizr.touch) {
        $("#share-offers-link").popover('hide');
    }
    loadAndResize();
});

$(window).load(function() {

    loadAndResize();
});
