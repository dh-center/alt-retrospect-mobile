import {Model, attr} from 'redux-orm';
import {CREATE_TAG, UPDATE_TAG} from '../actions/tags';

export class Tag extends Model {
    static reducer(action, Tag, session) {
        switch (action.type) {
            case CREATE_TAG:
                Tag.create(action.payload);
                break;
            case UPDATE_TAG:
                Tag.withId(action.payload.id).update(action.payload);
                break;
        }
    }
}
Tag.modelName = 'Tag';
Tag.fields = {
    id: attr(),
    name: attr(),
    isPopular: attr(),
};
