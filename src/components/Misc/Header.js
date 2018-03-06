import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import userActions, {setUserErrors} from "../../actions/Auth/user";
import {bindActionCreators} from "redux";
import autobind from 'autobind-decorator';
import {Modal, Col, Row, Clearfix} from 'react-bootstrap';
import Login from "../Auth/Login";
import Register from "../Auth/Register";

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
            showloginModal: false,
            loginForm: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({
                showloginModal: false
            });
        }
    }

    @autobind
    _openLoginModal() {
        this.setState({
            showloginModal: true
        });
    }

    @autobind
    _closeLoginModal() {
        const {setUserErrors} = this.props;

        this.setState({
            showloginModal: false
        });

        setUserErrors(false);
    }

    @autobind
    _goToRegister() {
        const {setUserErrors} = this.props;

        this.setState({
            loginForm: false
        });

        setUserErrors(false);
    }

    @autobind
    _goToLogin() {
        const {setUserErrors} = this.props;

        this.setState({
            loginForm: true
        });

        setUserErrors(false);
    }

    render() {
        const {user} = this.props;
        const {showloginModal, loginForm} = this.state;

        return (
            <header>
                <div className="container">
                    <Link to="/" className="logo">Logo</Link>
                    {user && <Fragment>
                        <Link to="/profile" className="header-button">My account</Link>
                        <Link to="/logout" className="header-button">Logout</Link>
                    </Fragment>}
                    {!user && <Fragment>
                        <a className="header-button" onClick={this._openLoginModal}>Login / Register</a>
                    </Fragment>}
                    <Modal show={showloginModal} onHide={this._closeLoginModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{loginForm ? 'Login' : 'Register'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {loginForm &&
                            <Row>
                                <Login/>
                                <hr/>
                                <Col xs={12} className="info">
                                    You don't have an account? Go to <a onClick={this._goToRegister}>Register</a>
                                </Col>
                                <Clearfix/>
                            </Row>
                            }
                            {!loginForm &&
                            <Row>
                                <Register/>
                                <hr/>
                                <Col xs={12} className="info">
                                    Already have an account? Go to <a onClick={this._goToLogin}>Login</a>
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