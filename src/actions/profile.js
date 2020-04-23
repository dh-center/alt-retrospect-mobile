import {getSavedRoutes} from '../api/profile';

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
