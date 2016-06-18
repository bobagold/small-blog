define(
    ['jquery', 'app/view', 'app/navigation'],
    function ($, view, navigation) {
        var
            rootUrl = '/blog/',
            btnClass = 'btn btn-lg btn-primary',
            liClass = 'list-group-item',
            load = function (url, success) {
                $.ajax(url, {
                    success: success
                });
            },
            saveArticle = function (url, data, success) {
                $.ajax(url, {
                    method: url === rootUrl ? 'POST' : 'PUT',
                    dataType: 'json',
                    data: JSON.stringify(data),
                    success: success
                });
            },
            removeArticle = function (url, success) {
                return function () {
                    $.ajax(url, {
                        method: 'DELETE',
                        success: success
                    });
                };
            },
            loadArticle = function (url, callback) {
                return function () {
                    if (navigation.currentUrl() != url) {
                        navigation.navigate(url);
                    }
                    if (url === rootUrl) {
                        return callback({url: url, title: '', body: ''});
                    }
                    load(url, callback);
                };
            };
        $(function () {
            var View = view($('#list'), $('#container'), liClass, rootUrl, btnClass, load, saveArticle, removeArticle, loadArticle);
            load(rootUrl, View.blog);
            if (navigation.currentUrl()) {
                var url = navigation.currentUrl();
                loadArticle(url, url === rootUrl ? View.editArticle : View.article)();
            }
            navigation.subscribe2url(function() {
                var url = navigation.currentUrl();
                loadArticle(url, url === rootUrl ? View.editArticle : View.article)();
            });
        });
    }
);