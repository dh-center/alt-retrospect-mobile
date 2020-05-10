import {GET_LOCATION_URI, GET_NEAR_LOCATIONS_URI, GET_SEARCH_LOCATIONS_URI} from './constants';
import {fetchGET, fetchPOST} from './common';

export async function getLocation(id) {
    return await fetchGET(GET_LOCATION_URI, {id});
}

export async function getNearLocations(lat, lon, radius) {
    return await fetchGET(GET_NEAR_LOCATIONS_URI, {lat, lon, radius});
}

export async function getSearchLocations(query) {
    return await fetchPOST(GET_SEARCH_LOCATIONS_URI, {query, strict_search: 1});
}
