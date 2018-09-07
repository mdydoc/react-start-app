import axios from 'axios';
import {setError} from "./error";

export const SET_TRANSLATION = '@set-translation';

export const getTranslation = (lang) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/src/translations/${lang}.json`);

            if (res && res.data) {
                dispatch(setTranslation(res.data));
            }
        } catch (e) {
            dispatch(setError(e.message));
        }
    };
};

export const setTranslation = (payload = {}) => {
    return {
        payload,
        type: SET_TRANSLATION
    };
};

export default {
    getTranslation,
    setTranslation
};