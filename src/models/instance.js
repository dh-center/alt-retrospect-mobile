import {Model, many, attr} from 'redux-orm';

export class Instance extends Model {
    static reducer(action, Instance, session) {
        switch (action.type) {
            case 'CREATE_INSTANCE':
                Instance.create(action.payload);
                break;
            case 'UPDATE_INSTANCE':
                Instance.withId(action.payload.id).update(action.payload);
                break;
        }
    }
}
Instance.modelName = 'Instance';
Instance.fields = {
    id: attr(),
    name: attr(),
    description: attr(),
    image_url: attr(),
    // TODO: consider refactoring as it duplicates Location fields
    lat: attr(),
    lon: attr(),
    tags: many('Tag'),
};
