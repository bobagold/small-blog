define(
    ['jquery'],
    function ($) {
        return {
            currentUrl: function () {
                return window.location.hash.substr(1);
            },
            navigate: function (url) {
                window.location.hash = url;
            },
            subscribe2url: function (callback) {
                $(window).on('hashchange', callback);
            }

        };
    }
);