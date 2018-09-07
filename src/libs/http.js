import axios from 'axios';
import qs from 'qs';
import translate from '../libs/translate';
import {setError} from "../actions/error";
import store from "../store";

class Http {
    constructor() {
        axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.interceptors.request.use((request) => {
            if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                request.data = qs.stringify(request.data);
            }
            return request;
        });
        this._axios = axios.create({});
        this._url = process.env.API_URL;
        this._apiMethod = false;
        this._response = false;
    }

    _validate() {
        if (!this._apiMethod) {
            throw new Error('Method was not specified.');
        }
    }

    route(apiMethod) {
        this._apiMethod = apiMethod;
        return this;
    }

    static _getAuthConfig() {
        let axiosConfig = {};

        const jwt = sessionStorage.getItem('jwt');

        if (jwt) {
            axiosConfig = Object.assign({}, {
                headers: {'Authorization': 'Bearer ' + jwt}
            });
        }

        return axiosConfig;
    }

    build() {
        let response = this._response && this._response.data ? {...this._response.data} : false;
        this._response = false;

        let isError = false;
        let errorMessage = {};
        let data = false;
        let pagination = false;

        if (response) {
            if (response.responseType && response.responseType === 'success') {
                data = response.data.result;
                pagination = response.data.pagination !== null ? response.data.pagination : false;
            } else {
                isError = true;
                if (typeof response.errorMessage === 'object') {
                    for (let error in response.errorMessage) {
                        if (response.errorMessage.hasOwnProperty(error)) {
                            if (Array.isArray(response.errorMessage[error])) {
                                errorMessage = {...errorMessage, [error]: translate(response.errorMessage[error][0])};
                            } else {
                                errorMessage = {...errorMessage, [error]: translate(response.errorMessage[error])};
                            }
                        }
                    }
                } else {
                    errorMessage = {error: translate(response.errorMessage)};

                    if (response.errorMessage === 'errors.rememberToken.invalid') {
                        localStorage.removeItem('rememberToken');
                        window.location.reload();
                    }
                    if (response.errorMessage === 'errors.token') {
                        sessionStorage.removeItem('jwt');
                        window.location.reload();
                    }

                    if (response.errorMessage === 'errors.error') {
                        store.dispatch(setError(errorMessage.error));
                    }
                }
            }
        } else {
            let error = translate('misc.api');
            isError = true;
            errorMessage = {error};

            store.dispatch(setError(error));
        }

        return {
            isError,
            errorMessage,
            data,
            pagination
        };
    }

    async get(options = {}) {
        this._validate();

        let url = `${this._url}/${this._apiMethod}`;
        this._apiMethod = false;

        let authConfig = Http._getAuthConfig();

        try {
            this._response = await this._axios.get(url, {
                params: {
                    ...options,
                    language: localStorage.getItem('lang') || process.env.DEFAULT_LANG
                },
                ...authConfig
            });
        } catch (e) {
            store.dispatch(setError(e.message));
        }

        return this.build();
    }

    async post(data = {}) {
        this._validate();

        let url = `${this._url}/${this._apiMethod}`;
        this._apiMethod = false;

        let authConfig = Http._getAuthConfig();

        if (data instanceof FormData) {
            data.append('language', localStorage.getItem('lang') || process.env.DEFAULT_LANG);
        } else {
            data.language = localStorage.getItem('lang') || process.env.DEFAULT_LANG;
        }

        try {
            this._response = await this._axios.post(url, data, authConfig);
        } catch (e) {
            store.dispatch(setError(e.message));
        }

        return this.build();
    }

    async delete() {
        this._validate();

        let url = `${this._url}/${this._apiMethod}`;
        this._apiMethod = false;

        let authConfig = Http._getAuthConfig();

        try {
            this._response = await this._axios.delete(url, authConfig);
        } catch (e) {
            store.dispatch(setError(e.message));
        }

        return this.build();
    }

    async put(data = {}) {
        this._validate();

        let url = `${this._url}/${this._apiMethod}`;
        this._apiMethod = false;

        let authConfig = Http._getAuthConfig();

        try {
            this._response = await this._axios.put(url, {
                ...data,
                language: localStorage.getItem('lang') || process.env.DEFAULT_LANG
            }, authConfig);
        } catch (e) {
            store.dispatch(setError(e.message));
        }

        return this.build();
    }

    async patch(data = {}) {
        this._validate();

        let url = `${this._url}/${this._apiMethod}`;
        this._apiMethod = false;

        let authConfig = Http._getAuthConfig();

        try {
            this._response = await this._axios.patch(url, {
                ...data,
                language: localStorage.getItem('lang') || process.env.DEFAULT_LANG
            }, authConfig);
        } catch (e) {
            store.dispatch(setError(e.message));
        }

        return this.build();
    }
}

export default new Http();