import React from 'react';
import {Image} from 'react-native';
import {ListItem, Button, Icon} from '@ui-kitten/components';
import {ArrowRightIcon} from '../icons/ArrowRightIcon';

export const RoutesList = props => {
    const renderRouteImage = style => (
        <Image
            source={{
                uri:
                    'https://ic.pics.livejournal.com/noir_diamant/43916271/16427/16427_640.jpg',
            }}
        />
    );
    const renderChevron = style => (
        <Button
            appearance="ghost"
            status="basic"
            style={style}
            icon={ArrowRightIcon}
            onPress={() => props.navigation.navigate('Route')}
        />
    );

    const renderItem = item => (
        <ListItem
            key={item.id}
            title={item.name}
            icon={style => renderRouteImage(style)}
            accessory={renderChevron}
            onPress={() => props.navigation.navigate('Route')}
        />
    );
    return props.data.map(renderItem);
};
