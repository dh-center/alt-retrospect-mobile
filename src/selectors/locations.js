import {createSelector} from 'redux-orm';
import orm from '../orm';

export const locations = createSelector(orm.Location);
