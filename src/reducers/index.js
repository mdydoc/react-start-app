import {combineReducers} from 'redux';

import responsive from './responsive';
import user from './user';
import translation from './translation';
import error from './error';

const reducers = {
    responsive,
    user,
    translation,
    error
};

export default combineReducers(reducers);