define(
    ['react'],
    function (React) {
        return React.createClass({
            render: function () {
                var that = this;
                if (!this.props.url) {
                    return null;
                }
                return React.createElement(
                    'div',
                    null,
                    React.createElement('h1', null, this.props.title),
                    React.createElement('a', {
                        className: this.props.btnClass,
                        onClick: that.props.edit(this.props.url)
                    }, 'edit'),
                    React.createElement('a', {
                        className: this.props.btnClass,
                        onClick: that.props.remove(this.props.url)
                    }, 'delete'),
                    React.createElement('div', null, this.props.body)
                );
            }
        });
    });
