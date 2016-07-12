define(['jquery'], function($){
	(function($) {

		// $('.dotted-handle .next').click((e) => {
		// 	let currentSlide = $('.active-slide'),
		// 		nextSlide    = currentSlide.next(),
		// 		currentDot   = $('.active-dot'),
		// 		nextDot      = currentDot.next(),
		// 		currentBtn   = $('.btn-features.active'),
		// 		nextBtn      = currentBtn.next();
		//
		// 	if (nextSlide.length === 0) {
		// 		nextSlide = $('.slide').first();
		// 		nextDot = $('.module').first();
		// 		nextBtn = $('.btn-features').first();
		// 	}
		//
		// 	currentSlide.removeClass('active-slide');
		// 	nextSlide.addClass('active-slide');
		// 	nextSlide.find('.sprite_concept').velocity("fadeIn", { duration: 1500 });
		//
		// 	currentDot.removeClass('active-dot');
		// 	nextDot.addClass('active-dot');
		//
		// 	currentBtn.removeClass('active');
		// 	nextBtn.addClass('active');
		//
		// 	return false;
		// });
		//
		// $('.dotted-handle .prev').click(function() {
		// 	// const clName = $(this).attr('class');
		//
		// 	let currentSlide = $('.active-slide'),
		// 		prevSlide    = currentSlide.prev(),
		// 		currentDot   = $('.active-dot'),
		// 		prevDot      = currentDot.prev(),
		// 		currentBtn   = $('.btn-features.active'),
		// 		prevBtn      = currentBtn.prev();
		//
		// 	if (prevSlide.length === 0) {
		// 		prevSlide = $('.slide').last();
		// 		prevDot = $('.module').last();
		// 		prevBtn = $('.btn-features').last();
		// 	}
		//
		// 	currentSlide.removeClass('active-slide');
		// 	prevSlide.addClass('active-slide');
		//
		// 	currentDot.removeClass('active-dot');
		// 	prevDot.addClass('active-dot');
		//
		// 	currentBtn.removeClass('active');
		// 	prevBtn.addClass('active');
		//
		// 	return false;
		// });

		$('#slider-dots a, .btn-features').click(function(){

			let Slide = $('.slide'),
				Dots  = $('#slider-dots a'),
				Btn   = $('.btn-features');

			let idSlide = $(this).index();

			Slide.velocity("fadeOut", {
				duration: 'fast',
				complete: () => {
					// Slide.find('.sprite_concept')
					// 	.velocity({
					// 		duration: 300,
					// 		opacity: 1,
					// 		translateY: "0",
					// 	}, 'easeInSine');
					// Slide.eq(idSlide).velocity({
					// 	duration: 600,
					// 	translateX: '10%',
					// 	// delay: 100,
					// }, 'easeOutQuad');
					Slide.eq(idSlide).velocity("fadeIn", { duration: 600, delay: 400 }, 'spring');
					// Slide.eq(idSlide).find('.sprite_concept')
					// 	.velocity({
					// 		duration: 600,
					// 		translateY: "-80px",
					// 	}, 'easeInSine');
				}
			});
			// Slide.removeClass('active-slide');
			// Slide.eq(idSlide).addClass('active-slide');

			Dots.removeClass('active-dot');
			Dots.eq(idSlide).addClass('active-dot');

			Btn.removeClass('active');
			Btn.eq(idSlide).addClass('active');

			return false;
		});

		// NOTE: Dotted module
		// $('section.features-main').each(() => {
		//     let a = $('.slide').length;
		//
		//     for (let i = 0; i < a; i++) {
		//         $('#slider-dots').append('<a class="module"><i class="circle"></i></a>').click(function(){
		//             alert(123);
		//         });
		//     }
		// });

		$('.features-main .slide:first').addClass('active-slide');
		$('#slider-dots a:first').addClass('active-dot');
	})(jQuery);

});
