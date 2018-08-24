import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Router from '../router';
import store from '../store';

import {onResize} from '../actions/responsive';
import {getTranslation} from '../actions/translation';

export default class App extends Component {
    componentDidMount() {
        const lang = localStorage.getItem('lang') || process.env.DEFAULT_LANG;

        store.dispatch(getTranslation(lang));

        window.addEventListener('resize', App._onResize);
    }

    static _onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        store.dispatch(onResize({
            width,
            height
        }));
    }

    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}
