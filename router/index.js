import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import { Protected } from '../src/components/Misc/Protected';

import Home from '../src/components/Home/Home';
import Login from '../src/components/Auth/Login';
import Register from '../src/components/Auth/Register';
import Logout from '../src/components/Auth/Logout';

export default class Router extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Protected(Home)}/>

                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/logout" component={Logout}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
