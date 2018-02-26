import http from '../../libs/http';

export const SET_USER = '@set-user';

export const loginUser = (payload = {}) => {
    return async (dispatch) => {
        try {
            const res = await http.call('login').post({...payload});

            if (!res.isError) {
                localStorage.setItem('token', res.data.token);
                dispatch(setUser(res.data.user));
            } else {
                //TODO set login error
                console.log('Error:', res);
            }
        } catch (e) {
            console.error(e);
        }
    };
};

export const registerUser = (payload = {}) => {
    return async (dispatch) => {
        try {
            const res = await http.call('register').post({...payload});

            if (!res.isError) {
                localStorage.setItem('token', res.data.token);
                dispatch(setUser(res.data.user));
            } else {
                //TODO set register error
                console.log('Error:', res);
            }
        } catch (e) {
            console.error(e);
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            const res = await http.call('logout').post();

            if (!res.isError) {
                localStorage.removeItem('token');
                dispatch(setUser(false));
            } else {
                //TODO set login error
                console.log('Error:', res);
            }
        } catch (e) {
            console.error(e);
        }
    };
};

export const setUser = (payload) => {
    return {
        payload,
        type: SET_USER
    };
};

export default {
    loginUser,
    registerUser,
    logoutUser,
    setUser
};