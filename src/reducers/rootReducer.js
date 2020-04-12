import {combineReducers} from 'redux';
import {auth} from './auth';
import {currentRoute, routes} from './routes';
import {popularTags} from './tags';

const rootReducer = combineReducers({
    auth,
    routes,
    currentRoute,
    popularTags,
});

export default rootReducer;
