import {ORM} from 'redux-orm';
import {Location} from './models/location';
import {Instance} from './models/instance';
import {Tag} from './models/tag';
import {Route} from './models/route';

const orm = new ORM({
    stateSelector: state => state.data,
});
orm.register(Location, Instance, Tag, Route);

export default orm;
