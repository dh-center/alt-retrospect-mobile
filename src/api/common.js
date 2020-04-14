import axios from 'axios';
import {AUTH_HEADERS, NO_AUTH_HEADERS} from './constants';

export function fetchPOST(url, body, needAuth: false) {
    return axios
        .post(url, body, {headers: needAuth ? AUTH_HEADERS : NO_AUTH_HEADERS})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

export function fetchGET(url, params: {}, needAuth: false) {
    return axios
        .get(url, {
            headers: needAuth ? AUTH_HEADERS : NO_AUTH_HEADERS,
            params: params,
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}
