import React from 'react';
import {Icon, ListItem} from '@ui-kitten/components';
import {BasicButton} from '../buttons/BasicButton';

export const LocationsList = props => {
    const renderLocationIcon = style => (
        <Icon {...style} name="radio-button-on-outline" />
    );

    const renderChevron = style => (
        <BasicButton
            renderIcon={style => <Icon {...style} name="chevron-right" />}
        />
    );

    const renderItem = item => (
        <ListItem
            key={item.id}
            title={item.name}
            icon={renderLocationIcon}
            accessory={renderChevron}
            onPress={() =>
                props.navigation.navigate('Location', {locationId: item.id})
            }
        />
    );
    return props.data.map(renderItem);
};
