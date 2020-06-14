import {
    GET_SEARCH_ROUTES_URI,
    GET_ALL_ROUTES_URI,
    GET_ROUTE_URI,
    ADD_TO_SAVED_ROUTES,
    REMOVE_FROM_SAVED_ROUTES,
    GET_ROUTES_BY_TAG,
    INCREASE_ROUTE_VIEWS_COUNTER,
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

export function getRoutesByTag(tagId) {
    return fetchPOST(GET_ROUTES_BY_TAG, {tag_ids: tagId.toString()});
}

export function increaseRouteViewsCounter(routeId, count) {
    return fetchPOST(INCREASE_ROUTE_VIEWS_COUNTER, {id: routeId, count: count});
}
