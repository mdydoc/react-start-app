import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import { Protected } from './components/Misc/Protected';

import Home from './components/Home';
import Profile from './components/Account';
import Logout from './components/Auth/Logout';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>

                    <Route path="/profile" component={Protected(Profile)}/>

                    <Route path="/logout" component={Logout}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
