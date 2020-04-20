import {combineReducers} from 'redux';
import {auth} from './auth';
import {currentRoute, routes} from './routes';
import {popularTags} from './tags';
import {nearLocations} from './nearLocations';
import {currentLocation} from './currentLocation';

const rootReducer = combineReducers({
    auth,
    routes,
    currentRoute,
    popularTags,
    nearLocations,
    currentLocation,
});

export default rootReducer;
