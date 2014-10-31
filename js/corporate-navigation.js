// This file is responsible for all behaviours associated with the Corporate site
// navigation in the header.

$(document).ready(function() {
  $(".menu-buttons").removeClass('hidden');
  $("#corporate-main-nav ul").removeClass('hidden');
	toggleMenu();
  
 
  $("#department-popover").popover({placement:'bottom',container:$(".department-popover-link").parent(),content:$(".departments-popover-content").html(),html:true,trigger: " click manual"}).on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(this).siblings(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
    });
    enable_small_screen_menu_toggle();
    var ua = navigator.userAgent,
    event = (ua.match(/iPad/i)) ? "touchstart" : "click";

    $('body').on(event, function (e) {
        //buttons and icons within buttons
        if ($(e.target).data('toggle') !== 'popover'&& $(e.target).parents('[data-toggle="popover"]').length === 0
         && $(e.target).parents('.popover.in').length === 0) {
          $('[data-toggle="popover"]').popover('hide');
        }
    });
});
$(window).resize(function(){
  // console.log('window resize');
	toggleMenu();
  
});

function toggleMenu(){
	if( Modernizr.mq('screen and (max-width:779px)') && !Modernizr.mq('(device-height: 1024px) and (orientation:landscape)')) {
		$(".temp-hide-for-small").addClass('hidden');
		$(".search-form").addClass('hidden');
		$(".menu-buttons").show();
	}else{
		$(".temp-hide-for-small").removeClass('hidden');
		$(".search-form").removeClass('hidden');
		$(".menu-buttons").hide();
	}
}
function enable_small_screen_search_toggle(){
  //console.log("search_toggle");
  var ua = navigator.userAgent,
  event = (ua.match(/iPad/i)) ? "touchstart" : "click";

  $('#corporate-main-nav .search-ico').on(event, function (e) {
    $('#mobile-search').toggleClass('hidden');
    e.preventDefault();
  });
}
function enable_small_screen_menu_toggle(){
  //console.log("search_toggle");
  var ua = navigator.userAgent,
  event = (ua.match(/iPad/i)) ? "touchstart" : "click";
  $('.menu-buttons .menu-toggle').on(event, function (e) {
    $('#main-nav-overflow').toggleClass('hidden');
    e.preventDefault();
  });
}
;
