import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import userActions from '../../actions/Auth/user';

@connect(
    store => ({
        user: store.user.user
    }),
    dispatch => ({
        ...bindActionCreators(userActions, dispatch)
    })
)
export default class Logout extends Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem('token');

        if (!token) {
            this.props.history.push("/");
        }

        const {logoutUser} = this.props;

        logoutUser();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.user) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            null
        );
    }
}