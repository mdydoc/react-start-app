import React, {Component, Fragment} from 'react';
import AuthCard from "../Misc/AuthCard";
import translate from "../../libs/translate";
import {Button, FormGroup, Input, Label} from "reactstrap";
import uniqueId from 'react-html-id';
import {Link} from 'react-router-dom';
import http from "../../libs/http";

export default class Register extends Component {
    constructor(props) {
        super(props);

        uniqueId.enableUniqueIds(this);

        this.state = {
            showCode: false,
            name: '',
            email: '',
            password: '',
            code: ''
        };
    }

    _onChange = e => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _register = async () => {
        const {name, email, password} = this.state;

        let data = {
            name,
            email,
            password
        };

        let res = await http.route('register').post(data);

        console.log(res);
    };

    _activate = async () => {
        const {code} = this.state;

        let data = {
            code
        };

        let res = await http.route('activate-account').post(data);

        console.log(res);
    };

    _resend = async () => {
        const {email} = this.state;

        let data = {
            email
        };

        let res = await http.route('resend-code').post(data);

        console.log(res);
    };

    _renderMain() {
        const {name, email, password} = this.state;

        return (
            <Fragment>
                <FormGroup>
                    <Label for={this.nextUniqueId()}>{translate('register.name')}</Label>
                    <Input type="text" name="name" value={name} id={this.lastUniqueId()}
                           placeholder={translate('register.namePlaceholder')} onChange={this._onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for={this.nextUniqueId()}>{translate('register.email')}</Label>
                    <Input type="email" name="email" value={email} id={this.lastUniqueId()}
                           placeholder={translate('register.emailPlaceholder')} onChange={this._onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for={this.nextUniqueId()}>{translate('register.password')}</Label>
                    <Input type="password" name="password" value={password} id={this.lastUniqueId()}
                           placeholder={translate('register.passwordPlaceholder')} onChange={this._onChange}/>
                </FormGroup>
                <Button onClick={this._register}>{translate('register.submit')}</Button>
                <Link to={'login'}>{translate('register.login')}</Link>
            </Fragment>
        );
    }

    _renderCode() {
        const {code} = this.state;

        return (
            <Fragment>
                <FormGroup>
                    <Label for={this.nextUniqueId()}>{translate('register.code')}</Label>
                    <Input type="text" name="code" value={code} id={this.lastUniqueId()}
                           placeholder={translate('register.codePlaceholder')} onChange={this._onChange}/>
                </FormGroup>
                <Button onClick={this._activate}>{translate('register.submitCode')}</Button>
                <Link to={'login'}>{translate('register.login')}</Link>
            </Fragment>
        );
    }

    render() {
        const {showCode} = this.state;

        return (
            <AuthCard title={translate('register.title')}>
                {!showCode && this._renderMain()}
                {showCode && this._renderCode()}
            </AuthCard>
        );
    }
}