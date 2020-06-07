import React from 'react';
import {Image} from 'react-native';
import {Icon, ListItem, Text} from '@ui-kitten/components';
import {BasicButton} from '../buttons/BasicButton';

const RoutesList = props => {
    const renderRouteImage = (style, uri) => (
        delete style.tintColor,
        (
            <Image
                source={{
                    uri: uri,
                }}
                style={{width: 50, height: 50, borderRadius: 5}}
            />
        )
    );
    const renderChevron = style => (
        <BasicButton
            accessoryLeft={evaProps => (
                <Icon {...evaProps} name="chevron-right" />
            )}
            onPress={() => props.navigation.navigate('Search')}
        />
    );

    const renderItem = item => (
        <ListItem
            key={item.id}
            title={<Text>{item.name}</Text>}
            accessoryLeft={style => renderRouteImage(style, item.image_url)}
            accessoryRight={renderChevron}
            onPress={() => {
                props.navigation.navigate('Route', {routeId: item.id});
            }}
        />
    );
    return props.data.map(renderItem);
};

export default RoutesList;
