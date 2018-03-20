import axios from 'axios';
import {API_URL} from '../../constants';

class Http {
    constructor() {
        this._axios = axios.create({});
        this._url = API_URL;
        this._apiMethod = false;
        this._response = false;
    }

    _validate() {
        if (!this._apiMethod) {
            throw new Error('Method was not specified.');
        }
    }

    endpoint(apiMethod) {
        this._apiMethod = apiMethod;
        return this;
    }

    _getAuthConfig() {
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

        if (response) {
            if (response.responseType && response.responseType === 'success') {
                data = response.data;
            } else {
                isError = true;
                if (typeof response.errorMessage === 'object') {
                    for (let error in response.errorMessage) {
                        if (response.errorMessage.hasOwnProperty(error)) {
                            if (Array.isArray(response.errorMessage[error])) {
                                errorMessage = {...errorMessage, [error]: response.errorMessage[error][0]};
                            } else {
                                errorMessage = {...errorMessage, [error]: response.errorMessage[error]};
                            }
                        }
                    }
                } else {
                    errorMessage = {error: response.errorMessage};
                }
            }
        } else {
            isError = true;
            errorMessage = {error: 'Invalid response from API'};
        }

        return {
            isError,
            errorMessage,
            data
        };
    }

    async get(options = {}) {
        this._validate();

        let url = `${this._url}/${this._apiMethod}`;
        this._apiMethod = false;

        let authConfig = this._getAuthConfig();

        try {
            this._response = await this._axios.get(url, {
                params: {
                    ...options
                },
                ...authConfig
            });
        } catch (e) {
            console.error(e);
        }

        return this.build();
    }

    async post(data = {}) {
        this._validate();

        let url = `${this._url}/${this._apiMethod}`;
        this._apiMethod = false;

        let authConfig = this._getAuthConfig();

        try {
            this._response = await this._axios.post(url, data, authConfig);
        } catch (e) {
            console.error(e);
        }

        return this.build();
    }

    async delete() {
        this._validate();

        let url = `${this._url}/${this._apiMethod}`;
        this._apiMethod = false;

        let authConfig = this._getAuthConfig();

        try {
            this._response = await this._axios.delete(url, authConfig);
        } catch (e) {
            console.error(e);
        }

        return this.build();
    }

    async put(data = {}) {
        this._validate();

        let url = `${this._url}/${this._apiMethod}`;
        this._apiMethod = false;

        let authConfig = this._getAuthConfig();

        try {
            this._response = await this._axios.put(url, data, authConfig);
        } catch (e) {
            console.error(e);
        }

        return this.build();
    }

    async patch(data = {}) {
        this._validate();

        let url = `${this._url}/${this._apiMethod}`;
        this._apiMethod = false;

        let authConfig = this._getAuthConfig();

        try {
            this._response = await this._axios.patch(url, data, authConfig);
        } catch (e) {
            console.error(e);
        }

        return this.build();
    }
}

export default new Http();