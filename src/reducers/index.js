import {combineReducers} from 'redux';

import responsive from './responsive';
import user from './user';
import translation from './translation';
import error from './error';
import languages from './languages';

const reducers = {
    responsive,
    user,
    translation,
    error,
    languages
};

export default combineReducers(reducers);
