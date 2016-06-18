define(
    ['jquery'],
    function ($) {
        return function ($list, $container, liClass, rootUrl, btnClass, load, saveArticle, removeArticle, loadArticle) {
            var
                editArticle = function (data) {
                    var elements = {
                        title: $('<input>')
                            .addClass('form-control')
                            .attr({placeholder: 'title', required: true, autofocus: true})
                            .val(data.title),
                        body: $('<textarea>')
                            .addClass('form-control')
                            .attr({placeholder: 'body', required: true, autofocus: true}).text(data.body)
                    };
                    $container.text('')
                        .append($('<form>')
                            .append(elements.title)
                            .append(elements.body)
                            .append($('<input>')
                                .addClass(btnClass)
                                .attr('type', 'submit')
                                .val('save'))
                            .submit(function () {
                                saveArticle(data.url, {
                                    title: elements.title.val(),
                                    body: elements.body.val()
                                }, function (data) {
                                    loadArticle(data.url, article)();
                                    load(rootUrl, blog);
                                });
                            })
                        );
                },
                article = function (data) {
                    $container.text('')
                        .append($('<h1>').text(data.title))
                        .append($('<a/>').addClass(btnClass).text('edit').click(loadArticle(data.url, editArticle)))
                        .append($('<a/>').addClass(btnClass).text('delete').click(removeArticle(data.url, function () {
                            $container.text('');
                            load(rootUrl, blog);
                        })))
                        .append($('<div>').text(data.body))
                    ;
                },
                blog = function (data) {
                    $list.empty();
                    $list.append($('<li/>').addClass(liClass)
                        .append($('<a>').click(loadArticle(rootUrl, editArticle)).text('new article')));
                    $list.append(data.map(function (article) {
                        return $('<li/>').addClass(liClass)
                            .append($('<span>').text(article.created))
                            .append($('<a>').click(loadArticle(article.url, article)).text(article.title));
                    }));
                };
            return {editArticle: editArticle, article: article, blog: blog};
        };
    }
);