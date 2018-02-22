import http from '../../libs/http';

export const LOGIN_USER = '@login-user';

export const loginUser = (payload = {}) => {
    return async (dispatch) => {
        try {
            const res = await http.call('login').post({...payload});

            if (!res.isError) {
                localStorage.setItem('token', res.data.token);
                dispatch(setUser(res.data.user));
            } else {
                //TODO set login error
                console.log(res);
            }
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