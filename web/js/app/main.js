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
            save = function (url, elements) {
                return function () {
                    $.ajax(url, {
                        method: url === rootUrl ? 'POST' : 'PUT',
                        dataType: 'json',
                        data: JSON.stringify({title: elements.title.val(), body: elements.body.val()}),
                        success: function (data) {
                            showArticle(data.url)();
                            load(rootUrl, showBlog);
                        }
                    });
                }
            },
            edit = function (url) {
                return function () {
                    var success = function (data) {
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
                                .submit(save(url, elements))
                            );
                    };
                    if (url === '/blog') {
                        success({title: '', body: ''});
                        return;
                    }
                    load(url, success);
                };
            },
            removeArticle = function (url) {
                return function () {
                    $.ajax(url, {
                        method: 'DELETE',
                        success: function () {
                            edit(rootUrl)();
                            load(rootUrl, showBlog);
                        }
                    });
                }
            },
            showArticle = function (url) {
                return function () {
                    if (navigation.currentUrl() != url) {
                        navigation.navigate(url);
                    }
                    load(url, function (data) {
                        $container.text('')
                            .append($('<h1>').text(data.title))
                            .append($('<a/>').addClass(btnClass).text('edit').click(edit(url)))
                            .append($('<a/>').addClass(btnClass).text('delete').click(removeArticle(url)))
                            .append($('<div>').text(data.body))
                        ;
                    });
                };
            },
            showBlog = function (data) {
                $list.empty();
                $list.append($('<li/>').addClass(liClass)
                    .append($('<a>').click(edit(rootUrl)).text('new article')));
                $list.append(data.map(function (article) {
                    return $('<li/>').addClass(liClass)
                        .append($('<span>').text(article.created))
                        .append($('<a>').click(showArticle(article.url)).text(article.title));
                }));
            };
        $(function () {
            load(rootUrl, showBlog);
            if (navigation.currentUrl()) {
                showArticle(navigation.currentUrl())();
            }
            navigation.subscribe2url(function() {
                showArticle(navigation.currentUrl())();
            });
        });
    }
);