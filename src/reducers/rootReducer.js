import {combineReducers} from 'redux';
import {auth} from './auth';
import {routes} from './routes';
import {popularTags} from './tags';

const rootReducer = combineReducers({
    auth,
    routes,
    popularTags,
});

export default rootReducer;
