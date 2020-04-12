import React from 'react';
import {Icon, ListItem} from '@ui-kitten/components';

export const LocationsList = props => {
    const renderLocationIcon = style => <Icon {...style} name="radio-button-on-outline" />;

    const renderItem = item => (
        <ListItem
            key={item.id}
            title={item.name}
            icon={renderLocationIcon}
            onPress={() =>
                props.navigation.navigate('Location', {locationId: item.id})
            }
        />
    );
    return props.data.map(renderItem);
};
