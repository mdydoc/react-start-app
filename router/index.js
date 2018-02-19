import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import { Protected } from '../src/components/Misc/Protected';

import Home from '../src/components/Home/Home';
import Login from '../src/components/Auth/Login';

export default class Router extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Protected(Home)}/>
                    <Route exact path="/login" component={Login}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
