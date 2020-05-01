import {Model, many, attr} from 'redux-orm';

class Location extends Model {}
Location.modelName = 'Location';
Location.fields = {
    id: attr(),
    lat: attr(),
    lon: attr(),
    icon_url: attr(),
    address: attr(),
    instances: many('Instance'),
};

class Instance extends Model {}
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

class Tag extends Model {}
Tag.modelName = 'Tag';
Tag.fields = {
    id: attr(),
    name: attr(),
};

class Route extends Model {}
Route.modelName = 'Route';
Route.fields = {
    id: attr(),
    name: attr(),
    description: attr(),
    image_url: attr(),
    duration: attr(),
    tags: many('Tag'),
    instances: many('Instances')
};
