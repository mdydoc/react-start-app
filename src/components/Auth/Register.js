import React, {Component, Fragment} from 'react';
import autobind from 'autobind-decorator';
import {Col, Clearfix, FormControl, Button, FormGroup, Alert, ControlLabel} from 'react-bootstrap';
import http from '../../libs/http';
import uniqueId from 'react-html-id';

export default class Register extends Component {
    constructor(props) {
        super(props);

        uniqueId.enableUniqueIds(this);

        this.state = {
            name: '',
            email: props.email,
            password: '',
            retypePassword: '',
            code: '',
            showCode: props.registerActivate,
            errors: {}
        };
    }

    @autobind
    async _register() {
        const {name, email, password, retypePassword} = this.state;

        let userDetails = {
            name,
            email,
            password,
            retypePassword
        };

        let res = await http.endpoint('register').post({...userDetails});

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
    async _activateAccount() {
        const {code, email} = this.state;

        let userDetails = {
            code,
            email
        };

        let res = await http.endpoint('activate').post({...userDetails});

        if (!res.isError) {
            this.setState({
                isSuccess: true,
                errors: {}
            });
        } else {
            this.setState({
                errors: res.errorMessage
            });
        }
    }

    @autobind
    async _resendCode() {
        const {email} = this.state;

        let userDetails = {
            email
        };

        let res = await http.endpoint('resend').post({...userDetails});

        if (!res.isError) {
            this.setState({
                isSuccess: true,
                errors: {}
            });
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

    _renderMain() {
        const {name, email, password, retypePassword, errors} = this.state;

        return (
            <Fragment>
                <Col md={12}>
                    {errors && errors.error && <Alert bsStyle="danger">{errors.error}</Alert>}
                    <FormGroup controlId={this.nextUniqueId()}
                               validationState={errors && errors.email ? 'error' : null}>
                        {errors && errors.name && <Alert bsStyle="danger">{errors.name}</Alert>}
                        <FormControl type="text" name="name" placeholder="name" value={name}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <FormGroup controlId={this.nextUniqueId()}
                               validationState={errors && errors.email ? 'error' : null}>
                        {errors && errors.email && <Alert bsStyle="danger">{errors.email}</Alert>}
                        <FormControl type="email" name="email" placeholder="email" value={email}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <FormGroup controlId={this.nextUniqueId()}
                               validationState={errors && errors.email ? 'error' : null}>
                        {errors && errors.password && <Alert bsStyle="danger">{errors.password}</Alert>}
                        <FormControl type="password" name="password" placeholder="password" value={password}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <FormGroup controlId={this.nextUniqueId()}
                               validationState={errors && errors.email ? 'error' : null}>
                        {errors && errors.retypePassword && <Alert bsStyle="danger">{errors.retypePassword}</Alert>}
                        <FormControl type="password" name="retypePassword" placeholder="retype password"
                                     value={retypePassword}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <Button className="button" onClick={this._register}>Register</Button>
                </Col>
                <Clearfix/>
            </Fragment>
        );
    }

    _renderCode() {
        const {code, errors} = this.state;

        return (
            <Fragment>
                <Col md={12}>
                    {errors && errors.error && <Alert bsStyle="danger">{errors.error}</Alert>}
                    <FormGroup controlId={this.nextUniqueId()}
                               validationState={errors && errors.code ? 'error' : null}>
                        <ControlLabel>Activation code{errors && errors.code && ` (${errors.code})`}: </ControlLabel>
                        <FormControl type="text" name="code" placeholder="code" value={code}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <Button className="button" onClick={this._activateAccount}>Activate account</Button>
                </Col>
                <Col xs={12} className="info">
                    Didn't receive a code? Click <a onClick={this._resendCode}>here</a> to resend.
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