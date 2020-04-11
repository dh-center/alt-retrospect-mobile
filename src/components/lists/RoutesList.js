import React from 'react';
import {Icon, List, ListItem} from '@ui-kitten/components';

export const RoutesList = ({data}) => {
    const renderRouteIcon = style => <Icon {...style} name="person" />;

    const renderItem = ({item}) => (
        <ListItem title={item.name} icon={renderRouteIcon} />
    );

    return <List data={data} renderItem={renderItem} />;
};
