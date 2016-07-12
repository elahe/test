'use strict';

// define(['jquery', 'slick', 'modules/videolay', 'modules/features'], function($, slick, videolay) {
define(['jquery', 'slick', 'modules/features'], function ($, slick) {
	// $('body').addClass('hero-video');
	// setTimeout(function () {
	// 	$('.snapp--navbar').addClass('hello-guys');
	// }, 3500);
	//
	(function ($) {
		var slider = {
			init: function init() {
				this.cacheElements();
				this.calcHeight();
				this.resizeFunc();
				this.slickFunc();
			},
			cacheElements: function cacheElements() {
				this.$slides = $('._slides');
				this.$navbar = $('.snapp--navbar');
			},
			resizeFunc: function resizeFunc() {
				var self = this;
				$(window).on("resize", function () {
					self.calcHeight();
				});
			},
			calcHeight: function calcHeight() {
				var $height = $(window).height() - this.$navbar.outerHeight();
				var $width = $(window).width();
				this.$slides.width($width);
				this.$slides.height($height);
			},
			slickFunc: function slickFunc() {
				this.$slides.slick({
					autoplay: true,
					autoplaySpeed: 4000,
					dots: false,
					draggable: true,
					nextArrow: '<button id="slider_next" class="slider_arrows" aria-label="Next" style="display: block;"><i class="mdi mdi-md mdi-chevron-right mdi-light"></i></button>',
					prevArrow: '<button id="slider_prev" class="slider_arrows" aria-label="Previous" style="display: block;"><i class="mdi mdi-md mdi-chevron-left mdi-light"></i></button>'
				});
			}
		};

		slider.init();

		$('a.strict-down').click(function () {
			var element = $(this).attr('href'),
			    offset = $(element).offset().top;

			$('html, body').animate({ scrollTop: offset }, 700, 'swing');
			return false;
		});

		// $('a.strict-down').hover(function () {
		// 	const offset = $(window).scrollTop();
		// 	$('html, body').animate({ scrollTop: offset + 10 }, 1000, 'swing');
		// });
	})($);
});
//# sourceMappingURL=index.js.map
