$(document).ready(function(){

    /*
     * Handle paint colour option selection (display an appropriate swatch).
     */

    $('div#product-image div#paint-options span').on('click', function() {

        var $this     = $(this);
        var colorHex  = $this.data('paint-colour');
        var colorName = $this.html();

        // If the swatch already exists, remove it.

        $('div#swatch-preview').remove();

        // Hide the paint image.

        $('div#paint-image').hide();

        // Create and display the swatch.


        var swatchPreviewTemplate = $('script#swatch-preview-template').html();

        swatchPreviewTemplate = swatchPreviewTemplate.replace('{{name}}', colorName);

        $('div#paint-image').after(swatchPreviewTemplate);
        $('.large-swatch').css({backgroundColor: '#' + colorHex});

        // Flag the current pain color option as being active.

        $('div#paint-options')
            .addClass('active')
            .find('span.active')
                .removeClass('active');

        $this.addClass('active');

    });

    /*
     * Handle swatch closing.
     */

    $("div#product-image").on('click', 'div#swatch-preview a.close-swatch', function() {

        // Remove the swatch.

        $('div#swatch-preview').remove();

        // Display the paint image.

        $('div#paint-image').show();

        // Remove any active elements in the paint color options.

        $('div#paint-options')
            .removeClass('active')
            .find('span.active')
            .removeClass('active');

    });

});
