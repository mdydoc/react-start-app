import http from '../libs/http';

export const SET_USER = '@set-user';
export const SET_USER_ERRORS = '@set-user-errors';

export const loginUser = (payload = {}) => {
    return async (dispatch) => {
        try {
            const res = await http.endpoint('login').post({...payload});

            if (!res.isError) {
                sessionStorage.setItem('jwt', res.data.jwt);

                if (payload.hasOwnProperty('remember') && payload.remember && res.data.hasOwnProperty('rememberToken')) {
                    localStorage.setItem('rememberToken', res.data.rememberToken);
                }

                dispatch(setUser(res.data.user));
                dispatch(setUserErrors(false));
            } else {
                dispatch(setUserErrors(res.errorMessage));
            }
        } catch (e) {
            console.error(e);
        }
    };
};

export const registerUser = (payload = {}) => {
    return async (dispatch) => {
        try {
            const res = await http.endpoint('register').post({...payload});

            if (!res.isError) {
                sessionStorage.setItem('jwt', res.data.jwt);
                dispatch(setUser(res.data.user));
                dispatch(setUserErrors(false));
            } else {
                dispatch(setUserErrors(res.errorMessage));
            }
        } catch (e) {
            console.error(e);
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            const rememberToken = localStorage.getItem('rememberToken');

            let logoutParams = {};

            if (rememberToken) {
                logoutParams = Object.assign({}, {rememberToken});
            }

            const res = await http.endpoint('logout').post(logoutParams, true);

            if (!res.isError) {
                sessionStorage.clear();
                localStorage.clear();
                dispatch(setUser(false));
            } else {
                dispatch(setUserErrors(res.errorMessage));
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

export const setUserErrors = (payload) => {
    return {
        payload,
        type: SET_USER_ERRORS
    };
};

export default {
    loginUser,
    registerUser,
    logoutUser,
    setUser,
    setUserErrors
};