import {SIGN_UP_ENDPOINT, SIGN_IN_ENDPOINT} from './constants';
import {fetchPOST} from './common';

export function userSignUp(username, password) {
    return fetchPOST(SIGN_UP_ENDPOINT, {
        username: username,
        password: password,
    });
}

export function userSignIn(username, password) {
    return fetchPOST(SIGN_IN_ENDPOINT, {
        username: username,
        password: password,
    });
}
