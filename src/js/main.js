// --- Hamburger
$('.hamburger').on('click', function () {
    $('.header').toggleClass('mobile');
    $('html').toggleClass('hidden');
})



// --- Button в Footer
document.querySelectorAll('.btn').forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>');



// --- Кпопки на "Characteristic"
$(".characteristic__item-btn").on('click', function () {
    $(".characteristic__item").removeClass("active");
    $(this).parent().addClass("active");
})



// --- При фокусе поднимать label
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



// --- Locomotive Scroll (Smoth)
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: true,
});
scroll.destroy();
document.addEventListener("DOMContentLoaded", function (event) {
    scroll.init();
});



// --- Аккордион
$(function () {
    $('.accordion').find('.accordion__item-header').click(function () {

        $('.accordion__item').removeClass('active');
        $(this).next().slideDown('fast');
        $('.accordion__item-answer').not($(this).next()).slideUp('slow');
        $(this).parent().addClass('active');
    });
});



// --- Менять элемент в languages
$('.languages__list-item').click(function () {
    if($(this).hasClass('active') == false) {
        let ln1 = $('.languages__item-eng').html();
        let ln2 = $('.languages__item-rus').html();
    
        $('.languages__item-eng').html(ln2);
        $('.languages__item-rus').html(ln1);
    }
});


// $('.languages__icon').click(function () {
//     $('.languages__list-item').removeClass('active');

//     $('.languages__list > .languages__list-item').each(function () {
//         if ($(this).next()) {
//             el = $(this).next();
//         } else {
//             el = $(this).prev();
//         }

//         var copy_from = $(this).clone(true);
//         $(el).replaceWith(copy_from);

//         var copy_to = $(el).clone(true);
//         $(this).replaceWith(copy_to);
//     });

//     $('.languages__list-item').first().addClass('active');

//     return false;
// });



// --- Перевод страницы в зависимости от атрибута lang
var tran = new Translater({
    lang: `${$("html").attr("lang")}`
});



// --- Custom Cursor
var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $outline: document.querySelector('.cursor-dot-outline'),

    init: function () {
        // Set up element sizes
        this.outlineSize = this.$outline.offsetWidth;

        this.setupEventListeners();
        this.animateDotOutline();
    },

    setupEventListeners: function () {
        var self = this;

        // Anchor hovering
        document.querySelectorAll('a, .simple-select, .accordion__item-header, .search, .prev, .next, .swiper-pagination-bullet, input').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                self.cursorEnlarged = true;
                // self.toggleCursorSize();
                $('.cursor-dot-outline').css('background-color', 'transparent');
            });
            el.addEventListener('mouseout', function () {
                self.cursorEnlarged = false;
                // self.toggleCursorSize();
                $('.cursor-dot-outline').css('background-color', 'rgba(255,255,255,1)');
            });
        });

        // Click events
        document.addEventListener('mousedown', function () {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function () {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });


        document.addEventListener('mousemove', function (e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
        });

        // Hide/show cursor
        document.addEventListener('mouseenter', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$outline.style.opacity = 1;
        });

        document.addEventListener('mouseleave', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$outline.style.opacity = 0;
        });
    },

    animateDotOutline: function () {
        var self = this;

        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';

        requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function () {
        var self = this;

        if (self.cursorEnlarged) {
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleCursorVisibility: function () {
        var self = this;

        if (self.cursorVisible) {
            self.$outline.style.opacity = 1;
        } else {
            self.$outline.style.opacity = 0;
        }
    },

}
cursor.init();






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



// setInterval(function () {
//     var active = $('.characteristic__item.active');
//     active.removeClass('active');
//     active.nextOrFirst().addClass('active');
// }, 7000);
// $.fn.nextOrFirst = function (selector) {
//     var next = this.next(selector);
//     return (next.length) ? next : this.prevAll(selector).last();
// };