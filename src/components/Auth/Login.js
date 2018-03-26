import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autobind from 'autobind-decorator';
import FacebookLogin from 'react-facebook-login';
import {Col, Clearfix, FormControl, Button, FormGroup, Alert, Checkbox, ControlLabel} from 'react-bootstrap';
import uniqueId from 'react-html-id';

import userActions from '../../actions/user';

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

        uniqueId.enableUniqueIds(this);

        this.state = {
            email: '',
            password: '',
            remember: true,
            activateEmail: false
        };
    }

    @autobind
    _responseFacebook(response) {
        if (response && response.id && response.email) {
            const {loginUser} = this.props;
            const {name, email, id, accessToken} = response;

            let credentials = {
                email,
                name,
                facebookId: id,
                accessToken
            };
            loginUser(credentials);
        } else {
            const {setUserErrors} = this.props;

            let facebookError = '';
            if (response) {
                if (response.hasOwnProperty('status')) {
                    facebookError = 'You canceled facebook login!';
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
            remember,
            os: 'Win',
            ip: '192.168.0.1',
            device: 'Desktop',
            browser: 'Firefox'
        };

        loginUser(credentials);

        this.setState({
            activateEmail: email
        });
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

    @autobind
    _goToActivate() {
        const {goToActivate} = this.props;

        goToActivate(this.state.activateEmail);
    }

    render() {
        const {email, password, remember} = this.state;
        const {errors} = this.props;

        return (
            <Fragment>
                <Col xs={12}>
                    {errors && errors.error && <Alert bsStyle="danger">{errors.error}</Alert>}
                    {errors && errors.error && errors.error === 'error.account_not_activated' &&
                    <div className="info">
                        Click <a onClick={this._goToActivate}>here</a> to activate your account.
                    </div>}
                    <FormGroup controlId={this.nextUniqueId()}
                               validationState={errors && errors.email ? 'error' : null}>
                        <ControlLabel>Email{errors && errors.email && ` (${errors.email})`}: </ControlLabel>
                        <FormControl type="text" name="email" placeholder="email" value={email}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <FormGroup controlId={this.nextUniqueId()}
                               validationState={errors && errors.password ? 'error' : null}>
                        <ControlLabel>Password{errors && errors.password && ` (${errors.password})`}: </ControlLabel>
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
                        textButton="Login with Facebook"
                        autoLoad={false}
                        size="small"
                        fields="name,email"
                        scope="email,public_profile"
                        cssClass="facebook-login"
                        callback={this._responseFacebook}
                        authType="rerequest"
                        isMobile={true}
                        disableMobileRedirect={true}
                    />
                </Col>
                <Clearfix/>
            </Fragment>
        );
    }
}