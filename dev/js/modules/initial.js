'use strict';

define(['jquery', 'velocity'], function ($, velocity) {
	$(document).ready(function () {
		// $(".hamburger-menu").click(function(){
		// 	$(".menu-open").slideToggle("slow");
		// });
		var Head = $('.menu--holder');
		var McButton = Head.find("[data-href]");
		var MobileMenu = $('.mobile-menu');
		var McBar1 = McButton.find("._line:nth-child(1)");
		var McBar2 = McButton.find("._line:nth-child(2)");
		var McBar3 = McButton.find("._line:nth-child(3)");

		Head.click(function () {
			if (!Head.hasClass("active")) {
				Head.addClass('active');
				McBar1.velocity({ top: "50%" }, { duration: 200, easing: "swing" });
				McBar3.velocity({ top: "50%" }, { duration: 200, easing: "swing" }).velocity({ rotateZ: "90deg" }, { duration: 800, delay: 200, easing: [500, 20] });
				McButton.velocity({ rotateZ: "135deg" }, { duration: 800, delay: 200, easing: [500, 20] });

				MobileMenu.velocity("slideDown", { duration: 650 });
			} else {
				Head.removeClass('active');
				McButton.velocity("reverse");
				McBar3.velocity({ rotateZ: "0deg" }, { duration: 800, easing: [500, 20] }).velocity({ top: "100%" }, { duration: 200, easing: "swing" });
				McBar1.velocity("reverse", { delay: 800 });

				MobileMenu.velocity("slideUp", { duration: 500 });
			}
		});
	});
});
//# sourceMappingURL=initial.js.map
