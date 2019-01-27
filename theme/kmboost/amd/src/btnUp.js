define([ 'jquery' ], function($) {
	return {
		init: function() {
			$('.btn-up').click(function(event) {
        event.preventDefault();
				$("body, html").animate({ scrollTop: 0 }, 500);
			});
		}
	};
});
