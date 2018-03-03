import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autobind from 'autobind-decorator';
import {Link} from 'react-router-dom';
import {Row, Col, Clearfix} from 'react-bootstrap';

import Layout from '../Misc/Layout';
import userActions from '../../actions/Auth/user';

import Menu from '../Misc/Menu';

@connect(
    store => ({
        user: store.user
    }),
    dispatch => ({
        ...bindActionCreators(userActions, dispatch)
    })
)
export default class Register extends Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem('token');

        if (token) {
            this.props.history.push("/");
        }

        this.state = {
            name: '',
            email: '',
            password: '',
            retypePassword: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.props.history.push("/");
        }
    }

    @autobind
    _register() {
        const {registerUser} = this.props;
        const {name, email, password, retypePassword} = this.state;

        let userDetails = {
            name,
            email,
            password,
            retypePassword
        };

        registerUser(userDetails);
    }

    @autobind
    _handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        const {name, email, password, retypePassword} = this.state;

        return (
            <Layout>
                <Menu/>
                <Row>
                    <Col md={12}>
                        <input type="text" name="name" placeholder="name" value={name} onChange={this._handleChange}/>
                        <input type="email" name="email" placeholder="email" value={email}
                               onChange={this._handleChange}/>
                        <input type="password" name="password" placeholder="password" value={password}
                               onChange={this._handleChange}/>
                        <input type="password" name="retypePassword" placeholder="retype password"
                               value={retypePassword}
                               onChange={this._handleChange}/>
                        <input type="button" value="Register" onClick={this._register}/>
                    </Col>
                    <Clearfix/>
                    <Link to="/login">Login</Link>
                </Row>
            </Layout>
        );
    }
}