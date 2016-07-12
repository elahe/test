requirejs.config({
	baseUrl: 'dist/js/',
	paths: {
		jquery: 'libraries/jquery',
		velocity: 'libraries/velocity',
		slick: 'libraries/slick',
	},
	shim: {
		velocity: {
			deps: ["jquery"]
		},
	},
});
