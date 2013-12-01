(function ($) {

    var methods = {
        init: function (options) {

            return this.each(function () {

                var $this = $(this);

                // Если плагин уже проинициализирован
                if ($this.hasClass('slideshow')) return;

                $this.addClass('slideshow');
                var controls = $('<div />', { 'class': 'ss-controls' }),
                    content = $('<div />', { 'class': 'ss-content' }),
                    slides = $('<div />', { 'class': 'ss-slides' });

                $this.append(controls);
                $this.append(content);
                $this.append(slides);
                options = options || {};

                var ctrls = '', data;
                if (!options.noPrev)
                    ctrls += '<button class="btn-prev" title="Назад">&lt;&lt;</button>';
                if (!options.noAutoHide)
                    ctrls += '<button class="btn-autohide" title="Автоскрытие управления">&darr;</button>';
                if (!options.noText)
                    ctrls += '<button class="btn-subtitles" title="Показывать/скрыть титры">Т</button>';
                if (!options.noNext)
                    ctrls += '<button class="btn-next" title="Вперед">&gt;</button>';
                if (!options.noLegend)
                    ctrls += '<span title="Текущий слайд"></button>';
                controls.html(ctrls);

                $this.data('slideshow', data = {
                    target: $this,
                    controls: controls,
                    content: content,
                    slides: slides,
                    count: 0,
                    current: 0
                });

                $('.btn-prev', controls).click(function () { $this.slideshow('prev'); });
                $('.btn-next', controls).click(function () { $this.slideshow('next'); });
                $('.btn-autohide', controls).click(function () {
                    $(this).toggleClass('pressed');
                    $this.slideshow('autohide');
                });
                $('.btn-subtitles', controls).click(function () {
                    $(this).toggleClass('pressed');
                    $this.slideshow('subtitles');
                });

                $(options.slides).each(function () {
                    $('<div/>', { 'class': 'slide' })
                        .attr('index', data.count++)
                        .attr('title', this.text)
                        .attr('src', this.img)
                        .append($('<img class="loading"/>').load(function () { $(this).removeClass('loading'); }))
                        .appendTo(slides);
                });

                $this.slideshow('refresh', options);
            });
        },

        destroy: function () {
            return this.each(function () {
                var $this = $(this), data = $this.data('slideshow');
                $(window).unbind('.slideshow');
                data.slideshow.remove();
                $this.removeData('slideshow');
            });
        },

        prev: function () {
            var $this = $(this), data = $this.data('slideshow');
            if (data.current == 0) return this;
            data.current--;
            $this.slideshow('refresh');
            return this;
        },

        next: function () {
            var $this = $(this), data = $this.data('slideshow');
            if (data.current == data.count - 1) return this;
            data.current++;
            $this.slideshow('refresh');
            return this;
        },

        refresh: function (options) {
            var $this = $(this), data = $this.data('slideshow');
            options = options || {};

            if (options.height) $this.css('height', options.height);
            if (options.width) $this.css('width', options.width);
            data.controls.css('left', ($this.outerWidth() - data.controls.outerWidth()) / 2);

            if (!data.count) return this;

            $('span', data.controls).html((data.current + 1) + ' из ' + data.count);

            var c = $('.slide', data.content);
            if (data.current != c.attr('index')) {
                // отображаем текущий
                c.appendTo(data.slides);
                c = $('.slide[index=' + data.current + ']', data.slides);

                // загружаем след. слайд
                if (data.current < data.count - 1) {
                    var n = $('.slide[index=' + (data.current + 1) + ']', data.slides);
                    $('img', n).attr('src', n.attr('src'));
                }
            }

            // загружаем картинку текущего слайда, если надо
            if (!$('img', c).attr('src'))
                $('img', c).attr('src', c.attr('src'));
            c.appendTo(data.content);

            return this;
        },

        autohide: function (state) {
            var $this = $(this), data = $this.data('slideshow');
            data.autohide = typeof state == 'undefined' ? !data.autohide : !!state;
            if (data.autohide) data.controls.addClass('autohide');
            else data.controls.removeClass('autohide');

            return this;
        },

        subtitles: function () { }

    };

    $.fn.slideshow = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.slideshow');
        }
        return null;
    };

})(jQuery);
