import {createSelector} from 'redux-orm';
import orm from '../orm';

export const routes = createSelector(orm.Route);
