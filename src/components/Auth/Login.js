import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autobind from 'autobind-decorator';
import {Link} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import {Row, Col, Clearfix} from 'react-bootstrap';

import Layout from '../Misc/Layout';
import userActions from '../../actions/Auth/user';

import {FACEBOOK_API_ID} from '../../../constants';

import Menu from '../Misc/Menu';

@connect(
    store => ({
        user: store.user
    }),
    dispatch => ({
        ...bindActionCreators(userActions, dispatch)
    })
)
export default class Login extends Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem('token');

        if (token) {
            this.props.history.push("/");
        }

        this.state = {
            email: '',
            password: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.props.history.push("/");
        }
    }

    @autobind
    _responseFacebook(response) {
        if (response && response.id) {
            const {loginUser} = this.props;
            const {name, email, id} = response;

            let credentials = {
                email,
                name,
                facebookId: id
            };

            loginUser(credentials);
        } else {
            //TODO set facebook login error
            console.error(response);
        }
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
                <Menu/>
                <Row>
                    <Col md={6}>
                        <input type="text" name="email" placeholder="email" value={email} onChange={this._handleChange}/>
                        <input type="password" name="password" placeholder="password" value={password}
                               onChange={this._handleChange}/>
                        <input type="button" value="Login" onClick={this._login}/>
                    </Col>
                    <Col md={6}>
                        <FacebookLogin
                            appId={FACEBOOK_API_ID}
                            autoLoad={false}
                            size="small"
                            fields="name,email"
                            scope="email,public_profile"
                            callback={this._responseFacebook}
                        />
                    </Col>
                    <Clearfix/>
                    <Link to="/register">Register</Link>
                </Row>
            </Layout>
        );
    }
}