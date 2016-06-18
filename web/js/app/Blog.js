define(
    ['react', 'app/ArticleList', 'app/CurrentArticle', 'app/CurrentEditArticle'],
    function (React, ArticleList, CurrentArticle, CurrentEditArticle) {
        return React.createClass({
            getInitialState: function () {
                return {articles: [], current: null, articleAction: null};
            },
            componentDidMount: function () {
                var that = this;
                this.props.Controller.load(this.props.rootUrl, function (data) {
                    var currentUrl = that.props.currentUrl;
                    that.setState({articles: data, current: null, articleAction: null});
                    if (currentUrl) {
                        that.props.Controller.loadArticle(currentUrl, function (data) {
                            that.setState({
                                articles: that.state.articles,
                                current: data,
                                articleAction: currentUrl === that.props.rootUrl ? 'edit' : 'view'
                            });
                        })();
                    }
                });
            },
            render: function () {
                var that = this,
                    change = function (field) {
                        return function (e) {
                            var data = {};
                            data[field] = e.target.value;
                            that.setState({
                                articles: that.state.articles,
                                current: Object.assign({}, that.state.current, data),
                                articleAction: 'edit'
                            });
                        };
                    },
                    submit = function () {
                        that.props.Controller.saveArticle(that.state.current.url, {
                            title: that.state.current.title,
                            body: that.state.current.body
                        }, function (updatedData) {
                            that.props.Controller.load(that.props.rootUrl, function (data) {
                                that.setState({articles: data, current: updatedData, articleAction: 'view'});
                                that.props.Controller.loadArticle(updatedData.url, function () {})();
                            });
                        });
                    },
                    edit = function (url) {
                        return that.props.Controller.loadArticle(url, function (data) {
                            that.setState({
                                articles: that.state.articles,
                                current: data,
                                articleAction: 'edit'
                            });
                        });
                    },
                    remove = function (url) {
                        return that.props.Controller.removeArticle(url, function () {
                            that.props.Controller.load(that.props.rootUrl, function (data) {
                                that.setState({articles: data, current: null, articleAction: null});
                            });
                        });
                    },
                    loadArticle = function (url) {
                        return that.props.Controller.loadArticle(url, function (data) {
                            that.setState({
                                articles: that.state.articles,
                                current: data,
                                articleAction: url === that.props.rootUrl ? 'edit' : 'view'
                            });
                        });
                    };
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        CurrentEditArticle,
                        Object.assign({}, this.state.articleAction === 'edit' ? this.state.current : null, {
                            btnClass: this.props.btnClass,
                            change: change,
                            submit: submit
                        })
                    ),
                    React.createElement(
                        CurrentArticle,
                        Object.assign({}, this.state.articleAction === 'view' ? this.state.current : null, {
                            btnClass: this.props.btnClass,
                            edit: edit,
                            remove: remove
                        })
                    ),
                    React.createElement(
                        ArticleList,
                        {
                            items: [].concat([{title: 'new article', url: this.props.rootUrl}], this.state.articles),
                            liClass: this.props.liClass,
                            loadArticle: loadArticle
                        }
                    )
                );
            }
        });
    });
