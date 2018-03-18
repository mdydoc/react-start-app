import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import { Protected } from '../src/components/Misc/Protected';

import Home from '../src/components/Home';
import Profile from '../src/components/Account';
import Logout from '../src/components/Auth/Logout';

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
