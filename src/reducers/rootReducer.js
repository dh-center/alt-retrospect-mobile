import {combineReducers} from 'redux';
import {auth} from './auth';
import {currentRoute, routes} from './routes';
import {popularTags} from './tags';
import {nearLocations} from './nearLocations';

const rootReducer = combineReducers({
    auth,
    routes,
    currentRoute,
    popularTags,
    nearLocations,
});

export default rootReducer;
