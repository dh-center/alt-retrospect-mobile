import {fetchGET} from './common';
import {DIRECTIONS_API_URL} from './constants';
import Config from 'react-native-config';

export function fetchDirection(origin, dest) {
    const request = `${DIRECTIONS_API_URL}origin=${origin.coordinates.lat},${
        origin.coordinates.lon
    }&destination= ${dest.coordinates.lat},${
        dest.coordinates.lon
    }&mode=walking&key=${Config.GM_DIRECTIONS_API_KEY}`;
    return fetchGET(request);
}
