define(
    ['jquery', 'app/navigation'],
    function ($, navigation) {
        var
            rootUrl = '/blog/',
            $container = $('#container'),
            $list = $('#list'),
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
            viewEditArticle = function (data) {
                var elements = {
                    title: $('<input>')
                        .addClass('form-control')
                        .attr({placeholder: 'title', required: true, autofocus: true})
                        .val(data.title),
                    body: $('<textarea>')
                        .addClass('form-control')
                        .attr({placeholder: 'body', required: true, autofocus: true}).
                        text(data.body)};
                $container.text('')
                    .append($('<form>')
                        .append(elements.title)
                        .append(elements.body)
                        .append($('<input>')
                            .addClass(btnClass)
                            .attr('type', 'submit')
                            .val('save'))
                        .submit(function () {
                            saveArticle(data.url, {title: elements.title.val(), body: elements.body.val()}, function (data) {
                                loadArticle(data.url, viewArticle)();
                                load(rootUrl, showBlog);
                            });
                        })
                    );
            },
            removeArticle = function (url, success) {
                return function () {
                    $.ajax(url, {
                        method: 'DELETE',
                        success: success
                    });
                };
            },
            viewArticle = function (data) {
                $container.text('')
                    .append($('<h1>').text(data.title))
                    .append($('<a/>').addClass(btnClass).text('edit').click(loadArticle(data.url, viewEditArticle)))
                    .append($('<a/>').addClass(btnClass).text('delete').click(removeArticle(data.url, function () {
                        $container.text('');
                        load(rootUrl, showBlog);
                    })))
                    .append($('<div>').text(data.body))
                ;
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
            },
            showBlog = function (data) {
                $list.empty();
                $list.append($('<li/>').addClass(liClass)
                    .append($('<a>').click(loadArticle(rootUrl, viewEditArticle)).text('new article')));
                $list.append(data.map(function (article) {
                    return $('<li/>').addClass(liClass)
                        .append($('<span>').text(article.created))
                        .append($('<a>').click(loadArticle(article.url, viewArticle)).text(article.title));
                }));
            };
        $(function () {
            load(rootUrl, showBlog);
            if (navigation.currentUrl()) {
                var url = navigation.currentUrl();
                loadArticle(url, url === rootUrl ? viewEditArticle : viewArticle)();
            }
            navigation.subscribe2url(function() {
                var url = navigation.currentUrl();
                loadArticle(url, url === rootUrl ? viewEditArticle : viewArticle)();
            });
        });
    }
);