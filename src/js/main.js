// --- Hamburger
$('.hamburger').on('click', function () {
    $('.header').toggleClass('mobile');
    $('html').toggleClass('hidden');
})



$(document).ready(function () {
    var characteristicAnim = function () {
        var active = $('.characteristic__item.active');
        active.removeClass('active');
        active.nextOrFirst().addClass('active');
    }

    interval = setInterval(characteristicAnim, 5000);
    
    $.fn.nextOrFirst = function (selector) {
        var next = this.next(selector);
        return (next.length) ? next : this.prevAll(selector).last();
    };

    // --- Кпопки на "Characteristic"
    $(".characteristic__item-btn").on('click', function () {
        clearInterval(interval);

        $(".characteristic__item").removeClass("active");
        $(this).parent().addClass("active");

        interval = setInterval(characteristicAnim, 5000);
    })
});

// $(document).ready(function () {
//     var interval = setInterval(function () {
//         if ($('.characteristic__item:not(.active)').size() == 0) {
//             clearInterval(interval);
//         } else {
//             $('.characteristic__item:not(.active)').first().addClass('animate');
//         }
//     }, 400);
// });





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
        $(".input-block").removeClass('input-error');

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


// --- Particles
var WIDTH;
var HEIGHT;
var canvas;
var con;
var g;
var pxs = new Array();
var rint = 60;

if ($(window).width() < 900 && $(window).width() > 450) {
    var particlesCount = 300;
} else if ($(window).width() < 450) {
    var particlesCount = 150;
} else {
    var particlesCount = 400;
}

jQuery(document).ready(function () {
    var canvas_particles = jQuery('#particles');
    WIDTH = canvas_particles.width();
    HEIGHT = canvas_particles.height();
    jQuery('#particles').width(WIDTH).height(HEIGHT);
    canvas = document.getElementById('particles');
    jQuery(canvas).attr('width', WIDTH).attr('height', HEIGHT);
    con = canvas.getContext('2d');
    for (var i = 0; i < particlesCount; i++) {
        pxs[i] = new Circle();
        pxs[i].reset();
    }
    setInterval(draw, rint);
});

function draw() {
    con.clearRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < pxs.length; i++) {
        pxs[i].fade();
        pxs[i].move();
        pxs[i].draw();
    }
}

function Circle() {
    this.s = { ttl: 8000, xmax: 5, ymax: 2, rmax: 3, rt: 1, xdef: 960, ydef: 540, xdrift: 4, ydrift: 4, random: true, blink: true };

    this.reset = function () {
        this.x = (this.s.random ? WIDTH * Math.random() : this.s.xdef);
        this.y = (this.s.random ? HEIGHT * Math.random() : this.s.ydef);
        this.r = ((this.s.rmax - 1) * Math.random()) + 1;
        this.dx = (Math.random() * this.s.xmax) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random() * this.s.ymax) * (Math.random() < .5 ? -1 : 1);
        this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
        this.rt = Math.random() * this.hl;
        this.s.rt = Math.random() + 1;
        this.stop = Math.random() * .2 + .4;
        this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
        this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    }

    this.fade = function () {
        this.rt += this.s.rt;
    }

    this.draw = function () {
        if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt * -1;
        else if (this.rt >= this.hl) this.reset();
        var newo = 1 - (this.rt / this.hl);
        con.beginPath();
        con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        con.closePath();
        var cr = this.r * newo;
        g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        g.addColorStop(0.0, 'rgba(255,255,255,' + newo + ')');
        g.addColorStop(this.stop, 'rgba(249,255,232,' + (newo * .6) + ')');
        g.addColorStop(1.0, 'rgba(249,255,232,0)');
        con.fillStyle = g;
        con.fill();
    }

    this.move = function () {
        this.x += (this.rt / this.hl) * this.dx;
        this.y += (this.rt / this.hl) * this.dy;
        if (this.x > WIDTH || this.x < 0) this.dx *= -1;
        if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
    }

    this.getX = function () { return this.x; }
    this.getY = function () { return this.y; }
}



// --- Менять элемент в languages
$('.languages__list-item').click(function () {
    if ($(this).hasClass('active') == false) {
        let ln1 = $('.languages__item-eng').html();
        let ln2 = $('.languages__item-rus').html();

        $('.languages__item-eng').html(ln2);
        $('.languages__item-rus').html(ln1);
    }
});
$('.languages__icon').click(function () {
    let ln1 = $('.languages__item-eng').html();
    let ln2 = $('.languages__item-rus').html();

    $('.languages__item-eng').html(ln2);
    $('.languages__item-rus').html(ln1);
});


// --- Проверка геолокации и автоматическое определение языка страницы
// $.ajax({
//     url: "https://get.geojs.io/v1/ip/geo.js",
//     dataType: "jsonp",
//     jsonpCallback: "geoip",
//     success: function (data) {
//         // Коды русскоязычных стран
//         let countries = ["KZ", "UA", "RU", "BY", "UZ", "TM", "GE", "AZ", "MD", "KG"];

//         // Изменение атрибутта lang у html
//         if (countries.includes(data.country_code)) {
//             $("html").attr("lang", "ru");
//         } else {
//             $("html").attr("lang", "en");
//         }

//         // Перевод страницы в зависимости от атрибута lang
//         var tran = new Translater({
//             lang: `${$("html").attr("lang")}`
//         });

//         // Смена активного элемента в списке языков
//         if ($("html").attr("lang") === 'ru') {
//             $('.simple-select ul li').removeClass('active');
//             $('.simple-select ul li').first().addClass('active');
//             $('.simple-select span').html('ru');
//         } else {
//             $('.simple-select ul li').removeClass('active');
//             $('.simple-select ul li').last().addClass('active');
//             $('.simple-select span').html('en');
//         }

//         // Смена языка в атрибутте lang
//         $(".simple-select a").on("click", function (e) {
//             e.preventDefault();
//             $("html").attr("lang", $(this).text());
//         });
//         // Смена языка в списке
//         $('.simple-select ul li a').first().click(function () {
//             $(this).toggleClass('gg');
//             tran.setLang('default');
//         });
//         $('.simple-select ul li a').last().click(function () {
//             $(this).toggleClass('gg');
//             tran.setLang('en');
//         });
//     }
// });



// --- Перевод страницы в зависимости от атрибута lang
var tran = new Translater({
    lang: `${$("html").attr("lang")}`
});



// --- Button в Footer
document.querySelectorAll('.btn').forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>');



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



