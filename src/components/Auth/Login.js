import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Layout from '../Misc/Layout';

import userActions from '../../actions/Auth/User';

@connect(
    dispatch => ({
        ...bindActionCreators(userActions, dispatch)
    })
)
export default class Login extends Component {
    _login() {

    }

    render() {
        return (
            <Layout>
                <input type="text" id="email" placeholder="email"/>
                <input type="password" id="password" placeholder="password"/>
                <input type="button" value="Login" onClick={() => this._login()}/>
            </Layout>
        );
    }
}