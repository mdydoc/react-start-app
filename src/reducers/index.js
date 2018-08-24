import {combineReducers} from 'redux';

import responsive from './responsive';
import user from './user';
import translation from './translation';

const reducers = {
    responsive,
    user,
    translation
};

export default combineReducers(reducers);