import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autobind from 'autobind-decorator';
import FacebookLogin from 'react-facebook-login';
import {Col, Clearfix, FormControl, Button, FormGroup, Alert, Checkbox} from 'react-bootstrap';

import userActions from '../../actions/Auth/user';

import {FACEBOOK_API_ID} from '../../../constants';

@connect(
    store => ({
        user: store.user.user,
        errors: store.user.errors
    }),
    dispatch => ({
        ...bindActionCreators(userActions, dispatch)
    })
)
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            remember: true
        };
    }

    @autobind
    _responseFacebook(response) {
        if (response && response.id && response.email) {
            const {loginUser} = this.props;
            const {name, email, id} = response;

            let credentials = {
                email,
                name,
                facebookId: id
            };

            loginUser(credentials);
        } else {
            const {setUserErrors} = this.props;

            let facebookError = '';
            if (response) {
                if (response.hasOwnProperty('status')) {
                    facebookError = 'You cancel facebook login!';
                } else {
                    facebookError = 'You did not authorize all requirements!';
                }
            } else {
                facebookError = 'Something went wrong, try again!';
            }

            setUserErrors({facebookError});
        }
    }

    @autobind
    _login() {
        const {loginUser} = this.props;
        const {email, password, remember} = this.state;

        let credentials = {
            email,
            password,
            remember
        };

        loginUser(credentials);
    }

    @autobind
    _handleChange(e) {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    }

    @autobind
    _handleRemember() {
        const {remember} = this.state;

        this.setState({
            remember: !remember
        });
    }

    render() {
        const {email, password, remember} = this.state;
        const {errors} = this.props;

        return (
            <Fragment>
                <Col xs={12}>
                    {errors && errors.error && <Alert bsStyle="danger">{errors.error}</Alert>}
                    <FormGroup>
                        {errors && errors.email && <Alert bsStyle="danger">{errors.email}</Alert>}
                        <FormControl type="text" name="email" placeholder="email" value={email}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        {errors && errors.password && <Alert bsStyle="danger">{errors.password}</Alert>}
                        <FormControl type="password" name="password" placeholder="password" value={password}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Checkbox checked={remember} onChange={this._handleRemember}>Remember me</Checkbox>
                    </FormGroup>
                    <Button className="button" onClick={this._login}>Login</Button>
                </Col>
                <Clearfix/>
                <hr/>
                <Col xs={12}>
                    {errors && errors.facebookError && <Alert bsStyle="danger">{errors.facebookError}</Alert>}
                    <FacebookLogin
                        appId={FACEBOOK_API_ID}
                        autoLoad={false}
                        size="small"
                        fields="name,email"
                        scope="email,public_profile"
                        cssClass="facebook-login"
                        callback={this._responseFacebook}
                        authType="rerequest"
                    />
                </Col>
                <Clearfix/>
            </Fragment>
        );
    }
}