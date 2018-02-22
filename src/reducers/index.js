import {combineReducers} from 'redux';

import misc from './Misc';
import user from './Auth';

const reducers = {
    ...misc,
    ...user
};

export default combineReducers(reducers);