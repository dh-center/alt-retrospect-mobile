import {combineReducers} from 'redux';
import {auth} from './auth';
import {currentRoute, routes, routesSearch} from './routes';
import {popularTags} from './tags';
import {nearLocations} from './nearLocations';
import {currentLocation} from './currentLocation';
import {savedRoutes, userInfo} from './profile';

const rootReducer = combineReducers({
    auth,
    routes,
    currentRoute,
    popularTags,
    nearLocations,
    currentLocation,
    savedRoutes,
    userInfo,
    routesSearch,
});

export default rootReducer;
