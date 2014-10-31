$(document).ready(function(){
	attach_email_form();
});
$(document).bind('ATTACH_EMAIL_SHARE',function(){attach_email_form();});
function hide(obj){
	$(obj).addClass('hidden');
}

function show(obj){
	$(obj).removeClass('hidden');
}

function attach_email_form(){
	var sharing_div = $('#sharing');
	var sharing_list = sharing_div.find('.sharing-list');
	var email_link = sharing_div.find('.email-link');
	var email_form = sharing_div.find('.email-form');
	var email_form_cancel = sharing_div.find('.cancel-email-share');

	email_link.click( function(e){
		e.preventDefault();
		hide(sharing_list);
		show(email_form);
		email_form = $('.email-form:visible');
		email_form.attr('name','sharing-form-name');
		var validator = new FormValidator('sharing-form-name', [{
				name: 'name',
				display: 'required',
				rules: 'required'
			},
			{
				name: 'email',
				display: 'valid email',
				rules: 'valid_email|required'
			}
			], function(errors, event) {
				$('form[name=sharing-form-name]').find('input').removeClass('error');
				if (errors.length > 0) {
					// Show the errors
					for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
						$('form[name=sharing-form-name]').find("#"+errors[i].id).addClass('error');
					}
				}
			});
	});
	email_form_cancel.click(function(e){
		show(sharing_list);
		hide(email_form);
	});
}
;
