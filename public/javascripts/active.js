// Index of jQuery Active Code

(function ($) {
    'use strict';

    var $window = $(window);
    var zero = 0;

    $('#intro-video').append(`
        <video style="transform: scale(2);" autoplay loop>
            <source id="intro-video" src="assets/intro.mp4"></source>
        </video>
    `)




    // :: 1.0 PRELOADER ACTIVE CODE
    $(window).on('load', function () {
        $('#loader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // :: 2.0 COLOR SWITCHER ACTIVE CODE
    $(".option").on('click', function () {
        var getId = $(this).attr('value');
        $('body').removeClass('gradient-2 gradient-3').addClass(getId);
    });
    $(".color-btn").on('click', function () {
        $(".switcher").toggleClass('on');
    });

    // :: 3.0 NAVIGATION MENU ACTIVE CODE
    // dropdown for mobile
    $(document).on("ready", function () {
        checkWidth(true);
        $(window).resize(function () {
            checkWidth(false);
        });
    });

    function checkWidth(init) {
        // If browser resized, check width again 
        if ($(window).width() <= 991) {
            $('.dropdown-submenu a').on("click", function (e) {
                $(this).next('ul').toggle();
                e.stopPropagation();
                e.preventDefault();
            });
        }
    }
    function navMenu() {

        // MAIN MENU TOGGLER ICON (MOBILE SITE ONLY)
        $('[data-toggle="navbarToggler"]').on("click", function () {
            $('.navbar').toggleClass('active');
            $('body').toggleClass('canvas-open');
        });
        // MAIN MENU TOGGLER ICON
        $('.navbar-toggler').on("click", function () {
            $('.navbar-toggler-icon').toggleClass('active');
        });

        // NAVBAR STICKY
        var $stickyNav = $(".navbar-sticky");

        $(window).on("scroll load", function () {
            var scroll = $(window).scrollTop();
            if (scroll >= 120) {
                $stickyNav.addClass("navbar-sticky-moved-up");
            } else {
                $stickyNav.removeClass("navbar-sticky-moved-up");
            }
            // apply transition
            if (scroll >= 250) {
                $stickyNav.addClass("navbar-sticky-transitioned");
            } else {
                $stickyNav.removeClass("navbar-sticky-transitioned");
            }
            // sticky on
            if (scroll >= 500) {
                $stickyNav.addClass("navbar-sticky-on");
            } else {
                $stickyNav.removeClass("navbar-sticky-on");
            }

        });
    }
    navMenu();

    // :: 4.0 SCROLL TO TOP ACTIVE CODE
    var offset = 300;
    var duration = 500;

    $window.on('scroll', function () {
        if ($(this).scrollTop() > offset) {
            $("#scrollUp").fadeIn(duration);
        } else {
            $("#scrollUp").fadeOut(duration);
        }
    });

    $("#scrollUp").on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, duration);
    });

    // :: 5.0 SCROLL LINK ACTIVE CODE
    var scrollLink = $('.scroll');

    // :: 6.0 SMOOTH SCROLLING ACTIVE CODE
    scrollLink.on('click', function (e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });

    // :: 7.0 AOS ACTIVE CODE
    AOS.init();

    // :: 8.0 WOW ACTIVE CODE
    new WOW().init();

    // :: 9.0 PREVENT DEFAULT ACTIVE CODE
    $("a[href='#']").on('click', function ($) {
        $.preventDefault();
    });

    // :: 10.0 FANCYBOX VIDEO POPUP ACTIVE CODE
    $(".fancyVideo").fancybox({
        animationEffect : "zoom-in-out",
        transitionEffect : "circular",
        maxWidth    : 800,
        maxHeight   : 600
    });

    // :: 11.0 FEATURES SLIDER ACTIVE CODE
    $('.features-slider.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        smartSpeed: 1500,
        autoplay: true,
        autoplayTimeout: 6000,
        dotsContainer: '.features-content'
    });

    // :: 12.0 BRANDING SLIDER ACTIVE CODE
    $('.branding-slider.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: false,
        smartSpeed: 2000,
        autoplay: true,
        autoplayTimeout: 4000,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            }
        }
    });

    // :: 13.0 APP SCREENSHOTS ACTIVE CODE
    $('.app-screenshots.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: true,
        smartSpeed: 2000,
        autoplay: true,
        autoplayTimeout: 4000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            900: {
                items: 3
            },
            1200: {
                items: 4
            },

        }
    });

    // :: 14.0 CONTACT FORM ACTIVE CODE
    // Get the form.
    var form = $('#contact-form');
    // Get the messages div.
    var formMessages = $('.form-message');
    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();
        // Serialize the form data.
        var formData = $(form).serialize();
        // Submit the form using AJAX.
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $('#contact-form input,#contact-form textarea').val('');
                console.log('res',response)
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occurred and your message could not be sent.');
                }
                console.log('data res',data)
            });
    });
///////////////////////////partner forms//////////////////////////////////////////////////////////////
    // Set up an event listener for the partner form.
    var partnerForm = $('#partner-form');
    // Get the messages div.
    var partnerFormMessages = $('.partner-form-message');
    $(partnerForm).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();
        // Serialize the form data.
        let partnerFormData = $(partnerForm).serialize();
        console.log('partner',partnerFormData)
        // Submit the form using AJAX.
        $.ajax({
                type: 'POST',
                url: $(partnerForm).attr('action'),
                data: partnerFormData
            })
            .done(function (response) {
                // Make sure that the partnerFormMessages div has the 'success' class.
                $(partnerFormMessages).removeClass('error');
                $(partnerFormMessages).addClass('success');

                // Set the message text.
                $(partnerFormMessages).text(response);

                // Clear the form.
                $('#partner-form input,#partner-form textarea').val('');
                console.log('res',response)
            })
            .fail(function (data) {
                // Make sure that the partnerFormMessages div has the 'error' class.
                $(partnerFormMessages).removeClass('success');
                $(partnerFormMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(partnerFormMessages).text(data.responseText);
                } else {
                    $(partnerFormMessages).text('Oops! An error occurred and your message could not be sent.');
                }
                console.log('data res',data)
            });
    });


    // //validation of contact forms
    $(function(){
        let $validateContactForm = $("#contact-form");
        $.validator.addMethod("noSpace", function(value, element) {
            return value == '' || value.trim().length != 0
        },"Spaces Not Allowed");
        if ($validateContactForm.length) {
            $validateContactForm.validate({
                rules: {
                    name: {
                        required: true,
                        noSpace: true
                    },
                    email: {
                        required: true,
                        email: true,
                        noSpace: true
                    },
                    subject: {
                        required: true,
    
                    },
                    message: {
                        required: true
                    },
                },
                messages: {
                    name: {
                        required: "name is required"
                    },
                    email: {
                        required: "email is required",
                        email: 'Please Enter Valid Email'
                    },
                    subject: {
                        required: "subject is required"
                    },
                    message: {
                        required: "message is required"
                    },
                }
            })
        }
    });
    // validation of partner forms
    $(function(){
        let $validateContactForm = $("#partner-form");
        $.validator.addMethod("noSpace", function(value, element) {
            return value == '' || value.trim().length != 0
        },"Spaces Not Allowed");
        if ($validateContactForm.length) {
            $validateContactForm.validate({
                rules: {
                    name: {
                        required: true,
                        noSpace: true
                    },
                    email: {
                        required: true,
                        email: true,
                        noSpace: true
                    },
                    subject: {
                        required: true,
    
                    },
                    typeOf: {
                        required: true
                    },
                    message: {
                        required: true
                    },
                },
                messages: {
                    name: {
                        required: "name is required"
                    },
                    email: {
                        required: "email is required",
                        email: 'Please Enter Valid Email'
                    },
                    subject: {
                        required: "subject is required"
                    },
                    message: {
                        required: "message is required"
                    },
                }
            })
        }
    
    });
    // STOP SENDING DATA UNTIL IT FINISHED
    $(function () {
        $('#submit').attr('disabled', true);
        $('.validateForm').change(function () {
            if ($(this).valid()) {
                $('#submit').attr('disabled', false);
            } else {
                $('#submit').attr('disabled', true);
            }
        });
     });

}(jQuery));
 /////test stryblok
