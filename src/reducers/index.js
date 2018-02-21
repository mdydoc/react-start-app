import {combineReducers} from 'redux';

import Misc from './Misc';
import Auth from './Auth';

const reducers = {
    ...Misc,
    ...Auth
};

export default combineReducers(reducers);