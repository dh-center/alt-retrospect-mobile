import {GET_ALL_ROUTES_ENDPOINT, GET_ALL_TAGS_ENDPOINT} from './constants';
import {fetchGET} from './common';

export function getRoutes() {
    return fetchGET(GET_ALL_ROUTES_ENDPOINT);
}
