$(function () {
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

    // эмуляция загрузки: 1 сек
    setTimeout(function () {
        window.ss = $("#content").slideshow('init', options);
        $('.splash').hide();
        $("#content").show();

        $("#content").slideshow('refresh');
    }, 200);


});
