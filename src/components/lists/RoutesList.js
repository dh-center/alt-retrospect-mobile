import React from 'react';
import {Icon, List, ListItem} from '@ui-kitten/components';

const data = new Array(8).fill({
    title: 'Title for Route',
    description: 'Description for Route',
});

export const RoutesList = () => {
    const renderRouteIcon = style => <Icon {...style} name="person" />;

    const renderItem = ({item, index}) => (
        <ListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
            icon={renderRouteIcon}
        />
    );

    return <List data={data} renderItem={renderItem} />;
};
