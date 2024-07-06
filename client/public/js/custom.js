/*
Template Name: Karyana - Supermarket HTML Mobile Template
Author: Askbootstrap
Author URI: https://themeforest.net/user/askbootstrap
Version: 0.1
*/

/*
- Splash Slider
- Cart Slider
- Home Cate Slider
- Single Slider
- Add Cart
- Sidebar Nav
- Tooltip
*/


(function($) {
  "use strict"; // Start of use strict

  // Splash Slider
  $('.osahan-slider').slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2500,
      centerMode: false,
      slidesToShow: 1,
      arrows: false,
      dots: true
  });

  // Cart Slider
  $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      fade: true,
      asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      asNavFor: '.slider-for',
      dots: false,
      arrows: false,
      centerMode: false,
      focusOnSelect: true
  });

  // Home Cate Slider
  $('.home-cate').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      dots: true,
      centerMode: true,
      responsive: [{
              breakpoint: 1024,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
              }
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
              }
          }
      ]
  });

  // Single Slider
  $('.single-item').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      dots: true,
      responsive: [{
              breakpoint: 1024,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
              }
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
              }
          }
      ]
  });

  // Add Cart
  $('.minus').click(function() {
      var $input = $(this).parent().find('.box');
      var count = parseInt($input.val()) - 1;
      count = count < 1 ? 1 : count;
      $input.val(count);
      $input.change();
      return false;
  });
  $('.plus').click(function() {
      var $input = $(this).parent().find('.box');
      $input.val(parseInt($input.val()) + 1);
      $input.change();
      return false;
  });

  // Sidebar Nav
  var $main_nav = $('#main-nav');
  var $toggle = $('.toggle');

  var defaultOptions = {
      disableAt: false,
      customToggle: $toggle,
      levelSpacing: 40,
      navTitle: '',
      levelTitles: true,
      levelTitleAsBack: true,
      pushContent: '#container',
      insertClose: 2
  };

  // call our plugin
  var Nav = $main_nav.hcOffcanvasNav(defaultOptions);

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();

})(jQuery); // End of use strict