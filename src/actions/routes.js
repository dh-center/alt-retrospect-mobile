import {getRoutes} from '../api/routes';

export const REQUEST_ALL_ROUTES = 'REQUEST_ALL_ROUTES';

function requestAllRoutes() {
    return {
        type: REQUEST_ALL_ROUTES,
    };
}

export const RECEIVE_ALL_ROUTES = 'RECEIVE_ALL_ROUTES';

function receiveAllRoutes(routes) {
    return {
        type: RECEIVE_ALL_ROUTES,
        routes,
    };
}

export function fetchAllRoutes() {
    return function(dispatch) {
        dispatch(requestAllRoutes());

        return getRoutes().then(json => {
            dispatch(receiveAllRoutes(json.routes));
        });
    };
}
