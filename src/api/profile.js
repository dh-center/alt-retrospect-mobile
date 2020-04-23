import {fetchGET} from './common';
import {GET_SAVED_ROUTES_URI} from './constants';

export function getSavedRoutes() {
    return fetchGET(GET_SAVED_ROUTES_URI, {}, true);
}
