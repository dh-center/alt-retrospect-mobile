import {SIGN_UP_URI, SIGN_IN_URI} from './constants';
import {fetchPOST} from './common';

export function userSignUp(username, password) {
    return fetchPOST(SIGN_UP_URI, {
        username: username,
        password: password,
    });
}

export function userSignIn(username, password) {
    return fetchPOST(SIGN_IN_URI, {
        username: username,
        password: password,
    });
}
