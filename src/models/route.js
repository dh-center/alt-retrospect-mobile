import {Model, many, attr} from 'redux-orm';

export class Route extends Model {
    static reducer(action, Route, session) {
        switch (action.type) {
            case 'CREATE_ROUTE':
                Route.create(action.payload);
                break;
            case 'UPDATE_ROUTE':
                Route.withId(action.payload.id).update(action.payload);
                break;
        }
    }
}
Route.modelName = 'Route';
Route.fields = {
    id: attr(),
    name: attr(),
    description: attr(),
    image_url: attr(),
    duration: attr(),
    tags: many('Tag'),
    instances: many('Instance'),
    isPopular: attr(),
    isSaved: attr(),
};
