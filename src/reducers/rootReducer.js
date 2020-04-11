import {combineReducers} from 'redux';
import {auth} from './auth';
import {routes} from './routes';

const rootReducer = combineReducers({
    auth,
    routes,
});

export default rootReducer;
