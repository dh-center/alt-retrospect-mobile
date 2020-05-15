import {combineReducers} from 'redux';
import {auth} from './auth';
import {routesSearch} from './routes';
import {currentLocation} from './currentLocation';
import {savedRoutes, userInfo} from './profile';
import {createReducer} from 'redux-orm';
import orm from '../orm';

const data = createReducer(orm);

const rootReducer = combineReducers({
    auth,
    currentLocation,
    savedRoutes,
    userInfo,
    routesSearch,
    data,
});

export default rootReducer;
