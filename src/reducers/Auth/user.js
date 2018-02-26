import {SET_USER} from '../../actions/Auth/user';

export default (state = false, action) => {
    switch (action.type) {
        case SET_USER:
            if (action.payload) {
                state = Object.assign({}, action.payload);
            } else {
                state = false;
            }
            break;
    }

    return state;
};