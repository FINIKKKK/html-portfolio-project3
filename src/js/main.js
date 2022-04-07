// --- Hamburger
$('.hamburger').on('click', function () {
    $('.header').toggleClass('mobile');
    $('html').toggleClass('hidden');
})



// --- Поочередная анимация появления characteristic
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



// --- Аккордион
$(function () {
    $('.accordion').find('.accordion__item-header').click(function () {

        $('.accordion__item').removeClass('active');
        $(this).next().slideDown('fast');
        $('.accordion__item-answer').not($(this).next()).slideUp('slow');
        $(this).parent().addClass('active');
    });
});



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



// --- Проверка геолокации и автоматическое определение языка страницы
$.ajax({
    url: "https://get.geojs.io/v1/ip/geo.js",
    dataType: "jsonp",
    jsonpCallback: "geoip",
    success: function (data) {
        // Коды русскоязычных стран
        let countries = ["KZ", "UA", "RU", "BY", "UZ", "TM", "GE", "AZ", "MD", "KG"];

        // Изменение атрибутта lang у html
        if (countries.includes(data.country_code)) {
            $("html").attr("lang", "ru");
        } else {
            $("html").attr("lang", "en");
        }

        // Перевод страницы в зависимости от атрибута lang
        var tran = new Translater({
            lang: `${$("html").attr("lang")}`
        });

        // Смена активного элемента в списке языков
        if ($("html").attr("lang") === 'ru') {
            $('.languages__list-item').first().html('rus')
            $('.languages__list-item').last().html('eng')
        } else {
            $('.languages__list-item').first().html('eng')
            $('.languages__list-item').last().html('rus')
        }

        // Смена Title
        var url = window.location.href;
        var page1 = new RegExp("/");

        if (page1.test(url) && $("html").attr("lang") === 'ru') {
            $("title").html("Проект 3");
        } else {
            $("title").html("Project 3");
        }

        // Функция проверки при нажатии
        function checkLang() {
            if ($('.languages__list-item.active').html() == 'rus') {
                $("html").attr("lang", "ru");
                tran.setLang('default');
            } else {
                $("html").attr("lang", "en");
                tran.setLang('en');
            }

            if (page1.test(url) && $("html").attr("lang") === 'ru') {
                $("title").html("Проект 3");
            } else {
                $("title").html("Project 3");
            }

        }

        // Менять элемент в languages
        $('.languages__list-item').click(function () {
            if ($(this).hasClass('active') == false) {
                let ln1 = $('.languages__item-eng').html();
                let ln2 = $('.languages__item-rus').html();

                $('.languages__item-eng').html(ln2);
                $('.languages__item-rus').html(ln1);
            }

            checkLang();
        });
        $('.languages__icon').click(function () {
            let ln1 = $('.languages__item-eng').html();
            let ln2 = $('.languages__item-rus').html();

            $('.languages__item-eng').html(ln2);
            $('.languages__item-rus').html(ln1);

            checkLang();
        });
    }
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



// --- Custom Cursor
var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $outline: document.querySelector('.cursor'),

    init: function () {
        // Set up element sizes
        this.outlineSize = this.$outline.offsetWidth;

        this.setupEventListeners();
        this.animateDotOutline();
    },

    setupEventListeners: function () {
        var self = this;

        // Anchor hovering
        document.querySelectorAll('input, textarea, button, .top__btn, .accordion__item-header').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                self.cursorEnlarged = true;
                $('.cursor').css('background-color', 'transparent');
            });
            el.addEventListener('mouseout', function () {
                self.cursorEnlarged = false;
                $('.cursor').css('background-color', 'rgba(255,255,255,1)');
            });
        });

        // Anchor hovering
        document.querySelectorAll('a, .languages__icon, .languages__list-item').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                self.cursorEnlarged = true;
                $('.cursor').css({ 'transform': 'translate(-50%, -50%) scale(0.5)' });
            });
            el.addEventListener('mouseout', function () {
                self.cursorEnlarged = false;
                $('.cursor').css({ 'transform': 'translate(-50%, -50%) scale(1)' });
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