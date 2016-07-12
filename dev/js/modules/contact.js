'use strict';

define(['jquery'], function ($) {
	var contactForm = {
		init: function init() {
			this.cache();
			this.onSubmit();
		},
		cache: function cache() {
			this.EMAIL = 'customercare@snapp.cab';
			this.$form = $('#contact-form');
		},
		onSubmit: function onSubmit() {
			var self = this;
			this.$form.on('submit', function () {
				var $name = $(this).find('#name').val(),
				    $email = $(this).find('#email').val(),
				    $subject = $(this).find('#subject').val(),
				    $message = $(this).find('#message').val();

				var body = 'از طرف: ' + $name + ' - ' + $email + '\n' + $message;
				var mail_link = 'mailto:' + self.EMAIL + '?subject=' + $subject + '&body=' + body;

				var popup = window.open(mail_link, 'contactForm', 'height=500,width=600');
				if (window.focus) {
					popup.focus();
				}
				return false;
			});
		}
	};

	contactForm.init();
	// var body_message = $('#message').value;
	// var email = 'james2doyle@gmail.com';
	// var subject = 'js email';
	// $('#contact-form').on('submit', function() {
	// 	var mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + body_message;
	//
	// 	console.log(mailto_link);
	// 	// win = window.open(mailto_link, 'emailWindow');
	// 	// if (win && win.open && !win.closed) win.close();
	// });
});
//# sourceMappingURL=contact.js.map
