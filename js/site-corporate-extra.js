// This file is responsible for all behaviours associated with the main site
// navigation in the header, sidebar and footer.

// Detection of current breakpoint
// -----------------------------------
// Used in place of littering the JS with breakpoint detection code.
//
// TODO: The medium-screen breakpoint in the CSS is not mutually exclusive with
//       the large-screen breakpoint. This was done intentionally for CSS (ie.
//       it behaves like 'medium-screen-or-bigger'), but that feel confusing in
//       the JS and could lead to bugs that are difficult to debug. For the
//       moment I am labelling it 'medium-screen-or-bigger' in JS accordingly.
//
// TODO: for some reason, Modernizr doesn't seem to be able to handle both a
//       min and max width in a media query, hence the off handling of 'medium-screen'
function currentBreakpoint(breakpoint) {
  if(typeof breakpoint === "undefined"){
    return false;
  }

  switch (breakpoint){
    case "undefined":
      return false;
    case "small-screen":
      return Modernizr.mq('screen and (max-width:499px)');
    case "medium-screen":
      return Modernizr.mq('screen and (min-width:500px)') && Modernizr.mq('screen and (max-width:779px)');
    case "medium-screen-or-bigger":
      return Modernizr.mq('screen and (min-width:500px)');
    case "large-screen":
      return (Modernizr.mq('screen and (min-width:780px)') || Modernizr.mq('screen and (device-height: 1024px) and (orientation:landscape)'));
  }

  return false;
}

// Global variables
// ----------------
// As much as possible, we try to avoid running the same jQuery code repeatedly.
// So, for example, we store the `main_nav_links` and the `main_nav_ul` once
// after a single lookup.
//
// TODO: Global variables are bad, so the code should maybe be refactored to
//       avoid them.
var main_nav_links_total_width = 0;
var main_nav_links = [];
var main_nav_ul = $('#main-nav > ul');

// Required navbar elements
// ------------------------
// When working out how much space is available on the `#main-nav` to fit in
// department links (large-screen breakpoint), we need to factor in the space
// that is used by standard, required navbar elements. This array stores a
// master list of those elements.
//
// TODO: only regard the .more link as required if the links won't fit
var required_navbar_elements = [
  $('#offers'),
  $('#ideas-link'),
  $('#tablet-search'),
  $('#search-glass'),
  $('#main-nav li.more')
];

// Calculate #main-nav department link widths
// ------------------------------------------
// The width of the main nav elements is used to determined which department
// links fit into the `#main-nav`.
//
// This needs to be calculated each breakpoint at the moment, as the size of
// navbar elements change with the breakpoints. For example if the page is
// opened at the small-screen breakpoint, the font size is smaller, thus leading
// to narrow widths being measured for each link. Once the user expands to the
// large-screen breakpoint, the links are revealled in the `#main-nav` based on
// the (wrongly) calculated widths, leading to links fitting incorrectly and
// wrapping to two lines.
//
// Because the department links are currently only shown at the large-screen
// breakpoint, there's no need to store per-breakpoint measurements.
//
// We only ever want this to run once, so do nothing if the widths have
// already been calculated.
//
// To measure the width of each nav element, it is temporarily copied into the
// (visible) `#main-nav` so that we can measure its width. Once the temporary
// copies have been measured they are deleted.
function calculate_main_nav_department_link_widths(){
  if (main_nav_links.length > 0) {
    return false;
  }
  //console.log("* calculate_main_nav_department_link_widths");
  $('#main-nav-overflow > ul > li').each(function(){
    //console.log('  - copy element into main-nav and measure it');
    original_link = $(this);
    temp_copy_of_link = original_link.clone();
    temp_copy_of_link.appendTo(main_nav_ul);
    width = temp_copy_of_link.outerWidth(true);
    main_nav_links.push([original_link, width]);
    //console.log(' - Added ' + original_link.attr('data-name') + "(" + width + "px)");
  });
  remove_department_links_from_main_nav();
  //console.log("* END calculate_main_nav_department_link_widths");
}

// Remove department links from #main-nav
// --------------------------------------
// This is used when resizing the viewport to clear out department links before
// add in a set that fits.
function remove_department_links_from_main_nav(){
  //console.log("* remove_department_links_from_main_nav");
  $('#main-nav > ul > li.department-link').remove();
}

// Reveal department links in #main-nav-overflow
// ---------------------------------------------
// This is used when resizing the viewport to ensure that links in the #main-nav-overflow
// will be visible when they should be. The method basically undoes the work of
// `add_department_links_to_main_nav()` hiding links moved to the #main-nav
function reveal_department_links_in_main_nav_overflow() {
  //console.log("* reveal_department_links_in_main_nav_overflow");
  $('#main-nav-overflow > ul > li.hidden').removeClass('hidden');
}

// Add department links to #main-nav
// ---------------------------------
// At the large-screen breakpoint, links to departments are added to `#main-nav`
// on the basis of how wide the `#main-nav` is, how much space is reserved for
// `required_navbar_elements` and how wide each individual link is.
//
// Links are added to the `#main-nav` on the basis of how much space is
// avilable in the navbar (which is equal to total width of the navbar, minus
// elements that need to be visible at this resolution)
//
// We rely on media queries to fire before JS after loading/resizing, thus
// controlling what elements are visible and allowing us to loop the
// `required_navbar_elements` and check the width of each item.
//
// We can't record the widths of these just once when the page is loaded,
// because font sizes and other metrics change in response to meda queries
function add_department_links_to_main_nav(){
  //console.log("* Move items into the main nav, if they'll fit (add_department_links_to_main_nav)");
  var main_nav_width = $('#main-nav').width();
  //console.log('Main nav width: ' + main_nav_width);
  var width_of_required_navbar_elements = 0;
  for (var i = 0; i < required_navbar_elements.length; i++) {
    link = required_navbar_elements[i];
    if ((link).is(":visible")) {
      width_of_required_navbar_elements += link.outerWidth(true);
      //console.log("  - width of " + link.attr('id') + " is " + link.outerWidth(true));
    } else {
      //console.log("  - ignoring " + link.attr('id'));
    }
  }
  //console.log("  - Total width_of_required_navbar_elements: " + width_of_required_navbar_elements);
  available_main_nav_space = main_nav_width - width_of_required_navbar_elements;
  //console.log('  - available_main_nav_space: ' + available_main_nav_space);

  links_that_will_fit = [];

  links_to_be_added_to_main_nav = [];
  //console.log("  - main_nav_links.length: " + main_nav_links.length);
  //console.log("  - Loop through the main_nav_links: ");
  //console.log("    - " + main_nav_links);
  for(i = 0; i < main_nav_links.length; i++){
    link = main_nav_links[i];
    link_width = link[1];
    //console.log("    - link_width: " + link_width);
    //console.log("    - available_main_nav_space before: " + available_main_nav_space);
    if (available_main_nav_space >= link_width) {
      //console.log('this is running' + link[0].attr('data-name'));
      links_to_be_added_to_main_nav.push(link[0]);
      available_main_nav_space = available_main_nav_space - link_width;
    } else {
      available_main_nav_space = 0; // This prevents links from being added to main nav out-of-order
    }
    //console.log("    - available_main_nav_space after: " + available_main_nav_space);
  }

  //console.log(links_to_be_added_to_main_nav.length);

  for (i = 0; i < links_to_be_added_to_main_nav.length; i++) {
    links_to_be_added_to_main_nav[i].clone().appendTo(main_nav_ul);
    links_to_be_added_to_main_nav[i].addClass('hidden');
  }
}


// Add toggle control
// ------------------
// There are many places within the UI that use a toggle link to hide/show
// elements. This function is intended to keep that code DRY and ensure that:
//
// * Elements are always hidden by applying a 'hidden' class (not simply setting
//   `display:none` in CSS).
// * The default click event action is never triggered.


function add_toggle_control(toggler, togglee){
  $(toggler).click(function(e){
    var len = $(togglee).length;
    if(len<2){
      $(togglee).toggleClass('hidden');
    }else{
      for(var i=0;i<len;i++){
       $(togglee[i]).toggleClass('hidden');
      }
    }
    e.preventDefault();
  });
}


function enable_category_filter_overflow_toggle(){
  //console.log("- enable_category_filter_overflow_toggle");
  $('#category-filter .more').click(function(e){
    //console.log($('#category-filter-overflow'));
    $('#category-filter-overflow').toggleClass('hidden');
    //console.log('Display category filter overflow menu');
    e.preventDefault();
  });
}

function enable_small_screen_search_toggle(){
  //console.log("search_toggle");
  $('#main-nav #search-glass').click(function(e){
    $('#mobile-search').toggleClass('hidden');
    e.preventDefault();
  });
}

// Configure header for current screen size
// ----------------------------------------
// 1. Reset the header to it's default (small screen) state:
//    * Remove department links from the `#main-nav`.
//    * Make the department links in the `#main-nav-overflow` visible again.
// 2. If at the large-screen breakpoint:
//    * Calculate the width of each `#main-nav` department link.
//    * Add the department links into the `#main-nav` (as many as will fit).
//    * Enable the mega menu toggles on the `#main-nav` departments. Because
//      we're deleting the `#main-nav` department links with each resize
//      we need to re-enable them once they've been added back in.
//
// TODO: optimise this code so that a bare-minimum of work is done for each breakpoint.
//
// TODO: consider an alternative approach that copies over all of the department
//       links just once, and thereafter hides/shows the links as necessary.
function configure_header_for_current_screen_size(){
  remove_department_links_from_main_nav();
  reveal_department_links_in_main_nav_overflow();
  if(!Modernizr.mq('only all') || currentBreakpoint('large-screen')){
    calculate_main_nav_department_link_widths();
    add_department_links_to_main_nav();
    enable_mega_menu_toggles('#main-nav');
  }
}

// Configure product filter and sorting for current screen size
// ------------------------------------------------------------
// At the medium breakpoint, the category filter is moved from the left hand
// portion of the screen into a bar that runs horizontally across the page. When
// there are too many categories to fit on one row, the remainder are hidden
// in an overflow (toggled by a 'more' link).
//
// When resizing the screen the category filter must be first reset to its
// starting appearance by:
// 1. Hiding the 'more' link.
// 2. Un-hiding the category links in the list (not the overflow).
// 3. Hiding the overflow.
// 4. Removing category links from the overflow.
//
// After that, if we are at the medium-screen breakpoint, set up the category
// filter overflow.
//
// TODO: DRY up detection of breakpoints.
//
// TODO: Is there a better way to reset to the starting appearance, rather than
//       trying to reproduce HTML+CSS states here?
function configure_product_filter_and_sort_for_current_screen_size(){
  $('#category-filter .more').addClass('hidden');
  $('#category-filter ul:not(#category-filter-overflow) li:not(.more)').removeClass('hidden');
  $('#category-filter-overflow').addClass('hidden');
  $('#category-filter-overflow li').remove();

  if( currentBreakpoint('medium-screen') ){
    set_category_filter_overflow();
  }
}

// Set category filter overflow
// ----------------------------
// At the medium breakpoint, the category filter is moved from the left hand
// portion of the screen into a bar that runs horizontally across the page. When
// there are too many categories to fit on one row, the remainder are hidden
// in an overflow (toggled by a 'more' link).
//
// TODO: add padding to the category filter to prevent links underlapping the more link.
//
// TODO: only factor in the width of the more link if all links won't fit.
function set_category_filter_overflow(){
  //console.log("- set_category_filter_overflow");

  // Get the overall width of all links in the menu bar (except the 'more' link)
  var category_filter_links_total_width = 0;
  $('#category-filter ul:not(#category-filter-overflow) li:not(.more)').each(function(){
    category_filter_links_total_width += $(this).outerWidth(true);
  });

  // If the links won't all fit in the main nav, create and populate the overflow menu
  var category_filter_width = $('#category-filter').width();
  if((category_filter_width < category_filter_links_total_width)) {
    $('#category-filter .more').removeClass('hidden');
    var category_filter_current_link_width = $('#category-filter .current').outerWidth(true);
    var category_filter_more_link_width = $('#category-filter .more').outerWidth(true); // TODO: the 20 is added because of mistakes in width calculations; need to fix properly
    var category_filter_available_width = category_filter_width - (category_filter_current_link_width + category_filter_more_link_width);
    var category_filter_links_width = 0;

    $('#category-filter ul:not(#category-filter-overflow) li:not(.more, .current)').each(function(){
      width = $(this).outerWidth(true);
      if(width <= category_filter_available_width ){
        $(this).removeClass('hidden');
        category_filter_available_width = category_filter_available_width - width;
      } else {
        // Note: unlike the main navigation, it doesn't matter if we don't
        // preserve ordering of links here, so we don't force the available_width
        // to zero as soon as we find a link that won't fit.
        // In other words, to avoid large gaps in the medium-screen category filter,
        // the ordering of links isn't strictly preserved as links are moved to the overflow.
        $('ul#category-filter-overflow').append($(this).clone());
        $(this).addClass('hidden');
      }
    });
  }
}

// Enable mega menu toggles
// ------------------------
// The mega menu can be triggered from links within the #main-nav or
// the `#main-nav-overflow`.
//
// When the page is first loaded, the `#main-nav-overflow`'s toggles are enabled,
// but not the #main-nav's (because that behaviour is dependent on the breakpoint).
// When the page is resized, the toggles are enabled for the #main-nav with each resize.
//
// An interesting side effect of how departments and their mega menus are cloned
// from the `#main-nav-overfow` into `#main-nav` is that a super-dropdown's visibility
// is preserved as screen size increases from the small-screen viewport all the
// way up to large-screen, even when a department moves from the overflow menu
// into the main navigation.
//
// However, this *'open'* state isn't preserved if a mega menu is initially opened
// from a main navigation department link, because the elements are removed from
// the DOM with each refresh.
//
// TODO: consider storing the state consistently in the #main-nav-overflow so
// that visibility is preserved across all viewport resizes.
//
// TODO: opening the mega menu of a department shown in the main-nav (not
// overflow) should close the overflow menu, if it is open.
function enable_mega_menu_toggles(parent_selector) {
  // $(parent_selector + ' .department-link > a').click(function(e){
  //   $('.mega-menu').not($(this).next()).addClass('hidden');
  //   $(this).next().toggleClass("hidden");
  //   e.preventDefault();
  // });

  // $(parent_selector + " li.department-link a").click(function(e){
  //   var data_name = $(this).data("name");

  //     $(".mega-menu").each(function(){
  //       if($(this).data('name') == data_name && $(this).hasClass('hidden'))
  //       {
  //         $(this).removeClass('hidden');
  //       }
  //       else {
  //         $(this).addClass('hidden');
  //       }
  //     })
  //     e.preventDefault();
  // });

  return;

}



// On window resize
// ----------------
// Each time the window is resized, the header navigation needs to be
// reconfigured to suit the current viewport dimensions and breakpoint.
$(window).resize(function(){
  //console.log("------------ window.resize ------------");

  configure_header_for_current_screen_size();
  configure_product_filter_and_sort_for_current_screen_size();
});

// On document ready
// -----------------
// Once the DOM is ready for interaction (all HTML loaded):
//
// 1. Configure the header for the current screen size
// 2. Enable the mega menu toggles on `#main-nav-overflow`
// 3. Add toggle controls for the `#filter-button` (the small-screen, collapsed
//    filter UI) and `#main-nav .more` (the 'More' / 'Departments' drop down menu).
//
// TODO: verify that there's no condition under which the JS will fire before
//       CSS has been loaded and rendered, because otherwise our #main-nav link
//       calculations will break. See http://stackoverflow.com/a/1324720 , which
//       suggests that there is no race condition to be worried about.
$(document).ready(function(){
  //console.log("------------ document.ready ------------");

  configure_header_for_current_screen_size();
  configure_product_filter_and_sort_for_current_screen_size();

  enable_mega_menu_toggles('#main-nav-overflow'); // Only do this once, on page load
  enable_small_screen_search_toggle();
  enable_category_filter_overflow_toggle();

  var togglee = ['#product-filter', '#sort-options'];
  add_toggle_control('#filter-button', togglee);
  add_toggle_control('#main-nav .more', '#main-nav-overflow');

});


// Gridset Overlay JS

gs = {

	init: function () {
		
		if (window.location.href.match('gridset=show')) gs.show();
	
		gs.bind(document, 'keydown', function (e) { 
		
			if (!e) var e = window.event;
		
			if(e.metaKey || e.ctrlKey) {
				
				switch (e.which || e.keyCode) {
					case 71:
					
						var gw = document.getElementById('gridsetoverlaywrap');
					
						if (!gw) gs.show();
						else gs.remove(gw);
						
						gs.prevent(e);
						break;
						
				}
				
			}
		
		
		});
	
	},
	
	remove: function (gw) {
	
		document.body.removeChild(gw);
		
		if(window.detachEvent) window.detachEvent('onresize', gs.width);
		else window.removeEventListener('resize', gs.width, false);
	
	},
	
	width: function () {
		
		var swv = document.getElementById('gridscreenwidthval');
		if (swv) swv.innerHTML = window.innerWidth + 'px';
		
	},

	show: function () {
	
		var p = ['d','dca','t'],
			c = [12,7,8],
			w = [912,912,780],
			b = document.getElementsByTagName('body')[0],
			gw = '<div id="gridwrap"><div id="gridscreenwidthwrap"><p id="gridscreenwidth">Screen width: <strong id="gridscreenwidthval"></strong></p></div><div id="gridoverlay" class="container">',
		
			k = 0, breaks = '',
			
			styles = '<style id="gridsetoverlaystyles" type="text/css">#gridsetoverlaywrap{position:static;}#gridwrap{display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;pointer-events:none;font-family:Helvetica, Arial, sans-serif !important;}#gridoverlay{position:relative;height:100%;overflow:hidden !important;background:none !important;}#gridoverlay div{display:block;position:static;height:100%;color:#bcbcff;}#gridoverlay .gridset{position:absolute;width:100%;height:100%;top:0;left:0;opacity:0.7;}#gridoverlay .gridset div{text-align:left;font-size:10px !important;border-right:1px solid #bcbcff;border-left:1px solid #bcbcff;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}#gridoverlay div small{width:100%;display:block;text-align:center;color:#7D80DB;font-weight:700 !important;border-bottom:1px solid #bcbcff;border-top:1px solid #bcbcff;padding-top:0 !important;background-color:rgb(240,240,255) !important;text-transform:none !important;height:22px !important;line-height:22px !important;text-style:normal !important;}#gridoverlay .gridset:nth-child(2) div{border-style:dashed;padding-top:23px;}#gridoverlay .gridset:nth-child(2) small{border-style:dashed;}#gridoverlay .gridset:nth-child(3) div{border-style:dotted;padding-top:45px;}#gridoverlay .gridset:nth-child(3) small{border-style:dotted;}#gridsetoverlaywrap .noshow{display:none;}#gridscreenwidthwrap{display:block !important;width:100% !important;position:absolute !important;bottom:0 !important;left:0 !important;height:30px !important;border-top:1px solid #7D80DB !important;opacity:0.7 !important;background-color:rgb(240,240,255) !important;}#gridscreenwidth{display:block !important;width:100% !important;text-align:center !important;font-size:12px !important;line-height:1 !important;padding-top:8px !important;font-family:Helvetica, Arial, sans-serif !important; margin: 0 !important;color:#7D80DB !important;}@media only screen and (max-width:911px) {#gridsetoverlaywrap [class*=t1],#gridsetoverlaywrap [class*=t2],#gridsetoverlaywrap [class*=t3],#gridsetoverlaywrap [class*=t4],#gridsetoverlaywrap [class*=t5],#gridsetoverlaywrap [class*=t6],#gridsetoverlaywrap [class*=t7],#gridsetoverlaywrap [class*=t8],#gridsetoverlaywrap .t-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=t1]{width:9.746045593834664%;margin-left:0%;}#gridsetoverlaywrap [class*=t2]{width:9.807341471943033%;margin-left:12.822968673835%;}#gridsetoverlaywrap [class*=t3]{width:9.807341471943033%;margin-left:25.707233225778%;}#gridsetoverlaywrap [class*=t4]{width:9.807341471943033%;margin-left:38.591497777721%;}#gridsetoverlaywrap [class*=t5]{width:9.807341471943033%;margin-left:51.475762329664%;}#gridsetoverlaywrap [class*=t6]{width:9.807341471943033%;margin-left:64.360026881607%;}#gridsetoverlaywrap [class*=t7]{width:9.807341471943033%;margin-left:77.24429143355%;}#gridsetoverlaywrap [class*=t8]{width:9.807341471943033%;margin-left:90.128555985493%;}#gridsetoverlaywrap .t-hide{display:none !important;}}@media only screen and (min-width:912px) {#gridsetoverlaywrap [class*=d1],#gridsetoverlaywrap [class*=d2],#gridsetoverlaywrap [class*=d3],#gridsetoverlaywrap [class*=d4],#gridsetoverlaywrap [class*=d5],#gridsetoverlaywrap [class*=d6],#gridsetoverlaywrap [class*=d7],#gridsetoverlaywrap [class*=d8],#gridsetoverlaywrap [class*=d9],#gridsetoverlaywrap [class*=d10],#gridsetoverlaywrap [class*=d11],#gridsetoverlaywrap [class*=d12],#gridsetoverlaywrap .d-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=d1]{width:5.92105263%;margin-left:0%;}#gridsetoverlaywrap [class*=d2]{width:5.92105263%;margin-left:8.55263158%;}#gridsetoverlaywrap [class*=d3]{width:5.92105263%;margin-left:17.10526316%;}#gridsetoverlaywrap [class*=d4]{width:5.92105263%;margin-left:25.65789474%;}#gridsetoverlaywrap [class*=d5]{width:5.92105263%;margin-left:34.21052632%;}#gridsetoverlaywrap [class*=d6]{width:5.92105263%;margin-left:42.7631579%;}#gridsetoverlaywrap [class*=d7]{width:5.92105263%;margin-left:51.31578948%;}#gridsetoverlaywrap [class*=d8]{width:5.92105263%;margin-left:59.86842106%;}#gridsetoverlaywrap [class*=d9]{width:5.92105263%;margin-left:68.42105264%;}#gridsetoverlaywrap [class*=d10]{width:5.92105263%;margin-left:76.97368422%;}#gridsetoverlaywrap [class*=d11]{width:5.92105263%;margin-left:85.5263158%;}#gridsetoverlaywrap [class*=d12]{width:5.92105263%;margin-left:94.07894738%;}#gridsetoverlaywrap .d-hide{display:none !important;}#gridsetoverlaywrap [class*=dca1],#gridsetoverlaywrap [class*=dca2],#gridsetoverlaywrap [class*=dca3],#gridsetoverlaywrap [class*=dca4],#gridsetoverlaywrap [class*=dca5],#gridsetoverlaywrap [class*=dca6],#gridsetoverlaywrap [class*=dca7],#gridsetoverlaywrap .dca-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=dca1]{width:20.17543859%;margin-left:0%;}#gridsetoverlaywrap [class*=dca2]{width:20.17543859%;margin-left:22.80701754%;}#gridsetoverlaywrap [class*=dca3]{width:20.17543859%;margin-left:45.61403508%;}#gridsetoverlaywrap [class*=dca4]{width:5.92105263%;margin-left:68.42105262%;}#gridsetoverlaywrap [class*=dca5]{width:5.92105263%;margin-left:76.9736842%;}#gridsetoverlaywrap [class*=dca6]{width:5.92105263%;margin-left:85.52631578%;}#gridsetoverlaywrap [class*=dca7]{width:5.92105263%;margin-left:94.07894736%;}#gridsetoverlaywrap .dca-hide{display:none !important;}}</style>';
						
		while (p[k]) {
		
			var hides = '', 
				l = 0;
		
			if (w[k] != breaks && k == 0) gw += '<div>';
			else if (w[k] != breaks) gw += '</div><div>';
		
			while (p[l]) {
		
				if (l != k && w[l] != w[k]) hides += p[l] + '-hide ';
				l++;			
		
			}
		
			gw += '<div class="gridset ' + hides + '"><div class="'+p[k]+'1"><small>'+p[k]+'1</small></div>';
		
			var i = 1;
		
			while (i++ < c[k]) gw += '<div class="'+p[k]+i+'"><small>'+p[k]+i+'</small></div>';
		
			gw += '</div>';
		
			if (k == w.length - 1) gw += '</div>';
		
			breaks = w[k];
		
			k++;
		
		}
		
		gw += '</div></div>';
		
		var newgw = document.createElement('div');
		
		newgw.id = 'gridsetoverlaywrap';
		
		newgw.innerHTML = gw + styles;
		
		b.appendChild(newgw);
		
		gs.width();
		gs.bind(window, 'resize', gs.width);
	
	},
	
	bind : function (t, e, f) {
		
		if (t.attachEvent) t.attachEvent('on' + e, f);
		else t.addEventListener(e, f, false);
	
	},
	
	prevent : function (e) {
	
		if (e.preventDefault) e.preventDefault();
		else event.returnValue = false;
	
	}


};

gs.init();
/**
 * hashgrid (jQuery version, adapters are on the way)
 * http://github.com/dotjay/hashgrid
 * Version 8, 06 Oct 2012
 * Written by Jon Gibbins
 *
 * Contibutors:
 * James Aitken, http://loonypandora.co.uk/
 * Tom Arnold, http://www.tomarnold.de/
 * Sean Coates, http://seancoates.com/
 * Phil Dokas, http://jetless.org/
 * Andrew Jaswa, http://andrewjaswa.com/
 * Callum Macrae, http://lynx.io/
 */

/**
 * @license Copyright 2011 Analog Coop Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Usage
 *
 * // The basic #grid setup looks like this
 * var grid = new hashgrid();
 *
 * // But there are a whole bunch of additional options you can set
 * var grid = new hashgrid({
 *     id: 'mygrid',            // set a custom id for the grid container
 *     modifierKey: 'alt',      // optional 'ctrl', 'alt' or 'shift'
 *     showGridKey: 's',        // key to show the grid
 *     holdGridKey: 'enter',    // key to hold the grid in place
 *     foregroundKey: 'f',      // key to toggle foreground/background
 *     jumpGridsKey: 'd',       // key to cycle through the grid classes
 *     numberOfGrids: 2,        // number of grid classes used
 *     classPrefix: 'myclass',  // prefix for the grid classes
 *     cookiePrefix: 'mygrid'   // prefix for the cookie name
 * });
 */


/**
 * Make sure we have the library
 * TODO: Use an adapter
 */

if (typeof jQuery == "undefined") {
	alert("Hashgrid: jQuery not loaded. Make sure it's linked to your pages.");
}


/**
 * hashgrid overlay
 * @constructor
 */
var hashgrid = function(set) {

	var options = {
			id: 'grid',             // id for the grid container
			modifierKey: null,      // optional 'ctrl', 'alt' or 'shift'
			showGridKey: 'g',       // key to show the grid
			holdGridKey: 'h',       // key to hold the grid in place
			foregroundKey: 'f',     // key to toggle foreground/background
			jumpGridsKey: 'j',      // key to cycle through the grid classes
			numberOfGrids: 1,       // number of grid classes used
			classPrefix: 'grid-',   // prefix for the grid classes
			cookiePrefix: 'hashgrid'// prefix for the cookie name
		},
		alreadyDown,
		classNumber = 1,
		gridLines,
		gridWidth,
		i,
		line,
		lineHeight,
		numGridLines,
		overlay,
		overlayCookie,
		overlayEl,
		overlayOn = false,
		overlayVert,
		overlayZState = 'B',
		overlayZBackground = -1,
		overlayZForeground = 9999,
		pageHeight,
		setKey,
		state,
		sticky = false,
		top;

	// Apply options
	if (typeof set == 'object') {
		for (setKey in set) {
			options[setKey] = set[setKey];
		}
	}
	else if (typeof set == 'string') {
		options.id = set;
	}

	// Remove any conflicting overlay
	if ($('#' + options.id).length > 0) {
		$('#' + options.id).remove();
	}

	// Create overlay, hidden before adding to DOM
	overlayEl = $('<div></div>');
	overlayEl
		.attr('id', options.id)
		.css({
			display: 'none',
			pointerEvents: 'none'
		});
	$("body").prepend(overlayEl);
	overlay = $('#' + options.id);

	// Unless a custom z-index is set, ensure the overlay will be behind everything
	if (overlay.css('z-index') == 'auto') overlay.css('z-index', overlayZBackground);

	// Override the default overlay height with the actual page height
	pageHeight = parseFloat($(document).height());
	overlay.height(pageHeight);

	// Add the first grid line so that we can measure it
	overlay.append('<div id="' + options.id + '-horiz" class="horiz first-line">');

	// Position off-screen and display to calculate height
	top = overlay.css("top");
	overlay.css({
		top: '-999px',
		display: 'block'
	});

	// Calculate the number of grid lines needed
	line = $('#' + options.id + '-horiz');
	lineHeight = line.outerHeight();

	// Hide and reset top
	overlay.css({
		display: 'none',
		top: top
	});

	// Break on zero line height
	if (lineHeight <= 0) {
		return false;
	}

	// Add the remaining grid lines
	numGridLines = Math.floor(pageHeight / lineHeight);
	gridLines = '';

	for (i = numGridLines - 1; i >= 1; i--) {
		gridLines += '<div class="horiz"></div>';
	}
	overlay.append(gridLines);

	// vertical grid
	overlay.append($('<div class="vert-container"></div>'));
	overlayVert = overlay.children('.vert-container');
	gridWidth = overlay.width();
	overlayVert.css({width: gridWidth, position: 'absolute', top: 0});
	overlayVert.append('<div class="vert first-line">&nbsp;</div>');

	// 30 is an arbitrarily large number...
	// can't calculate the margin width properly
	gridLines = '';
	for (i = 0; i < 30; i++) {
		gridLines += '<div class="vert">&nbsp;</div>';
	}
	overlayVert.append(gridLines);
	overlayVert.children()
		.height(pageHeight)
		.css({ display: 'inline-block' });

	// Check for saved state
	overlayCookie = readCookie(options.cookiePrefix + options.id);
	if (typeof overlayCookie == 'string') {
		state = overlayCookie.split('-');
		state[2] = Number(state[2]);
		if ((typeof state[2] == 'number') && !isNaN(state[2])) {
			classNumber = state[2].toFixed(0);
			overlay.addClass(options.classPrefix + classNumber);
		}
		if (state[1] == 'F') {
			overlayZState = 'F';
			overlay.css('z-index', overlayZForeground);
		}
		if (state[0] == '1') {
			overlayOn = true;
			sticky = true;
			showOverlay();
		}
	}
	else {
		overlay.addClass(options.classPrefix + classNumber);
	}

	// Keyboard controls
	$(document).bind('keydown', keydownHandler);
	$(document).bind('keyup', keyupHandler);

	/**
	 * Helpers
	 */

	function getModifier(e) {
		if (options.modifierKey == null) return true; // Bypass by default
		var m = true;
		switch(options.modifierKey) {
			case 'ctrl':
				m = (e.ctrlKey ? e.ctrlKey : false);
				break;

			case 'alt':
				m = (e.altKey ? e.altKey : false);
				break;

			case 'shift':
				m = (e.shiftKey ? e.shiftKey : false);
				break;
		}
		return m;
	}

	function getKey(e) {
		var k = false, c = (e.keyCode ? e.keyCode : e.which);
		// Handle keywords
		if (c == 13) k = 'enter';
		// Handle letters
		else k = String.fromCharCode(c).toLowerCase();
		return k;
	}

	function saveState() {
		createCookie(options.cookiePrefix + options.id, (sticky ? '1' : '0') + '-' + overlayZState + '-' + classNumber, 1);
	}

	function showOverlay() {
		overlay.show();
		overlayVert.css({width: overlay.width()});
		// hide any vertical blocks that aren't at the top of the viewport
		overlayVert.children('.vert').each(function () {
			var vCol = $(this);
			vCol.css('display','inline-block');
			if (vCol.offset().top > vCol.parent().offset().top) {
				vCol.hide();
			}
		});
	}

	/**
	 * Event handlers
	 */

	alreadyDown = {};

	function keydownHandler(e) {
		var k,
			m,
			source = e.target.tagName.toLowerCase();

		if ((source == 'input') || (source == 'textarea') || (source == 'select')) {
			return true;
		}

		m = getModifier(e);
		if (!m) {
			return true;
		}

		k = getKey(e);
		if (!k) {
			return true;
		}

		if (alreadyDown[k]) {
			return true;
		}
		alreadyDown[k] = true;

		switch(k) {
			case options.showGridKey:
				if (!overlayOn) {
					showOverlay();
					overlayOn = true;
				}
				else if (sticky) {
					overlay.hide();
					overlayOn = false;
					sticky = false;
					saveState();
				}
				break;
			case options.holdGridKey:
				if (overlayOn && !sticky) {
					// Turn sticky overlay on
					sticky = true;
					saveState();
				}
				break;
			case options.foregroundKey:
				if (overlayOn) {
					// Toggle sticky overlay z-index
					if (overlay.css('z-index') == overlayZForeground) {
						overlay.css('z-index', overlayZBackground);
						overlayZState = 'B';
					}
					else {
						overlay.css('z-index', overlayZForeground);
						overlayZState = 'F';
					}
					saveState();
				}
				break;
			case options.jumpGridsKey:
				if (overlayOn && (options.numberOfGrids > 1)) {
					// Cycle through the available grids
					overlay.removeClass(options.classPrefix + classNumber);
					classNumber++;
					if (classNumber > options.numberOfGrids) classNumber = 1;
					overlay.addClass(options.classPrefix + classNumber);
					showOverlay();
					if (/webkit/.test( navigator.userAgent.toLowerCase() )) {
						forceRepaint();
					}
					saveState();
				}
				break;
		}

		return true;
	}

	function keyupHandler(e) {
		var k,
			m = getModifier(e);

		if (!m) {
			return true;
		}

		k = getKey(e);
		alreadyDown[k] = false;

		if (k && (k == options.showGridKey) && !sticky) {
			overlay.hide();
			overlayOn = false;
		}

		return true;
	}

	/**
	 * Cookie functions
	 *
	 * By Peter-Paul Koch:
	 * http://www.quirksmode.org/js/cookies.html
	 */
	function createCookie(name, value, days) {
		var date,
			expires = "";

		if (days) {
			date = new Date();
			date.setTime( date.getTime() + (days*24*60*60*1000) );
			expires = "; expires=" + date.toGMTString();
		}

		document.cookie = name + "=" + value + expires + "; path=/";
	}

	function readCookie(name) {
		var c,
			ca = document.cookie.split(';'),
			i = 0,
			len = ca.length,
			nameEQ = name + "=";

		for (; i < len; i++) {
			c = ca[i];

			while (c.charAt(0) == ' ') {
				c = c.substring(1, c.length);
			}

			if (c.indexOf(nameEQ) == 0) {
				return c.substring(nameEQ.length, c.length);
			}
		}
		return null;
	}

	function eraseCookie(name) {
		createCookie(name, "", -1);
	}

	/**
	 * Forces a repaint (because WebKit has issues)
	 * http://www.sitepoint.com/forums/showthread.php?p=4538763
	 * http://www.phpied.com/the-new-game-show-will-it-reflow/
	 */
	function forceRepaint() {
		var ss = document.styleSheets[0];
		try {
			ss.addRule('.xxxxxx', 'position: relative');
			ss.removeRule(ss.rules.length - 1);
		} catch(e) {}
	}

	return {};
};


/**
 * You can call hashgrid from your own code, but it's loaded here as
 * an example for your convenience.
 */
$(document).ready(function() {

	var grid = new hashgrid({
		numberOfGrids: 2
	});

});
/* ===========================================================
 * bootstrap-tooltip.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = $.fn[this.type].defaults
        , options = {}
        , self

      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)

      self = $(e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')

      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        pos = this.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        this.applyPlacement(tp, placement)
        this.$element.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = $tip[0].offsetWidth
      actualHeight = $tip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          $tip.offset(offset)
          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) $tip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      this.$element.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.$element.offset())
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);

/* ===========================================================
 * bootstrap-popover.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
        || $e.attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);
$(document).ready(function(){
  $('#popover').popover({
    content: 'test'
  })
})
;


// TODO: remove these in production






$(document).ready(function() {

    //Member Slider Fix
    var memberSlider = $('.member-slider').length,
        containWidth;

    $('.slides').css('overflow', 'hidden');
    if (memberSlider >= 0) {

        if ($(window).width() < 1045 && $(window).width() > 501) {
            containWidth = (1045 - (parseInt($('.container').width()))) / 5;

            $('.member-slider ul.slides img').css('margin-left', '-' + containWidth + 'px');

        } else if ($(window).width() >= 1045) {
            $('.member-slider ul.slides img').css('margin-left', '0px');
        }

        $(window).resize(function() {
            if ($(window).width() < 1045 && $(window).width() > 501) {

                containWidth = (1045 - (parseInt($('.container').width()))) / 5;

                $('.member-slider ul.slides img').css('margin-left', '-' + containWidth + 'px');

            } else if ($(window).width() >= 1045) {
                $('.member-slider ul.slides img').css('margin-left', '0px');
            }
        });

    }
  
    // PRINT BUTTON
    $('.print-article').click(function() {
        window.print();
        return false;
    });

    $('.facebook-link a').each(function() {
        var newurl = window.location;
        $(this).attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + newurl)

        $(this).click(function() {
            window.open(this.href, 'mywin', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
            return false;
        });
    });

    $('.twitter-link a').each(function() {
        var newurl = window.location;
        $(this).attr('href', 'http://www.twitter.com/share?url=' + newurl)

        $(this).click(function() {
            window.open(this.href, 'mywin', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
            return false;
        });
    });

    $(window).on('scroll click resize', function() {
        $('#share-offers-link-content').fadeOut('slow');
    })


    // Add responsive Google Map to page
    // if($('.gmap').length > 0) {
    //   $('.gmap').mobileGmap();
    // }

    // Custom form elements
    $('#brand-filter input').iCheck();

    // Show more brands on LARGE breakpoint
    $("#more-brands #show-more-brands").click(function() {
        $(this).hide();
        $("#product-filter #brand-filter li.collapsed").removeClass("collapsed");
    });

    // PNG fallback for SVG
    // if(!Modernizr.svg) {
    //   $('img[src*="svg"]').attr('src', function() {
    //     return $(this).attr('src').replace('.svg', '.png');
    //   });
    //



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

    $('.member-slider').flexslider({
        animation: "fade",
        controlNav: true,
        directionNav: false
    });

    $(".other-store").click(function() {
        if ($(this).hasClass('expanded')) {
            $(".other-store").removeClass('expanded');
        } else {
            $(".other-store").removeClass('expanded');
            $(this).addClass('expanded');
        }

    })


    $(window).load(function() {
        equalHeightRows('.product-grid .product-tile');

    });
    $(window).resize(function() {
        equalHeightRows('.product-grid .product-tile');
    });
});
