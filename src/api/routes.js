import {GET_ALL_ROUTES_ENDPOINT, GET_ROUTE_ENDPOINT} from './constants';
import {fetchGET} from './common';

export function getRoutes() {
    return fetchGET(GET_ALL_ROUTES_ENDPOINT);
}

export function getRoute(id) {
    return fetchGET(GET_ROUTE_ENDPOINT + id);
}
