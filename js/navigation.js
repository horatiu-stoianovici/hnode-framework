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


