import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import userActions from "../../actions/user";
import {bindActionCreators} from "redux";
import autobind from 'autobind-decorator';
import {Modal, Col, Row, Clearfix} from 'react-bootstrap';
import Login from "../Auth/Login";
import Register from "../Auth/Register";

import trans from '../../libs/translate';
import ForgotPassword from "../Auth/ForgotPassword";

@connect(
    store => ({
        user: store.user.user
    }),
    dispatch => ({
        ...bindActionCreators(userActions, dispatch)
    })
)
export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAuthModal: false,
            loginForm: true,
            registerForm: false,
            forgotForm: false,
            forgotConfirmForm: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({
                showAuthModal: false
            });
        }
    }

    @autobind
    _openLoginModal() {
        this.setState({
            showAuthModal: true
        });
    }

    @autobind
    _closeLoginModal() {
        const {setUserErrors} = this.props;

        this.setState({
            showAuthModal: false
        });

        setUserErrors(false);
    }

    @autobind
    _goToRegister() {
        const {setUserErrors} = this.props;

        this.setState({
            loginForm: false,
            registerForm: true,
            forgotForm: false
        });

        setUserErrors(false);
    }

    @autobind
    _goToLogin() {
        const {setUserErrors} = this.props;

        this.setState({
            loginForm: true,
            registerForm: false,
            forgotForm: false
        });

        setUserErrors(false);
    }

    @autobind
    _goToForgot() {
        const {setUserErrors} = this.props;

        this.setState({
            loginForm: false,
            registerForm: false,
            forgotForm: true
        });

        setUserErrors(false);
    }

    render() {
        const {user} = this.props;
        const {showAuthModal, loginForm, registerForm, forgotForm} = this.state;

        let modalTitle = loginForm ? 'Login' : registerForm ? 'Register' : forgotForm ? 'Forgot password' : '';

        return (
            <header>
                <div className="container">
                    <Link to="/" className="logo">Logo</Link>
                    {user && <Fragment>
                        <Link to="/profile" className="header-button">My account</Link>
                        <Link to="/logout" className="header-button">Logout</Link>
                    </Fragment>}
                    {!user && <Fragment>
                        <a className="header-button" onClick={this._openLoginModal}>{trans('home.login')}</a>
                    </Fragment>}
                    <Modal show={showAuthModal} onHide={this._closeLoginModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {loginForm &&
                            <Row>
                                <Login/>
                                <hr/>
                                <Col xs={12} className="info">
                                    You don't have an account? Go to <a
                                    onClick={this._goToRegister}>{trans('home.register')}</a>
                                </Col>
                                <Col xs={12} className="info">
                                    Forgot your password? chick <a onClick={this._goToForgot}>here</a>.
                                </Col>
                                <Clearfix/>
                            </Row>
                            }
                            {registerForm &&
                            <Row>
                                <Register/>
                                <hr/>
                                <Col xs={12} className="info">
                                    Already have an account? Go to <a
                                    onClick={this._goToLogin}>{trans('home.login')}</a>
                                </Col>
                            </Row>
                            }
                            {forgotForm &&
                            <Row>
                                <ForgotPassword/>
                                <hr/>
                                <Col xs={12} className="info">
                                    Remembered password? Go to <a onClick={this._goToLogin}>{trans('home.login')}</a>
                                </Col>
                            </Row>
                            }
                        </Modal.Body>
                    </Modal>
                </div>
            </header>
        );
    }
}