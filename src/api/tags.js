import {fetchGET} from './common';
import {GET_ALL_TAGS_URI} from './constants';

const TAGS_COUNT = 3;

export function getTags() {
    return fetchGET(GET_ALL_TAGS_URI, {count: TAGS_COUNT});
}
