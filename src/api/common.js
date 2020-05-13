import axios from 'axios';
import {COMMON_HEADERS} from './constants';
import {store} from '../store';

export function fetchPOST(url, body, needAuth: false) {
    let headers = COMMON_HEADERS;
    if (needAuth) {
        headers = addToken(headers);
    }
    console.log(url, body, headers);
    return axios
        .post(url, body, {headers: headers})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

export function fetchGET(url, params: {}, needAuth: false) {
    let headers = COMMON_HEADERS;
    if (needAuth) {
        headers = addToken(headers);
    }
    return axios
        .get(url, {
            headers: headers,
            params: params,
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

function addToken(headers) {
    const AUTH_TOKEN = store.getState().auth.authToken;
    return Object.assign(headers, {
        Authorization: 'Token ' + AUTH_TOKEN,
    });
}
