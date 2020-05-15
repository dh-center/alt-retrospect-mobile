import {getRoute, getSearchRoutes} from '../api/routes';

export const REQUEST_ROUTE = 'REQUEST_ROUTE';

function requestRoute(id) {
    return {
        type: REQUEST_ROUTE,
        id,
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

export const SET_ROUTE = 'SET_ROUTE';

export function setRoute(route) {
    return {
        type: SET_ROUTE,
        route,
    };
}

export const RESET_ROUTE = 'RESET_ROUTE';

export function resetRoute() {
    return {
        type: RESET_ROUTE,
    };
}

export const REQUEST_SEARCH_ROUTES = 'REQUEST_SEARCH_ROUTES';

function requestSearchRoutes() {
    return {
        type: REQUEST_SEARCH_ROUTES,
    };
}

export const RECEIVE_SEARCH_ROUTES = 'RECEIVE_SEARCH_ROUTES';

function receiveSearchRoutes(routes) {
    return {
        type: RECEIVE_SEARCH_ROUTES,
        routes,
    };
}

export function fetchSearchRoutes(query) {
    return function(dispatch) {
        dispatch(requestSearchRoutes());

        return getSearchRoutes(query).then(json => {
            dispatch(receiveSearchRoutes(json.routes));
        });
    };
}

export const CREATE_ROUTE = 'CREATE_ROUTE';

export function createRoute(route) {
    return {
        type: CREATE_ROUTE,
        payload: route,
    };
}

export const UPDATE_ROUTE = 'UPDATE_ROUTE';

export function updateRoute(route) {
    return {
        type: UPDATE_ROUTE,
        payload: route,
    };
}
