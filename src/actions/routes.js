import {getRoutes} from '../api/routes';
import {getRoute} from '../api/routes';

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

export const REQUEST_ROUTE = 'REQUEST_ROUTE';

function requestRoute(id) {
    return {
        type: REQUEST_ROUTE,
    };
}

export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';

function receiveRoute(route) {
    return {
        type: RECEIVE_ROUTE,
        route,
    };
}

export function fetchRoute(id) {
    return function(dispatch) {
        dispatch(requestRoute(id));

        return getRoute(id).then(json => {
            dispatch(receiveRoute(json.route));
        });
    };
}
