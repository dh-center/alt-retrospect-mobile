import {
    GET_SEARCH_ROUTES_URI,
    GET_ALL_ROUTES_URI,
    GET_ROUTE_URI,
    ADD_TO_SAVED_ROUTES,
    REMOVE_FROM_SAVED_ROUTES,
} from './constants';
import {fetchGET, fetchPOST} from './common';

export function fetchRoutes() {
    return fetchGET(GET_ALL_ROUTES_URI);
}

export function fetchRoute(id) {
    return fetchGET(GET_ROUTE_URI, {id});
}

export function getSearchRoutes(query) {
    return fetchPOST(GET_SEARCH_ROUTES_URI, {query: query});
}

export function addToSaved(routeId) {
    return fetchPOST(ADD_TO_SAVED_ROUTES, {id: routeId.toString()}, true);
}

export function removeFromSaved(routeId) {
    return fetchPOST(REMOVE_FROM_SAVED_ROUTES, {id: routeId.toString()}, true);
}
