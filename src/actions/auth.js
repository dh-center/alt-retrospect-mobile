import {userSignIn} from '../api/auth';

export const REQUEST_AUTH_TOKEN = 'REQUEST_AUTH_TOKEN';

function requestAuthToken(username, password) {
    return {
        type: REQUEST_AUTH_TOKEN,
        username,
        password,
    };
}

export const RECEIVE_AUTH_TOKEN = 'RECEIVE_AUTH_TOKEN';

function receiveAuthToken(authToken) {
    return {
        type: RECEIVE_AUTH_TOKEN,
        authToken,
    };
}

export function fetchAuthToken(username, password) {
    return function(dispatch) {
        dispatch(requestAuthToken(username, password));

        return userSignIn(username, password).then(json =>
            dispatch(receiveAuthToken(json.auth_token)),
        );
    };
}
