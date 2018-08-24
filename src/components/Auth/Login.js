import React, {Component} from 'react';
import AuthCard from "../Misc/AuthCard";
import translate from "../../libs/translate";
import {Button, FormGroup, Input, Label} from "reactstrap";
import uniqueId from 'react-html-id';
import {Link} from 'react-router-dom';
import http from "../../libs/http";

export default class Login extends Component {
    constructor(props) {
        super(props);

        uniqueId.enableUniqueIds(this);

        this.state = {
            email: '',
            password: '',
            remember: false
        };
    }

    _onChange = e => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _remember = e => {
        const {name, checked} = e.target;

        this.setState({
            [name]: checked
        });
    };

    _login = async () => {
        const {email, password, remember} = this.state;

        let data = {
            email,
            password
        };

        if (remember) {
            data.remember = true;
        }

        let res = await http.route('login').post(data);

        console.log(res);
    };

    render() {
        const {email, password, remember} = this.state;

        return (
            <AuthCard title={translate('login.title')}>
                <FormGroup>
                    <Label for={this.nextUniqueId()}>{translate('login.email')}</Label>
                    <Input type="email" name="email" value={email} id={this.lastUniqueId()}
                           placeholder={translate('login.emailPlaceholder')} onChange={this._onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for={this.nextUniqueId()}>{translate('login.password')}</Label>
                    <Input type="password" name="password" value={password} id={this.lastUniqueId()}
                           placeholder={translate('login.passwordPlaceholder')} onChange={this._onChange}/>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input name="remember" type="checkbox" checked={remember} onChange={this._remember}/>{' '}
                        {translate('login.rememberMe')}
                    </Label>
                </FormGroup>
                <Button onClick={this._login}>{translate('login.submit')}</Button>
                <Link to={'forgot-password'}>{translate('login.forgotPassword')}</Link>
                <Link to={'register'}>{translate('login.register')}</Link>
            </AuthCard>
        );
    }
}