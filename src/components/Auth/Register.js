import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autobind from 'autobind-decorator';
import {Col, Clearfix, FormControl, Button, FormGroup, Alert} from 'react-bootstrap';

import userActions from '../../actions/user';

@connect(
    store => ({
        user: store.user.user,
        errors: store.user.errors
    }),
    dispatch => ({
        ...bindActionCreators(userActions, dispatch)
    })
)
export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            retypePassword: ''
        };
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
        const {errors} = this.props;

        return (
            <Fragment>
                <Col md={12}>
                    {errors && errors.error && <Alert bsStyle="danger">{errors.error}</Alert>}
                    <FormGroup>
                        {errors && errors.name && <Alert bsStyle="danger">{errors.name}</Alert>}
                        <FormControl type="text" name="name" placeholder="name" value={name}
                                     onChange={this._handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        {errors && errors.email && <Alert bsStyle="danger">{errors.email}</Alert>}
                        <FormControl type="email" name="email" placeholder="email" value={email}
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
                    <Button className="button" onClick={this._register}>Register</Button>
                </Col>
                <Clearfix/>
            </Fragment>
        );
    }
}