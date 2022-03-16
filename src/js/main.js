// --- Hamburger
$('.hamburger').on('click', function () {
    $('.header').toggleClass('mobile');
})



// --- Scroll к Якорям
$("body").on('click', '[href*="#"]', function (e) {
    var fixed_offset = 100;
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
    e.preventDefault();
});



// --- Кпопки на "Characteristic"
$(".characteristic__item-btn").on('click', function () {
    $(".characteristic__item").removeClass("characteristic__item--active");
    $(this).parent().addClass("characteristic__item--active");
})



// --- Аккордион
$(function () {
    $('.accordion').find('.accordion__item-header').click(function () {
        $('.accordion__item').removeClass('accordion__item--active');
        $(this).next().slideDown('fast');
        $('.accordion__item-answer').not($(this).next()).slideUp('slow');
        $(this).parent().addClass('accordion__item--active');
    });
});



// --- Анимация при скролле(WOW)
wow = new WOW(
    {
        boxClass: 'wow',
        animateClass: 'animate__animated',
        offset: 100,
        duraction: 1,
        mobile: true,
        live: true,
    }
)
wow.init();



// Перевод страницы в зависимости от атрибута lang
var tran = new Translater({
    lang: `${$("html").attr("lang")}`
});




