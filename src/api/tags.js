import {fetchGET} from './common';
import {GET_ALL_TAGS_ENDPOINT} from './constants';

export function getTags() {
    return fetchGET(GET_ALL_TAGS_ENDPOINT);
}
