import {SIGN_UP_ENDPOINT, SIGN_IN_ENDPOINT} from './constants';

export function userSignUp(username, password) {
    return fetch(SIGN_UP_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(error => {
            console.log(error);
        });
}

export function userSignIn(username, password) {
    return fetch(SIGN_IN_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(error => {
            console.log(error);
        });
}
