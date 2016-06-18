define(
    ['jquery', 'app/view', 'app/navigation', 'app/controller'],
    function ($, view, navigation, controller) {
        var
            rootUrl = '/blog/',
            btnClass = 'btn btn-lg btn-primary',
            liClass = 'list-group-item',
            Controller = controller(rootUrl);
        $(function () {
            var View = view($('#list'), $('#container'), liClass, rootUrl, btnClass, Controller);
            Controller.load(rootUrl, View.blog);
            if (navigation.currentUrl()) {
                var url = navigation.currentUrl();
                Controller.loadArticle(url, url === rootUrl ? View.editArticle : View.article)();
            }
            navigation.subscribe2url(function() {
                var url = navigation.currentUrl();
                Controller.loadArticle(url, url === rootUrl ? View.editArticle : View.article)();
            });
        });
    }
);