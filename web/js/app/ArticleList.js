define(
    ['react'],
    function (React) {
        return React.createClass({
            render: function () {
                var
                    that = this,
                    createItem = function (item) {
                        return React.createElement(
                            'li',
                            {key: item.url, className: that.props.liClass},
                            item.created,
                            React.createElement('a', {onClick: that.props.loadArticle(item.url)}, item.title)
                        );
                    };
                return React.createElement(
                    'ul',
                    null,
                    this.props.items.map(createItem)
                );
            }
        });
    });
