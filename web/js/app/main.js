define(
    ['app/navigation', 'app/controller', 'react', 'reactdom', 'app/Blog'],
    function (navigation, controller, React, ReactDOM, Blog) {
        var
            rootUrl = '/blog/',
            btnClass = 'btn btn-lg btn-primary',
            liClass = 'list-group-item',
            Controller = controller(rootUrl);
        ReactDOM.render(
            React.createElement(Blog, {
                currentUrl: navigation.currentUrl(),
                liClass: liClass,
                rootUrl: rootUrl,
                btnClass: btnClass,
                Controller: Controller
            }),
            document.getElementById('container')
        );
    }
);