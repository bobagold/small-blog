define(
    ['jquery', 'app/navigation'],
    function ($, navigation) {
        return function (rootUrl) {
            var
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
            return {load: load, saveArticle: saveArticle, removeArticle: removeArticle, loadArticle: loadArticle};
        }
    }
);