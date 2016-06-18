define(
    ['react'],
    function (React) {
        return React.createClass({
            render: function () {
                if (!this.props.url) {
                    return null;
                }
                return React.createElement(
                    'div',
                    null,
                    React.createElement('form', {onSubmit: this.props.submit},
                        React.createElement('input', {
                            className: 'form-control',
                            required: true,
                            autofocus: true,
                            placeholder: 'title',
                            onChange: this.props.change('title'),
                            value: this.props.title
                        }),
                        React.createElement('textarea', {
                            className: 'form-control',
                            required: true,
                            autofocus: true,
                            placeholder: 'body',
                            onChange: this.props.change('body'),
                            value: this.props.body
                        }),
                        React.createElement('input', {className: this.props.btnClass, type: 'submit'})
                    )
                );
            }
        });
    });
