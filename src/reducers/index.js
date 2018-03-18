import {combineReducers} from 'redux';

import responsive from './responsive';
import user from './user';

const reducers = {
    responsive,
    user
};

export default combineReducers(reducers);