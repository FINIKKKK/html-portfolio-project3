// --- Hamburger
$('.hamburger').on('click', function () {
    $('.header').toggleClass('mobile');
})

document.querySelectorAll('.btn').forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>');


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
// wow = new WOW(
//     {
//         boxClass: 'wow',
//         animateClass: 'animate__animated',
//         offset: 100,
//         duraction: 1,
//         mobile: true,
//         live: true,
//     }
// )
// wow.init();



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



// setInterval(function () {
//     var active = $('.characteristic__item.active');
//     active.removeClass('active');
//     active.nextOrFirst().addClass('active');
// }, 7000);
// $.fn.nextOrFirst = function (selector) {
//     var next = this.next(selector);
//     return (next.length) ? next : this.prevAll(selector).last();
// };



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

// (function () {
//     var scroll = new LocomotiveScroll({
//         el: document.querySelector('[data-scroll-container]'),
//         smooth: true,
//         smoothMobile: false
//     });
// })();

// particlesJS("particles-js", {
//     "particles": {
//         "number": {
//             "value": 55,
//             "density": {
//                 "enable": true,
//                 "value_area": 789.1476416322727
//             }
//         },
//         "color": {
//             "value": "#ffffff"
//         },
//         "shape": {
//             "type": "circle",
//             "stroke": {
//                 "width": 0,
//                 "color": "#000000"
//             },
//             "polygon": {
//                 "nb_sides": 5
//             },
//             "image": {
//                 "src": "img/github.svg",
//                 "width": 100,
//                 "height": 100
//             }
//         },
//         "opacity": {
//             "value": 0.48927153781200905,
//             "random": false,
//             "anim": {
//                 "enable": true,
//                 "speed": 0.2,
//                 "opacity_min": 0,
//                 "sync": false
//             }
//         },
//         "size": {
//             "value": 2,
//             "random": true,
//             "anim": {
//                 "enable": true,
//                 "speed": 2,
//                 "size_min": 0,
//                 "sync": false
//             }
//         },
//         "line_linked": {
//             "enable": false,
//             "distance": 150,
//             "color": "#ffffff",
//             "opacity": 0.4,
//             "width": 1
//         },
//         "move": {
//             "enable": true,
//             "speed": 0.2,
//             "direction": "none",
//             "random": true,
//             "straight": false,
//             "out_mode": "out",
//             "bounce": false,
//             "attract": {
//                 "enable": false,
//                 "rotateX": 600,
//                 "rotateY": 1200
//             }
//         }
//     },
//     "interactivity": {
//         "detect_on": "canvas",
//         "events": {
//             "onhover": {
//                 "enable": true,
//                 "mode": "bubble"
//             },
//             "onclick": {
//                 "enable": true,
//                 "mode": "push"
//             },
//             "resize": true
//         },
//         "modes": {
//             "grab": {
//                 "distance": 400,
//                 "line_linked": {
//                     "opacity": 1
//                 }
//             },
//             "bubble": {
//                 "distance": 83.91608391608392,
//                 "size": 1,
//                 "duration": 3,
//                 "opacity": 1,
//                 "speed": 3
//             },
//             "repulse": {
//                 "distance": 200,
//                 "duration": 0.4
//             },
//             "push": {
//                 "particles_nb": 4
//             },
//             "remove": {
//                 "particles_nb": 2
//             }
//         }
//     },
//     "retina_detect": true
// });


// var element = document.getElementById("canvas") || document.body;
// var options = {};

// if (element instanceof HTMLCanvasElement) {
//     options.canvas = element;
// }

// var renderer = new THREE.WebGLRenderer(options, { antialias: true });

// if (!options.canvas) {
//     element.appendChild(renderer.domElement);
//     var canvas = renderer.domElement;
// } else {
//     canvas = element;
// }

// // Scene
// var scene = new THREE.Scene();

// // Camera
// camera = new THREE.PerspectiveCamera(75, canvas.clientWidth, canvas.clientHeight, 1, 1000);
// camera.position.z = 500;

// // Fog
// scene.fog = new THREE.Fog( 0x222125, 0.005, 560, 1000 );

// // Variables
// var particles, particle, particleMaterial, particleCount, points, texture;
// var xSpeed, ySpeed;

// // Speed
// xSpeed = 0.0005;
// ySpeed = 0.001;

// // Particles
// particleCount = 15000;
// particles = new THREE.Geometry();

// for (var i = 0; i < particleCount; i++) {
//   var px = Math.random() * 2000 - 1000;
//   var py = Math.random() * 2000 - 1000;
//   var pz = Math.random() * 2000 - 1000;

//   particle = new THREE.Vector3(px, py, pz);
//   particle.velocity = new THREE.Vector3(0, Math.random(), 0);
//   particles.vertices.push(particle);
// }

// /* ------------------------------------
// // Texture
// var sprite = new THREE.TextureLoader().load( "textures/sprites/disc.png" );

// // Particles material
// particleMaterial = new THREE.PointsMaterial({
//   size: 6.5,
//   sizeAttenuation: false,
//   map: sprite,
//   alphaTest: 0.5,
//   transparent: true,
//   opacity: 0.8,
//   color: 0x45f4d9,
// 	blending: THREE.AdditiveBlending
// });
// *///-----------------------------------
// var material = new THREE.PointsMaterial( { color: 0xffffff } ) // Only for Codepen
// //-------------------------------------

// // Points
// points = new THREE.Points(particles, material);
// points.sortParticles = true;
// scene.add(points);

// // lights
// var light1, light2, hemiLight;

// light1 = new THREE.PointLight( 0x52ffef, 100, 600);
// light1.position.set( -200, 300, 300 );
// light1.castShadow = true;
// light1.shadow.mapSize.width = 2048;
// light1.shadow.mapSize.height = 2048;
// scene.add( light1 );

// light2 = new THREE.PointLight( 0x53ffd1, 50, 600);
// light2.position.set( 250, -300, 300 );
// light2.castShadow = true;
// light2.shadow.mapSize.width = 2048;
// light2.shadow.mapSize.height = 2048;
// scene.add( light2 );

// hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 5 );
// hemiLight.color.setHSL( 0.6, 1, 0.6 );
// hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
// hemiLight.position.set( 0, 500, 0 );
// scene.add( hemiLight );

// // Resize
// var resize = function() {
//     var width = canvas.clientWidth;
//     var height = canvas.clientHeight;
//     if ( canvas.width != width || canvas.height != height ) {
//         renderer.setSize( canvas.clientWidth, canvas.clientHeight, false );

//         camera.aspect = canvas.clientWidth / canvas.clientHeight;
//         camera.updateProjectionMatrix();
//     }
// };

// // Render
// var render = function() {
//   // Call resize
//   resize();

//   // Animate particles randomly
//   var i = particleCount;
//   while(i--){
//     var particle = particles.vertices[i];

//     // Animate y
//     if(particle.y > 1000){
//       particle.y = -1000;
//       particle.velocity.y = Math.random();
//     }

//     particle.velocity.y += Math.random() * ySpeed;
//     particle.add(particle.velocity);
//   }

//   points.geometry.verticesNeedUpdate = true;

//   // Points to go upwards
//   points.rotation.y += xSpeed;

//   // Call scene and camera
//   renderer.render( scene, camera );

//   // Update animation frame
//   requestAnimationFrame( render, canvas );
// };

// // Call render
// render();