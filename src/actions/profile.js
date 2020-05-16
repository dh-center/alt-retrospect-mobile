import {getUserInfo} from '../api/profile';

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';

function requestUserInfo() {
    return {
        type: REQUEST_USER_INFO,
    };
}

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';

function receiveUserInfo(username) {
    return {
        type: RECEIVE_USER_INFO,
        username,
    };
}

export function fetchUserInfo() {
    return function(dispatch) {
        dispatch(requestUserInfo());

        return getUserInfo().then(json => {
            dispatch(receiveUserInfo(json.username));
        });
    };
}

export const RESET_USER_INFO = 'RESET_USER_INFO';

export function resetUserInfo() {
    return {
        type: RESET_USER_INFO,
    };
}
