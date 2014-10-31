
var newsletter;
$(document).ready(function() {
	
	newsletter = new NewsLetter($( '.list' ),$('#newsletter-form'),'.form-transition');
	

	function NewsLetter(list, form,form_transition) {
/**
  *	Newsletter object for managing the newsletter panel states and validation
  * 
**/
		var _this = this;
		this.list = list;
		this.form = form;
		this.form_transition = this.form.find(form_transition);
		this.form_transition.find('input').iCheck();

		this.check_scroll_in_view = function(list){
			var y_scroll_pos = window.pageYOffset;
			var scroll_pos_test = list.offset().top-$( window ).height(); 
			if(y_scroll_pos > scroll_pos_test) {
				return true;
			}
			else{
				return false;
			}
		};

		this.manage_form_open = function(){
			if (this.form_transition.hasClass('hidden')){
				this.form_transition.removeClass('hidden').hide().slideDown();
			}
		};

		this.manage_form_close = function(){
			var form_has_content = false;
			this.form.find('input[type=text]').each(function(){
				if ($(this).val() !== "" ){
					form_has_content = true;
					return false;//Exit the each if we find content
				}
			});
			if (! form_has_content ){
				this.form_transition.slideUp(400,function(){ _this.form_transition.addClass('hidden') });
			}
		};

		this.validate_email = function(email){
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		};
		
		this.check_list_open = function(){
			if(this.form_transition.hasClass('hidden') && this.check_scroll_in_view(this.list)){
				this.open_list();
			}
		};

		this.open_list =function(){
			if (this.makisu_enabled){
				this.list.removeClass('hidden').makisu('open');
			}else{
				this.list.removeClass('hidden');
			}
		};
		this.close_list =function(){
			if (this.makisu_enabled){
				this.list.makisu('close');
				setTimeout(function(){
					_this.list.addClass('hidden');
				},1500);
			}else{
				_this.list.addClass('hidden');
			}
			
		};

		
		var validator = new FormValidator('newsletter-form', [{
				name: 'first-name',
				display: 'required',
				rules: 'required'
			},
			{
				name: 'last-name',
				display: 'required',
				rules: 'required'
			},
			{
				name: 'email',
				display: 'valid email',
				rules: 'valid_email|required'
			},
			{
				name: 'opt-in',
				display: 'opt in',
				rules: 'opt_in_required'
			}
			], function(errors, event) {
				event.preventDefault();
				$('form[name=newsletter-form]').find('input,label').removeClass('error');
				var has_errors =false;
				if (errors.length > 0) {
					has_errors = true;
					// Show the errors
					for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
						var el = $("#"+errors[i].id);
						el.addClass('error');
					}
				}
				if (!$("#newsletter-opt-in").parent().hasClass('checked')){
					$("#newsletter-opt-in").closest('label').addClass('error');
					has_errors = true;
				}
				if (!has_errors){
					//Submit form here
					function FormSubmitSuccess(){
						$('#newsletter-form').fadeOut(400,function(){
							$('#newsletter-confirmation-box').removeClass('hidden').hide().fadeIn();
						});
						
						
					}

					FormSubmitSuccess();
					// Success function
					
				}
				
			});



		_this.check_list_open();

		// Event bindings
		$(window).on('scroll', function(e) {
			_this.check_list_open();
		});
		$('#newsletter-email').focus(function(e){
			_this.manage_form_open();
		});
		this.form.find('input[type=text]').blur(function(e){
			_this.manage_form_close();
		});
	}
});
