import {
    GET_SEARCH_ROUTES_URI,
    GET_ALL_ROUTES_URI,
    GET_ROUTE_URI,
} from './constants';
import {fetchGET, fetchPOST} from './common';

export function getRoutes() {
    return fetchGET(GET_ALL_ROUTES_URI);
}

export function getRoute(id) {
    return fetchGET(GET_ROUTE_URI, {id});
}

export function getSearchRoutes(query) {
    return fetchPOST(GET_SEARCH_ROUTES_URI, {query: query});
}
