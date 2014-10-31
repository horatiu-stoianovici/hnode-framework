
function memberSlider() {
	this.container = $(".member-slider-wrapper");
	this.slides = this.container.find("ul.slides li");
	this.rightSide = $(".member-slider-right");
	this.currentIndex = 0;
}

memberSlider.prototype = {
	init: function() {

		if(this.slides.length == 0) console.warn('No slides found.');

		this.createDots();
	}, 

	createDots: function() {

		var dotsHtml = "<ul class='member-slider-dots'>"
		for(i=0; i<this.slides.length; i++)
		{
			dotsHtml += "<li>&#11044;</li>";
		}
		dotsHtml += "</ul>";

		this.rightSide.append(dotsHtml);
		this.dots = $(".member-slider-dots");

		this.addDotEvents();
	},

	addDotEvents: function() {
		var slides = this.slides;
		var dots = this.dots;
		this.dots.find("li").on('click', function(){
			var index = this.currentIndex = $(this).index();
			dots.find("li").removeClass('active');
			$(this).addClass('active');

			$(slides[index]).show();
			$(slides).each(function(){
				if($(this).index() != index) {
					$(this).hide();
				} 
			})
			
		});
	},

	rotate: function () {
		// body...
	}


}
;
