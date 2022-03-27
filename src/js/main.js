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
    $(".characteristic__item").removeClass("active");
    $(this).parent().addClass("active");
})



// --- Аккордион
$(function () {
    $('.accordion').find('.accordion__item-header').click(function () {
        $('.accordion__item').removeClass('active');
        $(this).next().slideDown('fast');
        $('.accordion__item-answer').not($(this).next()).slideUp('slow');
        $(this).parent().addClass('active');
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



// --- Перевод страницы в зависимости от атрибута lang
var tran = new Translater({
    lang: `${$("html").attr("lang")}`
});



// --- Анимация при Hover на кнопку
// $(".btn__inner").mouseenter(function (e) {
//     var parentOffset = $(this).offset();
//     var relX = e.pageX - parentOffset.left;
//     var relY = e.pageY - parentOffset.top;
//     $(this).prev(".btn__circle").css({ "left": relX, "top": relY });
//     $(this).prev(".btn__circle").removeClass("desplode-circle");
//     $(this).prev(".btn__circle").addClass("explode-circle");
// });
// $(".btn__inner").mouseleave(function (e) {
//     var parentOffset = $(this).offset();
//     var relX = e.pageX - parentOffset.left;
//     var relY = e.pageY - parentOffset.top;
//     $(this).prev(".btn__circle").css({ "left": relX, "top": relY });
//     $(this).prev(".btn__circle").removeClass("explode-circle");
//     $(this).prev(".btn__circle").addClass("desplode-circle");
// });





// $(document).ready(function () {
//     var interval = setInterval(function () {
//         if ($('.characteristic__item:not(.active)').size() == 0) {
//             clearInterval(interval);
//         } else {
//             $('.characteristic__item:not(.active)').first().addClass('animate');
//         }
//     }, 400);
// });

// $(function () {
//     $.each($('.characteristic__item'), function (i, el) {
//         setTimeout(function () {
//             $('.characteristic__item').removeClass('active');
//             $(el).addClass("active");
//         }, 500 + (i * 500));
//     });
// });

// var setTheInterval = null;
// setTheInterval = setInterval(function () {
//     $(".characteristic__item").removeClass('active');
//     $(".characteristic__item:not(.active)").eq(0).addClass('active');
// }, 800);

// var imageArray = [];
// var activeIndex = 0;
// setInterval(function () {
//     imageArray[activeIndex].removeClass('active');
//     activeIndex++;
//     activeIndex %= 4;
//     imageArray[activeIndex].addClass('active');
// }, 800);

// $(document).ready(function () {
//     $(window).scroll(function () {
//         $('.characteristic').each(function () {
//             setInterval(function () {
//                 var active = $('.characteristic__item.active');
//                 active.nextOrFirst().addClass('active');
//                 active.removeClass('active');
//             }, 5000);
//             $.fn.nextOrFirst = function (selector) {
//                 var next = this.next(selector);
//                 return (next.length) ? next : this.prevAll(selector).last();
//             };
//         });
//     });
// });


// $(document).ready(function () {

// function slideIn() {
//     var active = $('.characteristic__item.active');
//     active.nextOrFirst().addClass('active');
//     active.removeClass('active');
// }
// $.fn.nextOrFirst = function (selector) {
//     var next = this.next(selector);
//     return (next.length) ? next : this.prevAll(selector).last();
// };



setInterval(function () {
    var active = $('.characteristic__item.active');
    active.removeClass('active');
    active.nextOrFirst().addClass('active');
}, 5000);
$.fn.nextOrFirst = function (selector) {
    var next = this.next(selector);
    return (next.length) ? next : this.prevAll(selector).last();
};



$('.input').each(function () {
    $(this).on('focus', function () {
        $(this).parent().addClass('focus');
    });
    $(this).on('blur', function () {
        if ($(this).val().length == 0) {
            $(this).parent().removeClass('focus');
        }
    });
    if ($(this).val() != '') $(this).parent().addClass('focus');
});



// --- Проверка валидации формы Subscribe
$(document).ready(function () {
    $('#contact__form').submit(function (e) {
        e.preventDefault();

        var name = $('#contact__form-name').val();
        var email = $('#contact__form-email').val();

        $(".error").remove();
        $(".input").removeClass('input-error');

        setTimeout(function () {
            $('.error').remove();
        }, 5000);

        if (name.length < 1) {
            $('#contact__form-name').parent().addClass('input-error');
            if ($("html").attr("lang") === 'ru') {
                $('#contact__form-name').after('<span class="error">Заполните поле</span>');
            } else {
                $('#contact__form-name').after('<span class="error">Fill in the field</span>');
            }
        }

        if (email.length < 1) {
            $('#contact__form-email').parent().addClass('input-error');
            if ($("html").attr("lang") === 'ru') {
                $('#contact__form-email').after('<span class="error">Заполните поле</span>');
            } else {
                $('#contact__form-email').after('<span class="error">Fill in the field</span>');
            }
        } else {
            var regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var validEmail = regEx.test(email);
            if (!validEmail) {
                $('#contact__form-email').parent().addClass('input-error');
                if ($("html").attr("lang") === 'ru') {
                    $('#contact__form-email').after('<span class="error">Заполните правильно</span>');
                } else {
                    $('#contact__form-email').after('<span class="error">Fill in correctly</span>');
                }
            }
        }
    });
});


// jQuery(document).ready(function ($) {

//     $("body").flurry({
//         character: ".",
//         color: "white",
//         frequency: 360,
//         speed: 150000,
//         small: 8,
//         large: 48,
//         wind: 60,
//         windVariance: 20,
//         rotation: 0,
//         rotationVariance: 90,
//     });

// });



particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 155,
            "density": {
                "enable": true,
                "value_area": 789.1476416322727
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.48927153781200905,
            "random": false,
            "anim": {
                "enable": true,
                "speed": 0.2,
                "opacity_min": 0,
                "sync": false
            }
        },
        "size": {
            "value": 2,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 0.2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 83.91608391608392,
                "size": 1,
                "duration": 3,
                "opacity": 1,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

