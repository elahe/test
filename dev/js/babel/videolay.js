$.fn.videolay = function(options) {
	const settings = $.extend({
		width: 1280, // Scale Width
		height: 720, // Scale Height
		position: '50% 50%', // Poster Position
		posterSize: 'cover', // Poster Size
		mute: true,
		loop: true,
		complete: null, // Callback for ended video
		context: false, // Disable Right-Click on video `disable controls`,
	}, options);


	// debounce for resize function
	function debounce(fn, delay) {
		var timer = null;
		return function () {
			var context = this,
				args = arguments;

			window.clearTimeout(timer);

			timer = window.setTimeout(function () {
				fn.apply(context, args);
			}, delay);
		};
	}

	return this.each(function() {
		const $this = $(this);
		const $video = $this.find('video');
		const posterImage = $video.attr('poster');


		// Define the attached selector
		const sizeVideo = () => {
			// Get parent element height and width
			let parentWidth = $this.outerWidth();
			let parentHeight = $this.outerHeight();

			// Get native video width and height
			let nativeWidth = settings.width;
			let nativeHeight = settings.height;

			// Get the scale factors
			let widthScaleFactor = parentWidth / nativeWidth;
			let heightScaleFactor = parentHeight / nativeHeight;

			// Based on highest scale factor set width and height
			if (widthScaleFactor > heightScaleFactor) {
				$video.height(`auto`);
				$video.width(`${parentWidth}px`);
			} else {
				$video.height(`${parentHeight}px`);
				$video.width(`auto`);
			}

			const parentStyle = {
				position: 'relative',
				width: $(window).width(),
				height: $(window).height(),
				overflow: `hidden`,
				backgroundImage: `url(${posterImage})`,
				backgroundSize: settings.posterSize,
				backgroundPosition: settings.position,
			};
			$this.css(parentStyle);
		};
		sizeVideo();

		// call sizeVideo on resize
		window.addEventListener('resize', debounce(sizeVideo(), 50));

		const parentStyle = {
			position: 'fixed',
			top: 0,
			left: 0,
			zIndex: 1,
			width: $(window).width(),
			height: $(window).height(),
			overflow: `hidden`,
			backgroundImage: `url(${posterImage})`,
			backgroundSize: `cover`,
			backgroundPosition: `center center`,
		};
		const videoStyle = {
			position: `absolute`,
			top: `50%`,
			left: `50%`,
			// elem.style[`-webkit-transform`] = `translate(-50%, -50%)`,
			// elem.style[`-ms-transform`] = `translate(-50%, -50%)`,
			transform: `translate(-50%, -50%)`,
		};
		window.addEventListener('resize', debounce(sizeVideo, 100));

		// const supportsVideo = (typeof(this.canPlayType) !== 'undefined') ? true : false;
		const isMobile = {
			android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			blackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			windows: function() {
				return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
			},
			test: function() {
				return (this.android() || this.blackBerry() || this.iOS() || this.opera() || this.windows());
			},
		};
		if (isMobile.test()) {
			$video.remove();
			return false;
		}

		$video.prop('muted', settings.mute);
		$video.prop('controls', false);
		// $video.prop('autoplay', settings.autoplay);

		if (settings.context) {
			$video.bind('contextmenu', function() {
				return false;
			});
		}

		if (typeof settings.complete === 'function') { // make sure the complete is a function
			$video.bind('ended', function() {
				settings.complete(); // complete video & call function.

				// infinite loop
				if (settings.loop) {
					this.play();
				}
			});
		}

	});
};


$('#videolay').videolay({
	hello: 123,
	callback: function () {
		$(this).remove();
	},
});
