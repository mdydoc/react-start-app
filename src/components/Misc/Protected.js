import React, {Component} from 'react';

export const Protected = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);

            const jwt = sessionStorage.getItem('jwt');

            if (!jwt && props.location.pathname !== '/') {
                this.props.history.push("/");
            }
        }

        render() {
            return <WrappedComponent {...this.props}/>;
        }
    };
};