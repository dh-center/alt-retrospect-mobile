import React from 'react';
import {Button, Icon, ListItem} from '@ui-kitten/components';
import {ChevronRight} from '../icons/ChevronRight';

export const LocationsList = props => {
    const renderLocationIcon = style => <Icon {...style} name="radio-button-on-outline" />;

    const renderChevron = style => (
        <Button
            appearance="ghost"
            status="basic"
            style={style}
            icon={ChevronRight}
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
