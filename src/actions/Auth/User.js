import axios from 'axios';

import API_URL from '../../../constants';

export const LOGIN_USER = '@login-user';

export const loginUser = (payload = {}) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${API_URL}/login`, {...payload});

            console.log(res);
        } catch (e) {
            console.error(e);
        }
    };
};

export const setUser = (payload = {}) => {
    return {
        payload,
        type: LOGIN_USER
    };
};

export default {
    loginUser,
    setUser
};