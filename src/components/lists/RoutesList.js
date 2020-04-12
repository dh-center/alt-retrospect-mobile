import React from 'react';
import {Image} from 'react-native';
import {ListItem, Button} from '@ui-kitten/components';
import {ArrowRightIcon} from '../icons/ArrowRightIcon';

export const RoutesList = props => {
    const renderRouteImage = style => (
        <Image
            source={{
                uri:
                    'https://pics.livejournal.com/noir_diamant/pic/0002achx/s640x480',
            }}
        />
    );
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
            icon={style => renderRouteImage(style)}
            accessory={renderChevron}
            onPress={() =>
                props.navigation.navigate('Route', {routeId: item.id})
            }
        />
    );
    return props.data.map(renderItem);
};
