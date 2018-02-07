import {combineReducers} from 'redux';

import Misc from './Misc';

const reducers = {
    ...Misc
};

export default combineReducers(reducers);