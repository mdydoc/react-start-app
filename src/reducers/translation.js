import {SET_TRANSLATION} from '../actions/translation';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_TRANSLATION:
            state = {...action.payload};
            break;
    }

    return state;
};
