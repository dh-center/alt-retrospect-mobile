import {Model, many, attr} from 'redux-orm';
import {CREATE_LOCATION, UPDATE_LOCATION} from '../actions/locations';

export class Location extends Model {
    static reducer(action, Location, session) {
        switch (action.type) {
            case CREATE_LOCATION:
                Location.create(action.payload);
                break;
            case UPDATE_LOCATION:
                Location.withId(action.payload.id).update(action.payload);
                break;
        }
    }
}
Location.modelName = 'Location';
Location.fields = {
    id: attr(),
    lat: attr(),
    lon: attr(),
    icon_url: attr(),
    address: attr(),
    instances: many('Instance', 'locations'),
};
