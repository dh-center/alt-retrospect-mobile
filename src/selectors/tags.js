import {createSelector} from 'redux-orm';
import orm from '../orm';

export const tags = createSelector(orm.Tag);
