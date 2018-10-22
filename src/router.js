import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Protected} from './components/Misc/Protected';

import Home from './components/Home';
import Profile from './components/Account';

import Logout from './components/Auth/Logout';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import Register from './components/Auth/Register';

import {connect} from 'react-redux';

@connect(
    store => ({
        translation: store.translation
    }),
    dispatch => ({})
)
export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/forgot-password" component={ForgotPassword}/>
                    <Route exact path="/register" component={Register}/>

                    <Route exact path="/" component={Protected(Home)}/>
                    <Route path="/profile" component={Protected(Profile)}/>

                    <Route path="/logout" component={Logout}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
