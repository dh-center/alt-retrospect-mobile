import {getSavedRoutes, getUserInfo} from '../api/profile';

export const REQUEST_SAVED_ROUTES = 'REQUEST_SAVED_ROUTES';

function requestSavedRoutes() {
    return {
        type: REQUEST_SAVED_ROUTES,
    };
}

export const RECEIVE_SAVED_ROUTES = 'RECEIVE_SAVED_ROUTES';

function receiveSavedRoutes(routes) {
    return {
        type: RECEIVE_SAVED_ROUTES,
        routes,
    };
}

export function fetchSavedRoutes() {
    return function(dispatch) {
        dispatch(requestSavedRoutes());

        return getSavedRoutes().then(json => {
            dispatch(receiveSavedRoutes(json.routes));
        });
    };
}

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
