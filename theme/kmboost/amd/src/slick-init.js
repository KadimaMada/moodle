define(['jquery', 'theme_kmboost/slick'], function($, slick) {

    return {
        init: function() {
            var dir = $('html').attr('dir');
            $('.slider').slick({
                // centerMode: true,
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                prevArrow: '#mycoursesprev',
                nextArrow: '#mycoursesnext',
                variableWidth: true,
                rtl: dir === 'rtl',
                responsive: [
                    {
                      breakpoint: 400,
                      settings: {
                        slidesToShow: 1,
                        centerMode: true,
                        slidesToScroll: 1,
                        arrows: false
                    
                      }
                    }
               
                  ]
            });
            $('.slider').animate({opacity: 1}, 500);
        }
    };

});
