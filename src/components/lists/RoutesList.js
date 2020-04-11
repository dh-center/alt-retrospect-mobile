import React from 'react';
import {Icon, ListItem, Button} from '@ui-kitten/components';
import {ArrowRightIcon} from '../icons/ArrowRightIcon';

export const RoutesList = ({data}) => {
    const renderRouteIcon = style => <Icon {...style} name="person" />;
    const renderChevron = style => (
        <Button
            appearance="ghost"
            status="basic"
            style={style}
            icon={ArrowRightIcon}
        />
    );

    const renderItem = item => (
        <ListItem
            key={item.id}
            title={item.name}
            icon={renderRouteIcon}
            accessory={renderChevron}
        />
    );

    return data.map(renderItem);
};
