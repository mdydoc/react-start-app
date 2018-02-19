import React, {Component} from 'react';

export const Protected = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);

            const user = localStorage.getItem('user');

            if (!user && props.location.pathname !== '/login') {
                this.props.history.push("/login");
            }
        }

        render() {
            return <WrappedComponent {...this.props}/>;
        }
    };
};