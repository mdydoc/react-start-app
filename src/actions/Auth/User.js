import axios from 'axios';

import API_URL from '../../../constants';

export const AUTHENTICATE = '@authenticate';

export const login = (payload = {}) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${API_URL}/login`, {...payload});

            console.log(res);
        } catch (e) {
            console.error(e);
        }
    };
};

export default {
    login
};