SlideShow
=========

jquery plugin for slide show


init:
  var options = {
      controls: {},
      autoslide: 2000,
      handleKeys: true,
      height: 500, 
      noText: true,
      slides: [
          { img: 'img/1.jpg', title: 'якорь' },
          { img: 'img/2.jpg', title: 'slide #2' },
          { img: 'img/3.jpg', title: 'slide #3' },
          { img: 'img/4.jpg', title: 'slide #4' }
      ]
  };  

  $("#content").slideshow('init', options);


commands:

  $("#content").slideshow('refresh');

  $("#content").slideshow('next');

  $("#content").slideshow('first');

  $("#content").slideshow('autohide'); // for controls block


controls:
  space - next

  home - first slide

  
futures:
  no labels for slides

  stretching imgs

  auto sliding

  more and more :)

