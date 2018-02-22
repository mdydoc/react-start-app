import {LOGIN_USER} from '../../actions/Auth/user';

export default (state = {
    user: null
}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            state = {...state, user: action.payload};
            break;
    }

    return state;
};