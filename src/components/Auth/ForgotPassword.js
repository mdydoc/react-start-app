import React, {Component, Fragment} from 'react';
import autobind from 'autobind-decorator';
import {Col, Clearfix, FormControl, Button, FormGroup, Alert} from 'react-bootstrap';
import http from '../../libs/http';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import userActions from '../../actions/user';

@connect(
    store => ({
        user: store.user.user
    }),
    dispatch => ({
        ...bindActionCreators(userActions, dispatch)
    })
)
export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            code: '',
            password: '',
            retypePassword: '',
            showCode: false,
            errors: {}
        };
    }

    @autobind
    async _forgot() {
        const {email} = this.state;

        let userDetails = {
            email
        };

        let res = await http.endpoint('forgot-password').post({...userDetails});

        if (!res.isError) {
            this.setState({
                showCode: true,
                errors: {}
            });
        } else {
            this.setState({
                errors: res.errorMessage
            });
        }
    }

    @autobind
    async _reset() {
        const {setUser, setUserErrors} = this.props;
        const {code, password, retypePassword} = this.state;

        let userDetails = {
            code,
            password,
            retypePassword
        };

        let res = await http.endpoint('forgot-password').post({...userDetails});

        if (!res.isError) {
            sessionStorage.setItem('jwt', res.data.jwt);
            setUser(res.data.user);
            setUserErrors(false);
        } else {
            this.setState({
                errors: res.errorMessage
            });
        }
    }

    @autobind
    _handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    @autobind
    _setShowCode() {
        const {showCode} = this.state;

        this.setState({
            showCode: !showCode
        });
    }

    _renderMain() {
        const {email, errors} = this.state;

        return (
            <Fragment>
                <Col md={12}>
                    {errors && errors.error && <Alert bsStyle="danger">{errors.error}</Alert>}
                    <FormGroup>
                        {errors && errors.email && <Alert bsStyle="danger">{errors.email}</Alert>}
                        <FormControl type="email" name="email" placeholder="email" value={email}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <Button className="button" onClick={this._forgot}>Reset password</Button>
                </Col>
                <Col xs={12} className="info">
                    Have a code? Click <a onClick={this._setShowCode}>here</a>
                </Col>
                <Clearfix/>
            </Fragment>
        );
    }

    _renderCode() {
        const {code, errors, password, retypePassword} = this.state;

        return (
            <Fragment>
                <Col md={12}>
                    {errors && errors.error && <Alert bsStyle="danger">{errors.error}</Alert>}
                    <FormGroup>
                        {errors && errors.code && <Alert bsStyle="danger">{errors.code}</Alert>}
                        <FormControl type="text" name="code" placeholder="code" value={code}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        {errors && errors.password && <Alert bsStyle="danger">{errors.password}</Alert>}
                        <FormControl type="password" name="password" placeholder="password" value={password}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        {errors && errors.retypePassword && <Alert bsStyle="danger">{errors.retypePassword}</Alert>}
                        <FormControl type="password" name="retypePassword" placeholder="retype password"
                                     value={retypePassword}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <Button className="button" onClick={this._reset}>Change password</Button>
                </Col>
                <Col xs={12} className="info">
                    Didn't receive a code? Click <a onClick={this._setShowCode}>here</a> to try again.
                </Col>
                <Clearfix/>
            </Fragment>
        );
    }

    render() {
        const {showCode} = this.state;

        return (
            <Fragment>
                {!showCode && this._renderMain()}
                {showCode && this._renderCode()}
            </Fragment>
        );
    }
}