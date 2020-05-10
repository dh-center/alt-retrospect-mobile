import React from 'react';
import {Icon, ListItem} from '@ui-kitten/components';

export const LocationsSearchResults = props => {
    const renderItem = item => (
        <ListItem
            key={item.id}
            title={item.address}
            onPress={() =>
                props.navigation.navigate('Location', {locationId: item.id})
            }
        />
    );
    return props.data.map(renderItem);
};
