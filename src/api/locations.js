import {GET_LOCATION_URI, GET_NEAR_LOCATIONS_URI} from './constants';
import {fetchGET} from './common';

export function getLocation(id) {
    return fetchGET(GET_LOCATION_URI, {id});
}

export function getNearLocations(lat, lon, radius) {
    return fetchGET(GET_NEAR_LOCATIONS_URI, {lat, lon, radius});
}