import React, {Component, Fragment} from 'react';
import AuthCard from "../Misc/AuthCard";
import translate from "../../libs/translate";
import {Button, FormGroup, Input, Label} from "reactstrap";
import uniqueId from 'react-html-id';
import {Link} from 'react-router-dom';
import http from "../../libs/http";

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        uniqueId.enableUniqueIds(this);

        this.state = {
            showCode: false,
            email: '',
            code: '',
            password: ''
        };
    }

    _onChange = e => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _changeRender = (showCode) => {
        this.setState({
            showCode
        });
    };

    _forgot = async () => {
        const {email} = this.state;

        let data = {
            email
        };

        let res = await http.route('forgot-password').post(data);

        console.log(res);
    };

    _change = async () => {
        const {code, password} = this.state;

        let data = {
            code,
            password
        };

        let res = await http.route('change-password').post(data);

        console.log(res);
    };

    _renderMain() {
        const {email} = this.state;

        return (
            <Fragment>
                <FormGroup>
                    <Label for={this.nextUniqueId()}>{translate('forgotPassword.email')}</Label>
                    <Input type="email" name="email" value={email} id={this.lastUniqueId()}
                           placeholder={translate('forgotPassword.emailPlaceholder')} onChange={this._onChange}/>
                </FormGroup>
                <Button onClick={this._forgot}>{translate('forgotPassword.submit')}</Button>
                <Link to={'login'}>{translate('forgotPassword.login')}</Link>
                <span onClick={() => this._changeRender(true)}>{translate('forgotPassword.haveACode')}</span>
            </Fragment>
        );
    }

    _renderCode() {
        const {code, password} = this.state;

        return (
            <Fragment>
                <FormGroup>
                    <Label for={this.nextUniqueId()}>{translate('forgotPassword.code')}</Label>
                    <Input type="text" name="code" value={code} id={this.lastUniqueId()}
                           placeholder={translate('forgotPassword.codePlaceholder')} onChange={this._onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for={this.nextUniqueId()}>{translate('forgotPassword.password')}</Label>
                    <Input type="password" name="password" value={password} id={this.lastUniqueId()}
                           placeholder={translate('forgotPassword.passwordPlaceholder')} onChange={this._onChange}/>
                </FormGroup>
                <Button onClick={this._change}>{translate('forgotPassword.submitCode')}</Button>
                <Link to={'login'}>{translate('forgotPassword.login')}</Link>
                <span onClick={() => this._changeRender(false)}>{translate('forgotPassword.tryAgain')}</span>
            </Fragment>
        );
    }

    render() {
        const {showCode} = this.state;

        return (
            <AuthCard title={translate('forgotPassword.title')}>
                {!showCode && this._renderMain()}
                {showCode && this._renderCode()}
            </AuthCard>
        );
    }
}