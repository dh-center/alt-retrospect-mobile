import React from 'react';
import {Icon, ListItem} from '@ui-kitten/components';

export const RoutesList = ({data}) => {
    const renderRouteIcon = style => <Icon {...style} name="person" />;

    const renderItem = item => (
        <ListItem key={item.id} title={item.name} icon={renderRouteIcon} />
    );

    return data.map(renderItem);
};
