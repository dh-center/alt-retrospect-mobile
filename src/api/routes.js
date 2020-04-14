import {GET_ALL_ROUTES_URI, GET_ROUTE_URI} from './constants';
import {fetchGET} from './common';

export function getRoutes() {
    return fetchGET(GET_ALL_ROUTES_URI);
}

export function getRoute(id) {
    return fetchGET(GET_ROUTE_URI, {id});
}
