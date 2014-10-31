
function relatedProducts() {
	 var maxHeight = -1;

        $('#similar-products #similar-products-grid .product-tile').each(function() {
          maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
        });

        $('#similar-products #similar-products-grid .product-tile').each(function() {
          $(this).css('height', maxHeight);
        });
}


$(window).load(function(){
	if(!$('html').hasClass('ie7 ')){
		relatedProducts();
	}
});
$(window).resize(function(){
	if(!$('html').hasClass('ie7 ')){
		relatedProducts();
	}

});
