$(window).scroll(() => {
    var windowTop = $(window).scrollTop();
    windowTop > 200 ? $('.header').addClass('header-mini') : $('.header').removeClass('header-mini');
});


$(document).ready(function () {
    
    $(function () {
        $('.accordion').find('.accordion__item-header').click(function () {

            $('.accordion__item').removeClass('accordion__item--active');
            
            $(this).next().slideDown('fast');
            
            $('.accordion__item-answer').not($(this).next()).slideUp('slow');
            
            $(this).parent().addClass('accordion__item--active');
        });
    });


    $("body").on('click', '[href*="#"]', function (e) {
        var fixed_offset = 100;
        $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
        e.preventDefault();
    });


    $('.hamburger').on('click', function () {
        $('.header').toggleClass('mobile');
    })

    $('.gamb-btn').on('click', function () {
        $('.header-mobile').toggleClass('btn--active');
    });

   


});


