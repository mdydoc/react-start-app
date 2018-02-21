import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autobind from 'autobind-decorator';

import Layout from '../Misc/Layout';

import userActions from '../../actions/Auth/User';

@connect(
    dispatch => ({
        ...bindActionCreators(userActions, dispatch)
    })
)
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    @autobind
    _login() {
        const {loginUser} = this.props;
        const {email, password} = this.state;

        let credentials = {
            email,
            password
        };

        loginUser(credentials);
    }

    @autobind
    _handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        const {email, password} = this.state;

        return (
            <Layout>
                <input type="text" name="email" placeholder="email" value={email} onChange={this._handleChange}/>
                <input type="password" name="password" placeholder="password" value={password}
                       onChange={this._handleChange}/>
                <input type="button" value="Login" onClick={this._login}/>
            </Layout>
        );
    }
}