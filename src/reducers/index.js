import {combineReducers} from 'redux';

import misc from './Misc';
import auth from './Auth';

const reducers = {
    ...misc,
    ...auth
};

export default combineReducers(reducers);