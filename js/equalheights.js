// Equal height rows in product grid
// Example code taken from http://codepen.io/micahgodbolt/pen/FgqLc
  equalHeightRows = function(container){
    var currentTallest = 0,
         currentRowStart = 0,
         rowDivs = new Array(),
         $el,
         topPosition = 0;

    $(container).each(function() {
      $el = $(this);
      $($el).height('auto');
      topPostion = $el.position().top;
      if (currentRowStart != topPostion) {
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest+ 12);
        }
        rowDivs.length = 0; // empty the array
        currentRowStart = topPostion;
        currentTallest = $el.height();
        rowDivs.push($el);
      } else {
        rowDivs.push($el);
        currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
      }
      for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest + 12);
      }
    });
  };

  // // Set all matching elements to the height of the tallest element
  // equalHeights = function(selector){
  //   var tallest = 0;
  //   $(selector).each(function() {
  //     $el = $(this);
  //     $($el).height('auto');
  //     elementHeight = $($el).height();
  //     // console.log("elementHeight: " + elementHeight);
  //     if(elementHeight > tallest) {
  //       tallest = elementHeight;
  //       // console.log(tallest);
  //     }
  //   });
  //   $(selector).height(tallest);
  // };

  // Set the height of source elements to match cumulative total outerHeight of a set of elements, plus an optional extra height
  // matchHeight = function(sourceElements, destinationElements, extraHeight){
  //   sourceElements = $(sourceElements);
  //   combinedHeightOfSourceElements = 0;
  //   for (currentSourceElement = 0 ; currentSourceElement < sourceElements.length ; currentSourceElement++) {
  //     // console.log(sourceElements.eq(currentSourceElement).outerHeight());
  //     combinedHeightOfSourceElements += sourceElements.eq(currentSourceElement).outerHeight();
  //   }
  //   $(destinationElements).height(combinedHeightOfSourceElements + extraHeight);
  // };

  // Set up the special offers area on the home page:
  // - Set all special offers to the height of the tallest element
  // - Set the special event to twice the height of the special offers, plus 11px
  equalHeights = function(selector){
    // console.log("equalHeights")
    var tallest = 0;
    var tallestOuterHeight = 0;
    $(selector).each(function() {
      $el = $(this);
      $($el).height('auto');
      elementHeight = $($el).height();
      elementOuterHeight = $($el).outerHeight();
      if(elementHeight > tallest) {
        tallest = elementHeight;
        tallestOuterHeight = elementOuterHeight;
      }
    });
    $(selector).height(tallest);
    var specialEvent = $('.special-event .height');
    //var specialEventImageAspectRatio = 653/364;
    var specialEventImageAspectRatio = 653/351;
    // console.log("specialEventImageAspectRatio: " + specialEventImageAspectRatio);
    if(currentBreakpoint('large-screen')) {
      specialEvent.height( (tallestOuterHeight * 2) + 12 );
    }
    if(currentBreakpoint('medium-screen')) {
      width = specialEvent.width();
      specialEvent.height( width / specialEventImageAspectRatio );
    }
    if(currentBreakpoint('small-screen')) {
      width = specialEvent.width();
      specialEvent.height( width / specialEventImageAspectRatio );
    }
    var specialEventWidth = specialEvent.width();
    var specialEventHeight = specialEvent.height();
    // console.log(specialEventWidth);
    // console.log(specialEventHeight);
    if((specialEventWidth/specialEventHeight) < specialEventImageAspectRatio) {
      // console.log("Tall");
      specialEvent.addClass("tall");
    } else {
      // console.log("not tall")
      specialEvent.removeClass("tall");
    }

  };

