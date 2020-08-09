import {currentLocale} from '../i18n';

const BASE_API_URL = 'https://dhcenter.itmo.ru:8001';
export const DIRECTIONS_API_URL =
    'https://maps.googleapis.com/maps/api/directions/json?';

export const COMMON_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Language: currentLocale,
};

export const SIGN_UP_URI = BASE_API_URL + '/auth/users';
export const SIGN_IN_URI = BASE_API_URL + '/auth/token/login';

export const GET_ALL_ROUTES_URI = BASE_API_URL + '/api/routes/get';
export const GET_ROUTE_URI = BASE_API_URL + '/api/routes/getById';
export const GET_ALL_TAGS_URI = BASE_API_URL + '/api/tags/get';
export const GET_SEARCH_ROUTES_URI = BASE_API_URL + '/api/routes/searchByQuery';
export const GET_ROUTES_BY_TAG = BASE_API_URL + '/api/routes/searchByTagIds';

export const GET_NEAR_LOCATIONS_URI =
    BASE_API_URL + '/api/partner/getLocations';
export const GET_SEARCH_LOCATIONS_URI = BASE_API_URL + '/api/locations/search';

export const GET_SAVED_ROUTES_URI = BASE_API_URL + '/api/routes/getUserRoutes';
export const GET_USER_INFO_URI = BASE_API_URL + '/auth/users/me/';

export const ADD_TO_SAVED_ROUTES = BASE_API_URL + '/api/routes/addToUserRoutes';
export const REMOVE_FROM_SAVED_ROUTES =
    BASE_API_URL + '/api/routes/removeFromUserRoutes';

export const INCREASE_ROUTE_VIEWS_COUNTER =
    BASE_API_URL + '/api/routes/addView';
