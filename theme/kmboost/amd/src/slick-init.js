define(['jquery', 'theme_kmboost/slick'], function($, slick) {

    return {
        init: function() {
            console.dir('slick init');
            $('.slider').slick({
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 1,
                prevArrow: '#mycoursesprev',
                nextArrow: '#mycoursesnext',
                variableWidth: true,
            });
        }
    };

});
