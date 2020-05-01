import {Model, attr} from 'redux-orm';

export class Tag extends Model {
    static reducer(action, Tag, session) {
        switch (action.type) {
            case 'CREATE_TAG':
                Tag.create(action.payload);
                break;
        }
    }
}
Tag.modelName = 'Tag';
Tag.fields = {
    id: attr(),
    name: attr(),
};
