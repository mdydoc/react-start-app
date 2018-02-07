import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import reducers from '../src/reducers';

const createAppStore = (initialState = {}) => {
    return createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(thunk)
        )
    );
};

export default createAppStore();