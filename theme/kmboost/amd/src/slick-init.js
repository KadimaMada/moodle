define(['jquery', 'theme_kmboost/slick'], function($, slick) {

    return {
        init: function() {
            var dir = $('html').attr('dir');
            $('.slider').slick({
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                prevArrow: '#mycoursesprev',
                nextArrow: '#mycoursesnext',
                variableWidth: true,
                rtl: dir === 'rtl'
            });
        }
    };

});
