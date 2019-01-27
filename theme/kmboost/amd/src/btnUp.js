define([ 'jquery' ], function($) {
	return {
		init: function() {
			$('.btn-up').click(function() {
				$("body, html").animate({ scrollTop: 0 }, 500);
			});
		}
	};
});
