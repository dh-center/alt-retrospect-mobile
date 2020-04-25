import {fetchGET} from './common';
import {GET_SAVED_ROUTES_URI, GET_USER_INFO_URI} from './constants';

export function getSavedRoutes() {
    return fetchGET(GET_SAVED_ROUTES_URI, {}, true);
}

export function getUserInfo() {
    return fetchGET(GET_USER_INFO_URI, {}, true);
}
