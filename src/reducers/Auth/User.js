import {LOGIN_USER} from '../../actions/Auth/User';

export default (state = {
    user: null
}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            state = {...state, ...action.payload};
            break;
    }

    return state;
};