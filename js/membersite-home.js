$(document).ready(function() {


    function balance_grid_heights() {
        //Uses  media query changes in aligning rows (float right).
        var special_offers = $('.special-offers-wrap');
        var primary_column = special_offers.find(".primary-column");
        var secondary_column = special_offers.find(".secondary-column");
        var is_media_large = currentBreakpoint('large-screen');

        // remove height elements from wraps
        special_offers.find('.offer .wrap').height('auto');


        if (is_media_large) {
            // make offer large same size as element in the same row



            // if the media is large align the grid row heights   
            if (is_media_large) {
                equalHeights('.special-offers-wrap .offer.size-large .wrap, .special-offers-wrap .secondary-column .offer .wrap:first');
                if ($('.special-offers-wrap').hasClass('four-offer')) {
                    equalHeights('.special-offers-wrap .secondary-column .offer .wrap');
                } else {
                    equalHeights('.special-offers-wrap .secondary-column .offer .wrap:not(:first)');
                }

                equalHeights('.special-offers-wrap .primary-column .size-narrow .wrap');

                var narrow_column_height = primary_column.find('.size-narrow .wrap:first').height();

                if (!special_offers.hasClass('four-offer')) {
                    var secondary_column_height = secondary_column.find('.offer .wrap:not(:first)').first().height() + (get_top_padding(secondary_column.find(' .offer .wrap:not(:first)')) * 2);
                } else {
                    var secondary_column_height = secondary_column.find('.offer .wrap:first').first().height() + (get_top_padding(secondary_column.find(' .offer .wrap')) * 2);
                }
                if (narrow_column_height < (secondary_column_height * 2)) {
                    if (!special_offers.hasClass('four-offer')) {
                        primary_column.find(' .size-narrow .wrap').height((secondary_column_height * 2) - get_top_padding(secondary_column.find('.offer .wrap:not(:first)')) * 2);
                    } else {
                        primary_column.find(' .size-narrow .wrap').height((secondary_column_height * 2) - get_top_padding(secondary_column.find('.offer .wrap')) * 2);
                    }
                } else {
                    var height_increase = (narrow_column_height - (secondary_column_height + get_top_padding(secondary_column.find('.offer .wrap'))) * 2) / 2;
                    if (!special_offers.hasClass('four-offer')) {

                        secondary_column.find(' .offer .wrap:not(:first)').height(secondary_column_height + height_increase);
                    } else {

                        secondary_column.find(' .offer .wrap').height(secondary_column_height + height_increase);
                    }
                }
            }
        }
        if (!is_media_large) {
            equalHeights('.special-offers-wrap .primary-column .size-narrow .wrap');
            equalHeights('.special-offers-wrap .secondary-column .wrap');
        }
    }

    function get_top_padding(element) {
        return parseFloat(element.css("padding-top").replace("px", ""));
    }

    function move_header() {
        //Move the header to parent div in large media mode and return it in other media modes.
        var special_offers = $('.special-offers-wrap');
        var primary_column = $('.special-offers-wrap .primary-column');
        var secondary_column = special_offers.find(".secondary-column");
        var is_media_large = currentBreakpoint('large-screen');
        secondary_column.find(".wrap").each(function() {
            var header = $(this).find('h2');

            if (is_media_large) {
                $(this).find('.image').before(header);
            } else {
                if ($(this).find('.copy h2').length === 0) {
                    $(this).find('.green-bull').before(header);
                }
            }
        });
    }

    function loadAndResize() {
        equalHeightRows('.product-grid .product-tile');
        equalHeights('.special-offer a');
        if (!$('html').hasClass('lt-ie8') && $('.special-offers-wrap').length > 0) {
            balance_grid_heights();
            move_header();
        }

    }

    $(window).load(function() {
        // console.log('window load');
        loadAndResize();
    });

    $(window).resize(function() {
        // console.log('window resize');
        loadAndResize();
    });
});
